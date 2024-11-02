import { component$, Slot } from '@builder.io/qwik'

export default component$(() => {
	return (
		<>
			<header></header>
			<main>
				<Slot />
			</main>
			<footer></footer>
		</>
	)
})
