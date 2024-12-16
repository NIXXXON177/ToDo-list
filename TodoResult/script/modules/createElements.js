export {
	createAppStructure,
	createAuthModal,
	createTaskModal,
	createConfirmModal,
	createLogoutConfirmModal,
	createUserInfo,
	createLogoutButton,
	createTaskRow,
	createInfoModal,
}

const createAppStructure = () => {
	const appContainer = document.createElement('div')
	appContainer.className =
		'app-container min-vh-100 w-100 d-flex align-items-center justify-content-center flex-column py-5 bg-body'

	const containerDiv = document.createElement('div')
	containerDiv.className = 'container bg-body rounded-3 shadow-lg p-4'
	containerDiv.style.maxWidth = '1000px'

	const headerDiv = document.createElement('div')
	headerDiv.className = 'd-flex justify-content-between align-items-center mb-4'

	const title = document.createElement('h3')
	title.className = 'text-primary mb-0'
	title.textContent = '✨ Todo App'

	const formCheckDiv = document.createElement('div')
	formCheckDiv.className = 'form-check form-switch'

	const themeToggle = document.createElement('input')
	themeToggle.className = 'form-check-input'
	themeToggle.type = 'checkbox'
	themeToggle.id = 'themeToggle'

	const themeLabel = document.createElement('label')
	themeLabel.className = 'form-check-label'
	themeLabel.setAttribute('for', 'themeToggle')
	themeLabel.innerHTML = '<i class="bi bi-moon-stars"></i>'

	formCheckDiv.append(themeToggle, themeLabel)
	headerDiv.append(title, formCheckDiv)

	const buttonDiv = document.createElement('div')
	buttonDiv.className = 'd-flex gap-3 mb-4 flex-wrap justify-content-between'

	const buttonGroup = document.createElement('div')
	buttonGroup.className = 'd-flex gap-2'

	const createTaskButton = document.createElement('button')
	createTaskButton.className = 'btn btn-primary shadow-sm'
	createTaskButton.id = 'openTaskModalBtn'
	createTaskButton.innerHTML = '<i class="bi bi-plus-lg"></i> Создать задачу'

	const clearTasksButton = document.createElement('button')
	clearTasksButton.className = 'btn btn-warning shadow-sm'
	clearTasksButton.id = 'clearAllTasksBtn'
	clearTasksButton.innerHTML = '<i class="bi bi-trash"></i> Очистка'

	buttonGroup.append(createTaskButton, clearTasksButton)

	const priorityFilter = document.createElement('select')
	priorityFilter.className = 'form-select shadow-sm'
	priorityFilter.id = 'priorityFilter'
	priorityFilter.style.width = 'auto'

	const options = [
		{ value: 'all', text: '🔍 Все задачи' },
		{ value: 'table-light', text: '📝 Обычный приоритет' },
		{ value: 'table-warning', text: '⚠️ Важный приоритет' },
		{ value: 'table-danger', text: '🔥 Срочный приоритет' },
	]

	options.forEach(opt => {
		const option = document.createElement('option')
		option.value = opt.value
		option.textContent = opt.text
		priorityFilter.append(option)
	})

	buttonDiv.append(buttonGroup, priorityFilter)

	const tableWrapper = document.createElement('div')
	tableWrapper.className = 'table-wrapper table-responsive'

	const table = document.createElement('table')
	table.className = 'table table-hover table-bordered shadow-sm'

	const thead = document.createElement('thead')
	thead.className = 'table-primary'

	const headerRow = document.createElement('tr')
	const headers = [
		{ text: '№', style: 'width: 5%', className: 'text-center' },
		{ text: 'Задача', style: 'width: 45%' },
		{ text: 'Статус', style: 'width: 20%' },
		{ text: 'Действия', style: 'width: 30%' },
	]

	headers.forEach(header => {
		const th = document.createElement('th')
		th.scope = 'col'
		th.textContent = header.text
		if (header.style) th.style.width = header.style
		if (header.className) th.className = header.className
		headerRow.append(th)
	})

	thead.append(headerRow)
	table.append(thead)

	const tbody = document.createElement('tbody')
	table.append(tbody)

	tableWrapper.append(table)

	containerDiv.append(headerDiv, buttonDiv, tableWrapper)
	appContainer.append(containerDiv)

	return appContainer
}

