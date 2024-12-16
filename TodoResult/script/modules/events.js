import {
	createUserInfo,
	createLogoutConfirmModal,
	createLogoutButton,
} from './createElements.js'
import { showInfoModal } from './utils.js'

export const initEvents = () => {
	const header = document.querySelector('h3')
	const currentUser = JSON.parse(localStorage.getItem('currentUser'))
	const userInfo = createUserInfo(currentUser)
	header.appendChild(userInfo)

	const confirmModal = new bootstrap.Modal(createLogoutConfirmModal())
	const logoutButton = createLogoutButton()
	userInfo.appendChild(logoutButton)

	logoutButton.addEventListener('click', () => {
		showConfirm('Вы действительно хотите выйти?', () => {
			localStorage.removeItem('username')
			localStorage.removeItem('currentUser')
			window.location.reload()
		})
	})
}

const showConfirm = (message, callback) => {
	const confirmModal = document.querySelector('#logoutConfirmModal')
	const messageElement = confirmModal.querySelector('#logoutConfirmMessage')
	const confirmButton = confirmModal.querySelector('#confirmLogoutBtn')

	messageElement.textContent = message

	const handleConfirm = () => {
		callback()
		bootstrap.Modal.getInstance(confirmModal).hide()
		confirmButton.removeEventListener('click', handleConfirm)
	}

	confirmButton.addEventListener('click', handleConfirm)
	new bootstrap.Modal(confirmModal).show()
}

const showUserInfo = () => {
	const currentUser = JSON.parse(localStorage.getItem('currentUser'))
	const users = JSON.parse(localStorage.getItem('users') || '{}')
	const tasks = JSON.parse(localStorage.getItem(currentUser.username) || '[]')

	let message = `
		<h6>Текущий пользователь:</h6>
		<p>
		Имя: ${currentUser.username}<br>
		Количество задач: ${tasks.length}
		</p>
		<h6>Другие пользователи:</h6>
	`

	Object.entries(users).forEach(([username, data]) => {
		if (username !== currentUser.username) {
			const userTasks = JSON.parse(localStorage.getItem(username) || '[]')
			message += `
				<p>
				Имя: ${username}<br>
				Количество задач: ${userTasks.length}
				</p>
			`
		}
	})

	showInfoModal(message, 'Информация о пользователях')
}
