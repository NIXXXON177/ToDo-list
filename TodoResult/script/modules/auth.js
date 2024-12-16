import { showInfoModal } from './utils.js'

export const initAuth = () => {
	const authModal = new bootstrap.Modal(document.querySelector('#authModal'), {
		backdrop: 'static',
		keyboard: false,
	})

	const loginForm = document.querySelector('#loginForm')
	const registerForm = document.querySelector('#registerForm')
	const toggleAuthMode = document.querySelector('#toggleAuthMode')

	let isLoginMode = true

	// Переключение между формами
	toggleAuthMode.addEventListener('click', () => {
		isLoginMode = !isLoginMode
		loginForm.style.display = isLoginMode ? 'block' : 'none'
		registerForm.style.display = isLoginMode ? 'none' : 'block'
		toggleAuthMode.textContent = isLoginMode
			? 'Нет аккаунта? Зарегистрироваться'
			: 'Уже есть аккаунт? Войти'
	})

	// Обработка входа
	loginForm.addEventListener('submit', e => {
		e.preventDefault()
		const username = document.querySelector('#loginUsername').value.trim()
		const password = document.querySelector('#loginPassword').value.trim()

		if (!username || !password) {
			showInfoModal('Пожалуйста, заполните все поля', 'Ошибка валидации')
			return
		}

		const users = JSON.parse(localStorage.getItem('users') || '{}')

		if (users[username] && users[username].password === password) {
			localStorage.setItem('username', username)
			localStorage.setItem(
				'currentUser',
				JSON.stringify({
					username: username,
					password: password,
					id: users[username].id,
				})
			)
			authModal.hide()
			window.location.reload()
		} else {
			showInfoModal(
				'Неверное имя пользователя или пароль',
				'Ошибка авторизации'
			)
		}
	})

	// Обработка регистрации
	registerForm.addEventListener('submit', e => {
		e.preventDefault()
		const username = document.querySelector('#registerUsername').value.trim()
		const password = document.querySelector('#registerPassword').value.trim()
		const confirmPassword = document
			.querySelector('#confirmPassword')
			.value.trim()

		if (!username || !password || !confirmPassword) {
			showInfoModal('Пожалуйста, заполните все поля', 'Ошибка валидации')
			return
		}

		// Валидация ��еред показом модального окна
		if (username.length < 3) {
			showInfoModal('Имя пользователя должно содержать минимум 3 символа')
			return
		}

		if (password.length < 4) {
			showInfoModal('Пароль должен содержать минимум 4 символа')
			return
		}

		if (password !== confirmPassword) {
			showInfoModal('Пароли не совпадают')
			return
		}

		const users = JSON.parse(localStorage.getItem('users') || '{}')
		if (users[username]) {
			showInfoModal('Пользователь с таким именем уже существует')
			return
		}

		const showConfirm = (message, callback) => {
			const confirmModal = document.querySelector('#confirmModal')
			const messageElement = confirmModal.querySelector('#confirmMessage')
			const confirmButton = confirmModal.querySelector('#confirmButton')

			messageElement.textContent = message

			const handleConfirm = () => {
				callback()
				bootstrap.Modal.getInstance(confirmModal).hide()
				confirmButton.removeEventListener('click', handleConfirm)
			}

			confirmButton.addEventListener('click', handleConfirm, { once: true })
			new bootstrap.Modal(confirmModal).show()
		}

		showConfirm(
			'Вы уверены, что хотите зарегистрироваться с указанными данными?',
			() => {
				const userId = Math.random().toString().substring(2, 10)
				users[username] = {
					password: password,
					id: userId,
				}
				localStorage.setItem('users', JSON.stringify(users))
				localStorage.setItem('username', username)
				localStorage.setItem(
					'currentUser',
					JSON.stringify({
						username: username,
						password: password,
						id: userId,
					})
				)
				authModal.hide()
				window.location.reload()
			}
		)
	})

	if (!localStorage.getItem('username')) {
		authModal.show()
	}
}
