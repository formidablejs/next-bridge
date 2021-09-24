# Next.js Bridge

React server-side rendering for Formidable with [Next.js](https://nextjs.org/docs/advanced-features/custom-server) framework.

![npm](https://img.shields.io/npm/v/@formidablejs/next-bridge)
![GitHub](https://img.shields.io/github/license/formidablejs/next-bridge)

## Requirements

  * [@formidablejs/craftsman](https://www.npmjs.com/package/@formidablejs/craftsman): `>=0.2.1-alpha.2`
  * [@formidablejs/framework](https://www.npmjs.com/package/@formidablejs/framework): `>=0.2.1-alpha.2`
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

Register the `next.imba` config file in the `config/index.imba` file:

```py
...
import next from './next`

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

To register a new Next.js route, just return `next` helper method from your route:

```py
import { next } from '@formidablejs/next-bridge'
import { Route } from '@formidablejs/framework'

Route.get '/', next!
```

This route will load the `resources/js/pages/index.js` file.

> Note: A route path is used as a page path. For example, if our route path was `'/about'`, next-bridge would look for a `resources/js/pages/about.js` file.

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

## Credits

This Formidable plugin uses [fastify-nextjs](https://github.com/fastify/fastify-nextjs) under the hood.

## License

The Formidable framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).