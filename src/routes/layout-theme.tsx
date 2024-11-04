import { component$, Slot } from '@builder.io/qwik'

import styles from './layout-theme.module.scss'

export default component$(() => {
	const gutters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
	const spaces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	return (
		<>
			<header class={styles.header}>
				{[spaces, spaces].map(sp =>
					sp.map(space => (
						<div
							class={styles.header__space}
							key={`${space}-${sp.toString().replace(/,/g, '')}`}
							style={{ gridRow: `${space}` }}
						/>
					)),
				)}
			</header>
			<main class={styles.main}>
				<Slot />
			</main>
			<footer class={styles.footer}>
				{gutters.map(gutter => (
					<div
						class={styles.footer__gutter}
						key={gutter}
						style={{ gridColumn: `${gutter}` }}
					/>
				))}
				<p class={styles.footer__title}>Page grid</p>
			</footer>
		</>
	)
})
