# Next.js Bridge

React server-side rendering for Formidable with [Next.js](https://nextjs.org/docs/advanced-features/custom-server) framework.

![npm](https://img.shields.io/npm/v/@formidablejs/next-bridge)
![NPM](https://img.shields.io/npm/l/@formidablejs/next-bridge)

## Requirements

  * [@formidablejs/craftsman](https://www.npmjs.com/package/@formidablejs/craftsman): `>=0.3.0-alpha.3`
  * [@formidablejs/framework](https://www.npmjs.com/package/@formidablejs/framework): `>=0.3.1-alpha.1`
  * [next](https://www.npmjs.com/package/next): `>=11.1.2`
  * [react-dom](https://www.npmjs.com/package/react-dom): `>=17.0.2`
  * [react](https://www.npmjs.com/package/react): `>=17.0.2`

## Install

```bash
npm install @formidablejs/next-bridge next react react-dom --save
```

## Publish

```bash
craftsman publish --package @formidablejs/next-bridge -c -v
```

## Configuration

Add `NextjsServiceResolver` in the `config/app.imba` config under `resolvers`:

```js
...

resolvers: {
	...
	require('@formidablejs/next-bridge').NextjsServiceResolver
```

> Note, `NextjsServiceResolver` must be added after `/app/Resolvers/RouterServiceResolver`.

Then, register the `next.imba` config file in the `config/index.imba` file:

```py
...
import next from './next'

export class Config < ConfigRepository

	# All of the configuration items.
	#
	# @type {Object}

	get registered
		{
			...
			next
		}
```

Assuming that you installed `next-bridge` in a new project, you can replace the default `/` route in the `routes/api.imba` file with the following route:

```py
import { next } from '@formidablejs/next-bridge'
import { Route } from '@formidablejs/framework'

Route.get '/', next!
```

When done, you can run the following command to start the server:

```
craftsman serve --dev
```

> Visit http://localhost:3000/ to see the rendered page.

## Usage

To register a new Next.js route, just return the `next` helper method from your route:

```py
import { next } from '@formidablejs/next-bridge'
import { Route } from '@formidablejs/framework'

Route.get '/', next!
```

This route will load the `resources/js/pages/index.js` file.

> Note: A route path is used as a page path. For example, if our route path was `'/about'`, next-bridge would look for a `resources/js/pages/about.js` file.

### Custom view / page

To load a custom react view, use the `view` function:

```py
Route.get '/', next do(request)
	request.view('home')
```

### React Props / data

You may pass data to your react view:

```py
Route.get 'users/:id', next do(request)
	request.view('user', {
		user: User.find( request.param('id') )
	})
```

Accessing props in your react view:

```js
export const getServerSideProps = async (context) => {
	let user = await context.req.formidable.props.user;

	user = !user ? null : {
		id: user.get('id'),
		name: user.get('name'),
	};

	return {
		props: { user }
	}
};

const User = ({ user }) => {
	...
```

### Dynamic Routes

When defining dynamic routes, `next-bridge` will automatically map your routes to your Next.js pages.

Consider the following route:

```py
import { next } from '@formidablejs/next-bridge'
import { Route } from '@formidablejs/framework'

Route.get '/post/:id', next!
```

In order for a post page to be loaded for this route, you need to create a `resources/js/pages/post/[id].js` page:

```js
export function getServerSideProps(request) {
	return {
		props: { params: request.params ?? { } }
	};
}

const Post = (props) => {
	const id = props.params.id

	return <p>Post: {id}</p>
}

export default Post
```

Now, when visiting `/post/10`, the `Post` page will be loaded and the `:id` will be replaced by `10`.

For more information on dynamic routes, see the [Next.js](https://nextjs.org/docs/routing/dynamic-routes) documentation.

> All your pages are be loaded from the `resources/js/pages` folder.

### Error Handling

If you want to let Next.js handle Formidable's Exceptions or Errors, you can modify your application's excepton handler:

```py
import { handleException, NotFoundException, FastifyReply, ExceptionHandler } from '@formidablejs/framework'
import type { FormRequest } from '@formidablejs/framework'

export class Handler < ExceptionHandler

	def handle error, request\FormRequest, reply\FastifyReply
		if error instanceof NotFoundException && request.isMethod('get')
			reply.status(error.status || 500)
			return reply.nextRender('/_error')

		handleException(error, request, reply)

```

> Note, you can handle all Formidable's Exceptions and Errors.

## Credits

This Formidable plugin uses [fastify-nextjs](https://github.com/fastify/fastify-nextjs) under the hood.

## License

The Formidable framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).