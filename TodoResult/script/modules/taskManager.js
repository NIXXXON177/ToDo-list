export class TaskManager {
	constructor(username) {
		if (!username) throw new Error('Username is required')
		this.username = username
		this.tasks = this.loadTasks()
	}

	addTask(task, priority) {
		if (!task || !priority) {
			alert('Необходимо указать задачу и приоритет')
			return
		}

		const trimmedTask = task.trim().replace(/\s+/g, ' ')
		if (trimmedTask.length < 3) {
			alert('Задача должна содержать минимум 3 символа')
			return
		}

		if (trimmedTask.length > 100) {
			alert('Название задачи не должно превышать 100 символов')
			return
		}

		const existingTask = this.tasks.find(
			t => t.task.toLowerCase() === trimmedTask.toLowerCase()
		)

		this.tasks.push({
			id: Math.random().toString().substring(2, 10),
			task: trimmedTask,
			priority,
			status: 'В процессе',
		})
		this.saveTasks()
	}

	removeTask(index) {
		if (index < 0 || index >= this.tasks.length) {
			throw new Error('Недопустимый индекс задачи')
		}
		this.tasks.splice(index, 1)
		this.saveTasks()
	}

	completeTask(index) {
		if (index < 0 || index >= this.tasks.length) return
		if (this.tasks[index].status !== 'Выполнена') {
			this.tasks[index].status = 'Выполнена'
			this.tasks[index].completedAt = new Date().toISOString()
			this.saveTasks()
		}
	}

	getTasks() {
		return [...this.tasks]
	}

	saveTasks() {
		try {
			localStorage.setItem(this.username, JSON.stringify(this.tasks))
		} catch (e) {
			console.error('Error saving tasks:', e)
		}
	}

	loadTasks() {
		try {
			return JSON.parse(localStorage.getItem(this.username) || '[]')
		} catch (e) {
			console.error('Error loading tasks:', e)
			return []
		}
	}

	clearAllTasks() {
		this.tasks = []
		this.saveTasks()
	}

	updateTask(index, newText) {
		if (index < 0 || index >= this.tasks.length) {
			throw new Error('Недопустимый индекс задачи')
		}

		const trimmedText = newText.trim().replace(/\s+/g, ' ')
		if (!trimmedText) {
			throw new Error('Задача не может быть пустой')
		}

		if (trimmedText.length < 3) {
			throw new Error('Задача должна содержать минимум 3 символа')
		}

		if (trimmedText.length > 100) {
			throw new Error('Задача не должна превышать 100 символов')
		}

		const existingTask = this.tasks.find(
			(t, i) =>
				i !== index && t.task.toLowerCase() === trimmedText.toLowerCase()
		)

		if (this.tasks[index].status === 'Выполнена') {
			throw new Error('Нельзя редактировать выполненную задачу')
		}

		this.tasks[index].task = trimmedText
		this.tasks[index].updatedAt = new Date().toISOString()
		this.saveTasks()
	}
}
