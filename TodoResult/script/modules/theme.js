export const initTheme = () => {
	const themeToggle = document.querySelector('#themeToggle')
	if (!themeToggle) {
		console.error('Элемент переключения темы не найден')
		return
	}

	try {
		const savedTheme = localStorage.getItem('theme') || 'light'
		document.body.setAttribute('data-bs-theme', savedTheme)
		themeToggle.checked = savedTheme === 'dark'

		themeToggle.addEventListener('change', () => {
			try {
				const newTheme = themeToggle.checked ? 'dark' : 'light'
				document.body.setAttribute('data-bs-theme', newTheme)
				localStorage.setItem('theme', newTheme)
			} catch (error) {
				console.error('Ошибка при изменении темы:', error)
			}
		})
	} catch (error) {
		console.error('Ошибка при инициализации темы:', error)
	}
}
