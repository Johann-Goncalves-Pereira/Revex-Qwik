import { $ } from '@builder.io/qwik'

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

export const oklchToHex = $(({ l, c, h, a = 1 }: OKLCH): Hex => {
	// First convert OKLCH to Linear sRGB
	// These matrices are approximations based on CSS Color 4 specification
	const hueRadians = (h * Math.PI) / 180

	// Convert to OKLab
	const L = l
	const a_ = c * Math.cos(hueRadians)
	const b_ = c * Math.sin(hueRadians)

	// OKLab to Linear sRGB (approximation)
	const l_ = L + 0.3963377774 * a_ + 0.2158037573 * b_
	const m_ = L - 0.1055613458 * a_ - 0.0638541728 * b_
	const s_ = L - 0.0894841775 * a_ - 1.291485548 * b_

	// Convert to RGB
	let r = Math.pow(
		Math.max(0, Math.min(1, l_ * 3.1338561 - m_ * 1.6168667 - s_ * 0.4906146)),
		1 / 2.4,
	)
	let g = Math.pow(
		Math.max(0, Math.min(1, l_ * -0.9787684 + m_ * 1.9161415 + s_ * 0.033454)),
		1 / 2.4,
	)
	let b = Math.pow(
		Math.max(0, Math.min(1, l_ * 0.0719453 - m_ * 0.2289914 + s_ * 1.4052427)),
		1 / 2.4,
	)

	// Convert to 0-255 range
	r = Math.round(r * 255)
	g = Math.round(g * 255)
	b = Math.round(b * 255)

	// Convert to hex
	const toHex = (n: number): string => {
		const hex = n.toString(16).toLowerCase()
		return hex.length === 1 ? '0' + hex : hex
	}

	if (a < 1) {
		const alpha = Math.round(a * 255)
		return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}` as Hex8
	}

	const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}` as Hex6

	// If possible, convert to Hex3
	if (hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]) {
		return `#${hex[1]}${hex[3]}${hex[5]}` as Hex3
	}

	return hex
})
