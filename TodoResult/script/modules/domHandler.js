import { TaskManager } from './taskManager.js'
import { createConfirmModal, createTaskRow } from './createElements.js'
import { showInfoModal } from './utils.js'

export class DOMHandler {
	constructor(username) {
		this.taskManager = new TaskManager(username)
		this.taskTableBody = document.querySelector('tbody')
		this.taskModal = new bootstrap.Modal(document.querySelector('#taskModal'))
		this.modalTaskInput = document.querySelector('#modalTaskInput')
		this.modalPrioritySelect = document.querySelector('#modalPrioritySelect')
		this.saveTaskButton = document.querySelector('#saveTaskButton')
		this.openTaskModalBtn = document.querySelector('#openTaskModalBtn')
		this.priorityFilter = document.querySelector('#priorityFilter')
		this.currentFilter = 'all'
		this.clearAllTasksBtn = document.querySelector('#clearAllTasksBtn')
		this.confirmModal = new bootstrap.Modal(
			document.querySelector('#confirmModal')
		)
		this.confirmCallback = null
		this.boundHandleClick = this.handleClick.bind(this)
		this.boundHandleKeyPress = this.handleKeyPress.bind(this)
	}

	showConfirm(message, callback) {
		const confirmModal = document.querySelector('#confirmModal')
		if (!confirmModal) {
			console.error('Модальное окно подтверждения не найдено')
			return
		}

		const messageElement = confirmModal.querySelector('#confirmMessage')
		const confirmButton = confirmModal.querySelector('#confirmButton')

		if (!messageElement || !confirmButton) {
			console.error('Элементы модального окна не найдены')
			return
		}

		messageElement.textContent = message

		const handleConfirm = () => {
			callback()
			this.confirmModal.hide()
			confirmButton.removeEventListener('click', handleConfirm)
		}

		confirmButton.addEventListener('click', handleConfirm, { once: true })
		this.confirmModal.show()
	}

	init() {
		this.openTaskModalBtn.addEventListener('click', () => this.taskModal.show())
		this.saveTaskButton.addEventListener('click', () => this.addTask())
		this.priorityFilter.addEventListener('change', e => {
			this.currentFilter = e.target.value
			this.renderTasks()
		})

		this.taskTableBody.addEventListener('click', this.boundHandleClick)
		this.modalTaskInput.addEventListener('keypress', this.boundHandleKeyPress)
		this.clearAllTasksBtn.addEventListener('click', () => this.handleClearAll())

		this.renderTasks()
	}

	handleClick(e) {
		const button = e.target.closest('button')
		if (!button) return

		const index = button.dataset.index
		if (!index) return

		if (button.classList.contains('btn-danger')) {
			this.showConfirm('Вы уверены, что хотите удалить эту задачу?', () => {
				try {
					this.taskManager.removeTask(parseInt(index))
					this.renderTasks()
				} catch (error) {
					showInfoModal(error.message, 'Ошибка')
				}
			})
		} else if (button.classList.contains('btn-success')) {
			this.showConfirm('Вы уверены, что хотите завершить эту задачу?', () => {
				try {
					this.taskManager.completeTask(parseInt(index))
					this.renderTasks()
				} catch (error) {
					showInfoModal(error.message, 'Ошибка')
				}
			})
		} else if (button.classList.contains('btn-info')) {
			const taskText = button.closest('tr').querySelector('.task-text')
			taskText.focus()
		}
	}

	handleKeyPress(e) {
		if (e.key === 'Enter') {
			e.preventDefault()
			this.addTask()
		}
	}

	handleClearAll() {
		const tasks = this.taskManager.getTasks()
		if (tasks.length === 0) {
			showInfoModal('Список задач пуст', 'Информация')
			return
		}

		this.showConfirm(
			'Вы уверены, что хотите удалить все задачи? Это действие нельзя отменить.',
			() => {
				this.taskManager.clearAllTasks()
				this.renderTasks()
			}
		)
	}

	renderTasks() {
		this.taskTableBody.innerHTML = ''
		const tasks = this.taskManager.getTasks()
		const filteredTasks =
			this.currentFilter === 'all'
				? tasks
				: tasks.filter(task => task.priority === this.currentFilter)

		if (filteredTasks.length === 0) {
			const row = document.createElement('tr')
			const cell = document.createElement('td')
			cell.colSpan = 4
			cell.className = 'text-center p-4 text-muted'
			cell.textContent =
				this.currentFilter === 'all'
					? 'Список задач пуст. Создайте новую задачу!'
					: 'Нет задач с выбранным приоритетом'
			row.appendChild(cell)
			this.taskTableBody.appendChild(row)
			return
		}

		filteredTasks.forEach((task, index) => {
			const row = createTaskRow(task, index)
			this.taskTableBody.appendChild(row)
		})

		const taskTexts = this.taskTableBody.querySelectorAll('.task-text')
		taskTexts.forEach(taskText => {
			// Предотвращаем вставку длинного текста
			taskText.addEventListener('paste', e => {
				e.preventDefault()
				const text = e.clipboardData.getData('text')
				const truncatedText = text.slice(0, 100)
				document.execCommand('insertText', false, truncatedText)
			})

			// Ограничиваем длину при вводе
			taskText.addEventListener('input', e => {
				if (e.target.textContent.length > 100) {
					e.target.textContent = e.target.textContent.slice(0, 100)
				}
			})

			// Сохраняем при нажатии Enter
			taskText.addEventListener('keydown', e => {
				if (e.key === 'Enter') {
					e.preventDefault()
					const index = e.target.dataset.index
					const newText = e.target.textContent.trim()
					try {
						this.taskManager.updateTask(index, newText)
						e.target.blur()
					} catch (error) {
						alert(error.message)
						this.renderTasks()
					}
				}
			})

			// Сохраняем при потере фокуса
			taskText.addEventListener('blur', e => {
				const index = e.target.dataset.index
				const newText = e.target.textContent.trim()
				try {
					this.taskManager.updateTask(index, newText)
				} catch (error) {
					alert(error.message)
					this.renderTasks()
				}
			})
		})
	}

	addTask() {
		const task = this.modalTaskInput.value.trim()
		const priority = this.modalPrioritySelect.value

		if (!task) return

		this.showConfirm('Вы уверены, что хотите добавить эту задачу?', () => {
			try {
				this.taskManager.addTask(task, priority)
				this.renderTasks()
				this.clearForm()
			} catch (error) {
				showInfoModal(error.message, 'Ошибка')
			}
		})
	}

	clearForm() {
		this.modalTaskInput.value = ''
		this.modalPrioritySelect.selectedIndex = 0
	}

	destroy() {
		this.taskTableBody.removeEventListener('click', this.boundHandleClick)
		this.modalTaskInput.removeEventListener(
			'keypress',
			this.boundHandleKeyPress
		)
	}
}
