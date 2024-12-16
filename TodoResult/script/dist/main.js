import {
	createAppStructure,
	createAuthModal,
	createTaskModal,
	createConfirmModal,
	createLogoutConfirmModal,
} from '../modules/createElements.js'

import { initAuth } from '../modules/auth.js'
import { DOMHandler } from '../modules/domHandler.js'
import { initEvents } from '../modules/events.js'
import { initTheme } from '../modules/theme.js'
import { showInfoModal } from '../modules/utils.js'

document.addEventListener('DOMContentLoaded', () => {
	// Создаем основную структуру
	const appStructure = createAppStructure()
	if (appStructure) {
		document.body.appendChild(appStructure)
		initTheme()
	}

	// Создаем модальные окна
	const authModal = createAuthModal()
	const taskModal = createTaskModal()
	const confirmModal = createConfirmModal()
	const logoutConfirmModal = createLogoutConfirmModal()

	// Добавляем модальные окна в DOM
	document.body.appendChild(authModal)
	document.body.appendChild(taskModal)
	document.body.appendChild(confirmModal)
	document.body.appendChild(logoutConfirmModal)

	// Инициализируем авторизацию
	initAuth()

	// Если пользователь авторизован, инициализируем обработчики
	const username = localStorage.getItem('username')
	if (username) {
		const domHandler = new DOMHandler(username)
		domHandler.init()
		initEvents()
	}
})
