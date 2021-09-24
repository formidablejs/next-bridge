import { helpers } from '@formidablejs/framework'

export default {

	# --------------------------------------------------------------------------
	# Developer Mode
	# --------------------------------------------------------------------------
	# Whether or not to launch Next.js in dev mode.

	dev: helpers.env 'APP_DEBUG', false

	# --------------------------------------------------------------------------
	# Next.js Directory
	# --------------------------------------------------------------------------
	# Location of the Next.js project.

	dir: 'resources/js'

	# --------------------------------------------------------------------------
	# Logging
	# --------------------------------------------------------------------------
	# Hide error messages containing server information.

	quiet: false

	# --------------------------------------------------------------------------
	# Next.js configuration
	# --------------------------------------------------------------------------
	# Next.js configuration options.
	#
	# See: https://nextjs.org/docs/api-reference/next.config.js/introduction

	config: {

	}
}
