import { $, component$, useOnWindow, useSignal } from '@builder.io/qwik'
import { isDev } from '@builder.io/qwik/build'
import {
	QwikCityProvider,
	RouterOutlet,
	ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import { RouterHead } from './components/router-head/router-head'

import './media/styles/_index.scss'
import { NoiseHtmlString, oklchToSRGB } from './components/layout/noise/noise'

export const clamp = $((min: number, val: number, max: number) =>
	Math.max(min, Math.min(val, max)),
)

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCityProvider> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Don't remove the `<head>` and `<body>` elements.
	 */

	const svg1 = useSignal(
		NoiseHtmlString({ color: 'oklch(18% 0.00625 175)', baseFrequency: 65 }),
	)
	const svg2 = useSignal(
		NoiseHtmlString({ color: 'oklch(18% 0.00625 175)', baseFrequency: 70 }),
	)
	const svg3 = useSignal(
		NoiseHtmlString({ color: 'oklch(18% 0.00625 175)', baseFrequency: 75 }),
	)

	useOnWindow(
		'load',
		$(async () => {
			const rootElement = document.documentElement
			const customPropertyValue =
				getComputedStyle(rootElement).getPropertyValue('--surface-150')

			const svgMount = (bf: IntRange<50, 90>) =>
				`url('data:image/svg+xml;base64,${window.btoa(
					NoiseHtmlString({
						color: customPropertyValue,
						baseFrequency: bf,
					}),
				)}')`

			svg1.value = svgMount(65)
			svg2.value = svgMount(70)
			svg3.value = svgMount(75)
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
			<body
				data-env={import.meta.env.DEV ? 'dev' : 'prod'}
				lang='en'
				style={{
					'--body-noise-svg-1': svg1.value,
					'--body-noise-svg-2': svg2.value,
					'--body-noise-svg-3': svg3.value,
				}}
			>
				<RouterOutlet />
			</body>
		</QwikCityProvider>
	)
})