const createAuthModal = () => {
	const modalDiv = document.createElement('div')
	modalDiv.className = 'modal fade'
	modalDiv.id = 'authModal'
	modalDiv.setAttribute('tabindex', '-1')
	modalDiv.setAttribute('aria-labelledby', 'authModalLabel')
	modalDiv.setAttribute('aria-hidden', 'true')

	const modalDialog = document.createElement('div')
	modalDialog.className = 'modal-dialog'

	const modalContent = document.createElement('div')
	modalContent.className = 'modal-content'

	const modalHeader = document.createElement('div')
	modalHeader.className = 'modal-header'

	const modalTitle = document.createElement('h5')
	modalTitle.className = 'modal-title'
	modalTitle.id = 'authModalLabel'
	modalTitle.textContent = 'Авторизация'

	const closeButton = document.createElement('button')
	closeButton.type = 'button'
	closeButton.className = 'btn-close'
	closeButton.setAttribute('data-bs-dismiss', 'modal')
	closeButton.setAttribute('aria-label', 'Close')

	modalHeader.append(modalTitle, closeButton)

	const modalBody = document.createElement('div')
	modalBody.className = 'modal-body'

	const loginForm = document.createElement('form')
	loginForm.id = 'loginForm'

	const createFormGroup = (id, labelText, type, placeholder) => {
		const div = document.createElement('div')
		div.className = 'mb-3'

		const label = document.createElement('label')
		label.className = 'form-label'
		label.setAttribute('for', id)
		label.textContent = labelText

		const input = document.createElement('input')
		input.type = type
		input.className = 'form-control'
		input.id = id
		input.placeholder = placeholder

		div.append(label, input)
		return div
	}

	const loginUsernameGroup = createFormGroup(
		'loginUsername',
		'Имя пользователя',
		'text',
		'Введите имя пользователя'
	)
	const loginPasswordGroup = createFormGroup(
		'loginPassword',
		'Пароль',
		'password',
		'Введите пароль'
	)

	const loginButton = document.createElement('button')
	loginButton.type = 'submit'
	loginButton.className = 'btn btn-primary w-100'
	loginButton.textContent = 'Войти'

	loginForm.append(loginUsernameGroup, loginPasswordGroup, loginButton)

	const registerForm = document.createElement('form')
	registerForm.id = 'registerForm'
	registerForm.style.display = 'none'

	const registerUsernameGroup = createFormGroup(
		'registerUsername',
		'Имя пользователя',
		'text',
		'Введите имя пользователя'
	)
	const registerPasswordGroup = createFormGroup(
		'registerPassword',
		'Пароль',
		'password',
		'Введите пароль'
	)
	const confirmPasswordGroup = createFormGroup(
		'confirmPassword',
		'Подтвердите пароль',
		'password',
		'Подтвердите пароль'
	)

	const registerButton = document.createElement('button')
	registerButton.type = 'submit'
	registerButton.className = 'btn btn-success w-100'
	registerButton.textContent = 'Зарегистрироваться'

	registerForm.append(
		registerUsernameGroup,
		registerPasswordGroup,
		confirmPasswordGroup,
		registerButton
	)

	modalBody.append(loginForm, registerForm)

	const modalFooter = document.createElement('div')
	modalFooter.className = 'modal-footer justify-content-center'

	const toggleButton = document.createElement('button')
	toggleButton.type = 'button'
	toggleButton.className = 'btn btn-link'
	toggleButton.id = 'toggleAuthMode'
	toggleButton.textContent = 'Нет аккаунта? Зарегистрироваться'

	modalFooter.append(toggleButton)

	modalContent.append(modalHeader, modalBody, modalFooter)
	modalDialog.append(modalContent)
	modalDiv.append(modalDialog)

	return modalDiv
}

