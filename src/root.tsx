import { $, component$, useOnDocument } from '@builder.io/qwik'
import { isDev } from '@builder.io/qwik/build'
import {
	QwikCityProvider,
	RouterOutlet,
	ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import { RouterHead } from '@components/router-head/router-head'

import '@media/styles/_index.scss'
import '@total-typescript/ts-reset'
import { backgroundNoise } from '@utils/background'

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCityProvider> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Don't remove the `<head>` and `<body>` elements.
	 */

	useOnDocument(
		'load',
		$(async () => {
			const noiseStyle = await backgroundNoise(window, document)
			let styleElement = document.querySelector('style#noise-background')
			if (!styleElement) {
				styleElement = document.createElement('style')
				styleElement.id = 'noise-background'
				document.head.appendChild(styleElement)
			}
			styleElement.textContent = noiseStyle
		}),
	)

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
			<body lang='en' data-env={import.meta.env.DEV ? 'dev' : 'prod'}>
				<RouterOutlet />
			</body>
		</QwikCityProvider>
	)
})
