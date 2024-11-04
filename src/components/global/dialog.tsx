import {
	$,
	component$,
	createContextId,
	JSX,
	Signal,
	Slot,
	useContext,
} from '@builder.io/qwik'

type Props = {
	id: string
	class?: string
	dataAttributes?: { [key: string]: string }
}

export const DialogContext = createContextId<Signal<boolean>>(
	'global.dialog-context',
)

export const ButtonDialog = component$(
	({
		id,
		class: className,
		dataAttributes,
		ariaLabel,
	}: Props & { ariaLabel: string }) => {
		const open = useContext(DialogContext)
		const handleOpen = $(() => {
			const dialog = document.getElementById(id) as HTMLDialogElement
			if (dialog) {
				dialog.showModal()
				open.value = true
			}
		})

		return (
			<button
				class={className}
				id={`${id}-button`}
				aria-label={ariaLabel}
				aria-expanded={open.value}
				aria-controls={id}
				aria-haspopup='dialog'
				onClick$={handleOpen}
				{...dataAttributes}
			>
				<Slot />
			</button>
		)
	},
)

export const Dialog = component$(
	({ id, class: className, dataAttributes }: Props) => {
		const open = useContext(DialogContext)

		const handleClose = $((event: MouseEvent) => {
			const element = event.target as HTMLDialogElement
			const dimensions = element.getBoundingClientRect()

			if (
				event.clientX < dimensions.left ||
				event.clientX > dimensions.right ||
				event.clientY < dimensions.top ||
				event.clientY > dimensions.bottom
			) {
				event.preventDefault()
				element.close()
				open.value = false
			}
		})

		const handleChange = $((event: Event) => {
			const element = event.target as HTMLDialogElement
			element.open ? (open.value = true) : (open.value = false)
		})

		return (
			<dialog
				class={className}
				id={id}
				aria-labelledby={`${id}-button`}
				{...dataAttributes}
				onClick$={handleClose}
				onClose$={handleChange}
			>
				<Slot />
			</dialog>
		)
	},
)
