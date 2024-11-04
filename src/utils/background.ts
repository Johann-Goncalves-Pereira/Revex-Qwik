import { $ } from '@builder.io/qwik'
import { randomInt } from './math'

type Props = {
	id?: string
	color?: string
	baseFrequency?: IntRange<50, 90>
	opacity?: IntRange<0, 99>
}

export const NoiseHtmlString = ({
	id,
	color,
	baseFrequency,
	opacity,
}: Props) => {
	return `<svg
			viewBox='0 0 250 250'
			xmlns='http://www.w3.org/2000/svg'
			${id ? `id='${id}'` : ''}
			style='color: ${color ? `${color}` : 'currentColor'};opacity: ${
				opacity ? `${opacity / 100}` : '1'
			};'
		>
			<filter id='noiseFilter'>
				<feTurbulence
					type='fractalNoise'
					baseFrequency='0.${baseFrequency}'
					numOctaves='3'
					stitchTiles='stitch'
					result='noise'
				/>
				<feColorMatrix
					in='noise'
					type='matrix'
					values='0 0 0 0 0
									0 0 0 0 0
									0 0 0 0 0
									0 0 0 1 0'
					result='monoNoise'
				/>
				<feFlood flood-color='currentColor' result='color' />
				<feComposite
					in='color'
					in2='monoNoise'
					operator='in'
					result='coloredNoise'
				/>
			</filter>
			<rect width='100%' height='100%' filter='url(#noiseFilter)' />
		</svg>`
}

export const backgroundNoise = $(async (window: Window, document: Document) => {
	const root = document.documentElement
	const customProperty =
		getComputedStyle(root).getPropertyValue('--surface-150')

	const buildSvg = (bf: IntRange<50, 90>) =>
		`url('data:image/svg+xml;base64,${window.btoa(
			NoiseHtmlString({
				color: customProperty,
				baseFrequency: bf,
			}),
		)}')`

	const svg1 = buildSvg(65)
	const svg2 = buildSvg(70)
	const svg3 = buildSvg(75)

	return `
			.background-noise {
				animation: alternate-background-noise 200ms infinite;
			}
			@keyframes alternate-background-noise {
				0% {
					background-image: ${svg1};
				}
				50% {
					background-image: ${svg2};
				}
				100% {
					background-image: ${svg3};
				}
			}
		`
})
