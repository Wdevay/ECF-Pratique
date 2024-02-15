import { defineStore } from "pinia"
import {ref} from "vue"

const STORE_NAME = "todo"
const STORE_LOCALE_STORAGE_KEY = "todos"

const getDefaultState = () => []

const getCurrentState = () => {
    const localeData = localStorage.getItem(STORE_LOCALE_STORAGE_KEY);
  return localeData ? JSON.parse(localeData) : getDefaultState();
}

export const useTodoStore = defineStore(STORE_NAME, () => {
    const input_content = ref('')
    const input_category = ref(null)
    const todos = ref(getCurrentState())

    function updateLocaleStorage() {
        localStorage.setItem(
            STORE_LOCALE_STORAGE_KEY,
            JSON.stringify(todos.value)
        )
    }

    function addTodo() {
        if (input_content.value.trim() === '' || input_category.value ===null){
          return
        }
        todos.value.push({
          content: input_content.value,
          category: input_category.value,
          done: false,
          createdAt: new Date().getTime()
        })
      
        input_content.value =''
        input_category.value = null
        updateLocaleStorage()
      }

      function removeTodo(todo) {
        todos.value = todos.value.filter(t=> t !== todo)
        updateLocaleStorage()
      }

      return { todos, input_content, input_category, addTodo, removeTodo, updateLocaleStorage }
})