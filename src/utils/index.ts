import type { todoInfo } from '@/views/todos/type'
import { notification } from 'ant-design-vue'

export const setTodoLocalStorage = (todos: todoInfo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

export const getTodoLocalStorage = (): todoInfo[] => {
  const data = localStorage.getItem('todos')
  return data ? JSON.parse(data) : []
}

export function getUserData() {
  const username = localStorage.getItem('username')
  return username ? { username } : null
}

export const notify = (
  type: 'success' | 'warning' | 'error',
  message: string,
  description?: string
) => {
  notification[type]({
    message,
    description,
    placement: localStorage.getItem('lang') == 'fa' ? 'topLeft' : 'topRight',
    duration: 2
  })
}
