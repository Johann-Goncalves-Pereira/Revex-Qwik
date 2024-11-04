import { $, component$, useOn, useOnWindow, useSignal } from '@builder.io/qwik'

type Props = {
	id?: string
	color?: string
	baseFrequency?: IntRange<50, 90>
}

export const NoiseHtmlString = ({ id, color, baseFrequency }: Props) => {
	return `<svg
			viewBox='0 0 250 250'
			xmlns='http://www.w3.org/2000/svg'
			${id ? `id='${id}'` : ''}
			style='color: ${color ? `${color}` : 'currentColor'};'
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

export const Noise = component$(({ id, color }: Props) => {
	return <div dangerouslySetInnerHTML={NoiseHtmlString({ id, color })} />
})

export const oklchToSRGB = $(({ l, c, h, a = 1 }: OKLCH): SRGB => {
	// Convert hue to radians
	const hueRadians = (h * Math.PI) / 180

	// Convert to OKLab
	const L = l
	const a_ = c * Math.cos(hueRadians)
	const b_ = c * Math.sin(hueRadians)

	// OKLab to Linear sRGB (approximation)
	const l_ = L + 0.3963377774 * a_ + 0.2158037573 * b_
	const m_ = L - 0.1055613458 * a_ - 0.0638541728 * b_
	const s_ = L - 0.0894841775 * a_ - 1.291485548 * b_

	// Linear sRGB to sRGB with gamma correction
	const toSRGB = (x: number): number => {
		x = Math.max(0, Math.min(1, x))
		return Math.round(Math.pow(x, 1 / 2.4) * 255)
	}

	// Convert to RGB (0-255 range)
	const r = toSRGB(l_ * 3.1338561 - m_ * 1.6168667 - s_ * 0.4906146)
	const g = toSRGB(l_ * -0.9787684 + m_ * 1.9161415 + s_ * 0.033454)
	const b = toSRGB(l_ * 0.0719453 - m_ * 0.2289914 + s_ * 1.4052427)

	return { r, g, b, a }
})
