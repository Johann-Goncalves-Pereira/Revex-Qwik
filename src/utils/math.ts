import { $ } from '@builder.io/qwik'

export const random = $(
	(min: number, max: number) => Math.random() * (max - min) + min,
)

export const randomInt = $(async (min: number, max: number) =>
	Math.floor(await random(min, max)),
)

export const clamp = $((min: number, val: number, max: number) =>
	Math.max(min, Math.min(val, max)),
)
