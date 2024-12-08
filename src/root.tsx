import { component$ } from '@builder.io/qwik'
import { isDev } from '@builder.io/qwik/build'
import {
	QwikCityProvider,
	RouterOutlet,
	ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import { RouterHead } from '@components/router-head/router-head'

import '@media/styles/_index.scss'
import '@media/styles/_tailwind.css'
import '@total-typescript/ts-reset'

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCityProvider> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Don't remove the `<head>` and `<body>` elements.
	 */

	return (
		<QwikCityProvider>
			<head>
				<meta charset='utf-8' />
				{!isDev && (
					<link
						rel='manifest'
						href={`${import.meta.env.BASE_URL}manifest.json`}
					/>
				)}
				<RouterHead />
				{!isDev && <ServiceWorkerRegister />}
			</head>
			<body
				class='bg-gray-100 text-gray-950 dark:bg-gray-950 dark:text-gray-100'
				lang='en'
				data-env={import.meta.env.DEV ? 'dev' : 'prod'}
			>
				<RouterOutlet />
			</body>
		</QwikCityProvider>
	)
})
