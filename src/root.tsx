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

export const clamp = $((val: number, min: number, max: number) =>
	Math.max(min, Math.min(val, max)),
)

export default component$(() => {
	/**
	 * The root of a QwikCity site always start with the <QwikCityProvider> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Don't remove the `<head>` and `<body>` elements.
	 */

	const sRGBColor = useSignal<SRGB>({
		r: 0,
		g: 0,
		b: 0,
	})

	const svg1 = useSignal(
		NoiseHtmlString({ color: sRGBColor.value, baseFrequency: 65 }),
	)
	const svg2 = useSignal(
		NoiseHtmlString({ color: sRGBColor.value, baseFrequency: 75 }),
	)
	const svg3 = useSignal(
		NoiseHtmlString({ color: sRGBColor.value, baseFrequency: 75 }),
	)

	useOnWindow(
		'load',
		$(async () => {
			const rootElement = document.documentElement
			const customPropertyValue =
				getComputedStyle(rootElement).getPropertyValue('--surface-150')
			const oklch = customPropertyValue
				.replace('oklch(', '')
				.replace(')', '')
				.replace(/%/g, '')
				.split(' ')
				.map(val => parseFloat(val))

			sRGBColor.value = await oklchToSRGB({
				l: parseFloat(`0.${oklch[0]}`),
				c: oklch[1],
				h: oklch[2],
			})

			svg1.value = NoiseHtmlString({
				color: sRGBColor.value,
				baseFrequency: 65,
			})
			svg1.value = window.btoa(svg1.value)
			svg1.value = `url('data:image/svg+xml;base64,${svg1.value}')`

			console.log(svg1.value)
			console.log(sRGBColor.value)
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
				style={{ '--body-noise-svg': svg1.value }}
			>
				<RouterOutlet />
			</body>
		</QwikCityProvider>
	)
})