const createTaskModal = () => {
	const modalDiv = document.createElement('div')
	modalDiv.className = 'modal fade'
	modalDiv.id = 'taskModal'
	modalDiv.setAttribute('tabindex', '-1')
	modalDiv.setAttribute('aria-labelledby', 'taskModalLabel')
	modalDiv.setAttribute('aria-hidden', 'true')

	const modalDialog = document.createElement('div')
	modalDialog.className = 'modal-dialog'

	const modalContent = document.createElement('div')
	modalContent.className = 'modal-content'

	const modalHeader = document.createElement('div')
	modalHeader.className = 'modal-header'

	const modalTitle = document.createElement('h5')
	modalTitle.className = 'modal-title'
	modalTitle.id = 'taskModalLabel'
	modalTitle.textContent = 'Создать задачу'

	const closeButton = document.createElement('button')
	closeButton.type = 'button'
	closeButton.className = 'btn-close'
	closeButton.setAttribute('data-bs-dismiss', 'modal')
	closeButton.setAttribute('aria-label', 'Close')

	modalHeader.append(modalTitle, closeButton)

	const modalBody = document.createElement('div')
	modalBody.className = 'modal-body'

	const errorDiv = document.createElement('div')
	errorDiv.className = 'alert alert-danger d-none'
	errorDiv.id = 'taskModalError'
	errorDiv.role = 'alert'

	const taskInputDiv = document.createElement('div')
	taskInputDiv.className = 'mb-3'

	const taskLabel = document.createElement('label')
	taskLabel.setAttribute('for', 'modalTaskInput')
	taskLabel.className = 'form-label'
	taskLabel.textContent = 'Задача'

	const taskInput = document.createElement('input')
	taskInput.type = 'text'
	taskInput.className = 'form-control'
	taskInput.id = 'modalTaskInput'
	taskInput.placeholder = 'Введите задачу'
	taskInput.maxLength = 100

	taskInputDiv.append(taskLabel, taskInput)

	const priorityDiv = document.createElement('div')
	priorityDiv.className = 'mb-3'

	const priorityLabel = document.createElement('label')
	priorityLabel.setAttribute('for', 'modalPrioritySelect')
	priorityLabel.className = 'form-label'
	priorityLabel.textContent = 'Приоритет'

	const prioritySelect = document.createElement('select')
	prioritySelect.className = 'form-select'
	prioritySelect.id = 'modalPrioritySelect'

	const priorities = [
		{ value: 'table-light', text: 'Обычный' },
		{ value: 'table-warning', text: 'Важный' },
		{ value: 'table-danger', text: 'Срочный' },
	]

	priorities.forEach(priority => {
		const option = document.createElement('option')
		option.value = priority.value
		option.textContent = priority.text
		prioritySelect.append(option)
	})

	priorityDiv.append(priorityLabel, prioritySelect)
	modalBody.append(errorDiv, taskInputDiv, priorityDiv)

	const modalFooter = document.createElement('div')
	modalFooter.className = 'modal-footer'

	const cancelButton = document.createElement('button')
	cancelButton.type = 'button'
	cancelButton.className = 'btn btn-secondary'
	cancelButton.setAttribute('data-bs-dismiss', 'modal')
	cancelButton.textContent = 'Отмена'

	const saveButton = document.createElement('button')
	saveButton.type = 'button'
	saveButton.className = 'btn btn-primary'
	saveButton.id = 'saveTaskButton'
	saveButton.textContent = 'Сохранить'

	modalFooter.append(cancelButton, saveButton)
	modalContent.append(modalHeader, modalBody, modalFooter)
	modalDialog.append(modalContent)
	modalDiv.append(modalDialog)

	return modalDiv
}

const createConfirmModal = () => {
	const modalDiv = document.createElement('div')
	modalDiv.className = 'modal fade'
	modalDiv.id = 'confirmModal'

	const dialog = document.createElement('div')
	dialog.className = 'modal-dialog'

	const content = document.createElement('div')
	content.className = 'modal-content'

	const header = document.createElement('div')
	header.className = 'modal-header'

	const title = document.createElement('h5')
	title.className = 'modal-title'
	title.textContent = 'Подтверждение'

	const closeBtn = document.createElement('button')
	closeBtn.className = 'btn-close'
	closeBtn.setAttribute('data-bs-dismiss', 'modal')

	const body = document.createElement('div')
	body.className = 'modal-body'

	const message = document.createElement('p')
	message.id = 'confirmMessage'

	const footer = document.createElement('div')
	footer.className = 'modal-footer'

	const cancelBtn = document.createElement('button')
	cancelBtn.className = 'btn btn-secondary'
	cancelBtn.setAttribute('data-bs-dismiss', 'modal')
	cancelBtn.textContent = 'Отмена'

	const confirmBtn = document.createElement('button')
	confirmBtn.className = 'btn btn-primary'
	confirmBtn.id = 'confirmButton'
	confirmBtn.textContent = 'Подтвердить'

	header.append(title, closeBtn)
	body.append(message)
	footer.append(cancelBtn, confirmBtn)
	content.append(header, body, footer)
	dialog.append(content)
	modalDiv.append(dialog)

	return modalDiv
}

