import { createInfoModal } from './createElements.js'

export const showInfoModal = (message, title = 'Информация') => {
	const modal = createInfoModal(message, title)
	document.body.appendChild(modal)
	const bootstrapModal = new bootstrap.Modal(modal)
	bootstrapModal.show()
	modal.addEventListener('hidden.bs.modal', () => {
		document.body.removeChild(modal)
	})
}