const createLogoutConfirmModal = () => {
	const modalDiv = document.createElement('div')
	modalDiv.className = 'modal fade'
	modalDiv.id = 'logoutConfirmModal'

	const dialog = document.createElement('div')
	dialog.className = 'modal-dialog'

	const content = document.createElement('div')
	content.className = 'modal-content'

	const header = document.createElement('div')
	header.className = 'modal-header'

	const title = document.createElement('h5')
	title.className = 'modal-title'
	title.textContent = 'Подтверждение выхода'

	const closeBtn = document.createElement('button')
	closeBtn.className = 'btn-close'
	closeBtn.setAttribute('type', 'button')
	closeBtn.setAttribute('data-bs-dismiss', 'modal')

	const body = document.createElement('div')
	body.className = 'modal-body'

	const message = document.createElement('p')
	message.id = 'logoutConfirmMessage'

	const footer = document.createElement('div')
	footer.className = 'modal-footer'

	const cancelBtn = document.createElement('button')
	cancelBtn.className = 'btn btn-secondary'
	cancelBtn.setAttribute('type', 'button')
	cancelBtn.setAttribute('data-bs-dismiss', 'modal')
	cancelBtn.textContent = 'Отмена'

	const confirmBtn = document.createElement('button')
	confirmBtn.className = 'btn btn-primary'
	confirmBtn.setAttribute('type', 'button')
	confirmBtn.id = 'confirmLogoutBtn'
	confirmBtn.textContent = 'Подтвердить'

	header.append(title, closeBtn)
	body.append(message)
	footer.append(cancelBtn, confirmBtn)
	content.append(header, body, footer)
	dialog.append(content)
	modalDiv.append(dialog)
	document.body.appendChild(modalDiv)
	return modalDiv
}

const createUserInfo = currentUser => {
	const userInfoDiv = document.createElement('div')
	userInfoDiv.className = 'user-info'

	const username = document.createElement('p')
	username.className = 'username'
	username.textContent = `Имя пользователя: ${currentUser.username}`

	userInfoDiv.append(username)

	return userInfoDiv
}

const createLogoutButton = () => {
	const logoutButton = document.createElement('button')
	logoutButton.className = 'btn btn-danger'
	logoutButton.id = 'logoutBtn'
	logoutButton.textContent = 'Выйти'

	return logoutButton
}

const createTaskRow = (task, index) => {
	const tr = document.createElement('tr')
	tr.className = task.priority

	const indexTd = document.createElement('td')
	indexTd.className = 'text-center'
	indexTd.textContent = index + 1

	const taskTd = document.createElement('td')
	const taskText = document.createElement('span')
	taskText.className = 'task-text'
	taskText.contentEditable = true
	taskText.dataset.index = index
	taskText.textContent = task.task
	
	const statusTd = document.createElement('td')
	statusTd.className = 'text-center'
	statusTd.textContent = task.status

	const actionsTd = document.createElement('td')
	actionsTd.className = 'text-center'

	const btnGroup = document.createElement('div')
	btnGroup.className = 'btn-group'

	const completeBtn = document.createElement('button')
	const editBtn = document.createElement('button')
	const deleteBtn = document.createElement('button')

	if (task.status === 'Выполнена') {
		completeBtn.className = 'btn btn-secondary btn-sm'
		editBtn.className = 'btn btn-secondary btn-sm'
		completeBtn.disabled = true
		editBtn.disabled = true
		taskText.contentEditable = false
		taskText.style.textDecoration = 'line-through'
	} else {
		completeBtn.className = 'btn btn-success btn-sm'
		editBtn.className = 'btn btn-info btn-sm'
	}

	completeBtn.innerHTML = '<i class="bi bi-check-lg"></i>'
	completeBtn.dataset.index = index

	editBtn.innerHTML = '<i class="bi bi-pencil"></i>'
	editBtn.dataset.index = index

	deleteBtn.className = 'btn btn-danger btn-sm'
	deleteBtn.innerHTML = '<i class="bi bi-trash"></i>'
	deleteBtn.dataset.index = index

	btnGroup.append(completeBtn, editBtn, deleteBtn)
	actionsTd.appendChild(btnGroup)

	taskTd.appendChild(taskText)
	tr.append(indexTd, taskTd, statusTd, actionsTd)
	return tr
}

const createInfoModal = (message, title = 'Информация') => {
	const modalDiv = document.createElement('div')
	modalDiv.className = 'modal fade'

	const dialog = document.createElement('div')
	dialog.className = 'modal-dialog'

	const content = document.createElement('div')
	content.className = 'modal-content'

	const header = document.createElement('div')
	header.className = 'modal-header'

	const titleEl = document.createElement('h5')
	titleEl.className = 'modal-title'
	titleEl.textContent = title

	const closeBtn = document.createElement('button')
	closeBtn.className = 'btn-close'
	closeBtn.setAttribute('data-bs-dismiss', 'modal')

	const body = document.createElement('div')
	body.className = 'modal-body'

	const messageP = document.createElement('div')
	messageP.innerHTML = message

	const footer = document.createElement('div')
	footer.className = 'modal-footer'

	const okBtn = document.createElement('button')
	okBtn.className = 'btn btn-primary'
	okBtn.setAttribute('data-bs-dismiss', 'modal')
	okBtn.textContent = 'OK'

	header.append(titleEl, closeBtn)
	body.append(messageP)
	footer.append(okBtn)
	content.append(header, body, footer)
	dialog.append(content)
	modalDiv.append(dialog)

	return modalDiv
}
