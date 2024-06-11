<template>
  <div class="child:flex child:items-center child:justify-center">
    <div>
      <a-card
        class="dark:bg-zinc-800 dark:child:!text-white text-center"
        :title="$t('todoList')"
        style="width: 80%; height: 60vh; overflow-y: scroll"
      >
        <div
          class="flex items-center w-full justify-between border-2 my-2 border-black/10 p-4 rounded-xl child:text-sm md:child:text-2xl"
          v-for="(todo, index) in todos"
          :key="todo.id"
        >
          <p>{{ index + 1 }}- {{ todo.title }}</p>
          <div class="flex items-center gap-6">
            <button @click="showEditModal(todo)" class="text-gray-400">
              <EditOutlined />
            </button>
            <button @click="confirmDelete(todo.id)" class="text-red-500">
              <DeleteOutlined />
            </button>
          </div>
        </div>
      </a-card>
    </div>
    <div class="mt-4" id="components-modal-demo-position">
      <a-button class="sm:w-[150px]" type="primary" @click="showModal">
        {{ $t('AddTodo') }}
      </a-button>
      <a-modal
        class="modal-centered dark:!bg-zinc-800"
        v-model:open="modal1Visible"
        :title="$t('AddTodo')"
        centered
        @ok="addTodoHandler"
        :ok-text="$t('yes')"
        :cancel-text="$t('no')"
      >
        <div class="flex flex-col items-center">
          <a-input
            ref="todoInput"
            v-model:value="todoVal"
            @keyup.enter="addTodoHandler"
            :placeholder="$t('title')"
            class="my-4 w-full md:w-[200px]"
          />
        </div>
      </a-modal>
      <a-modal
        class="modal-centered"
        v-model:open="modal2Visible"
        :title="$t('editTodo')"
        centered
        @ok="editTodoHandler"
        :ok-text="$t('yes')"
        :cancel-text="$t('no')"
      >
        <div class="flex flex-col items-center">
          <a-input
            ref="editTodoInput"
            v-model:value="editTodoVal"
            @keyup.enter="editTodoHandler"
            :placeholder="$t('title')"
            class="my-4"
            style="width: calc(100% - 200px)"
          />
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { ref, onMounted, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Modal } from 'ant-design-vue'
import { getTodoLocalStorage, notify, setTodoLocalStorage } from '@/utils'
import type { todoInfo } from './type'

const { t } = useI18n()

const modal1Visible = ref(false)
const modal2Visible = ref(false)
const todoVal = ref('')
const editTodoVal = ref('')
const editTodoId = ref<string | null>(null)
const todos = ref<todoInfo[]>([])

onMounted(() => {
  const savedTodos = getTodoLocalStorage()
  if (savedTodos) {
    todos.value = savedTodos
  }
})

const showModal = () => {
  modal1Visible.value = true
}

const showEditModal = (todo: todoInfo) => {
  editTodoId.value = todo.id
  editTodoVal.value = todo.title
  modal2Visible.value = true
}

const addTodoHandler = () => {
  const title = todoVal.value.trim()
  if (title) {
    const newTodo: todoInfo = {
      id: crypto.randomUUID(),
      title
    }
    todos.value.push(newTodo)
    setTodoLocalStorage(todos.value)
    notify('success', t('successModal'), t('successAdd'))
    closeModal(modal1Visible, todoVal)
  } else {
    notify('error', t('error'), t('errorAdd'))
  }
}

const editTodoHandler = () => {
  const title = editTodoVal.value.trim()
  if (title && editTodoId.value) {
    const todo = todos.value.find((todo) => todo.id === editTodoId.value)
    if (todo) {
      todo.title = title
      setTodoLocalStorage(todos.value)
      notify('success', t('successModal'), t('successEdit'))
      closeModal(modal2Visible, editTodoVal, editTodoId)
    }
  }
}

const confirmDelete = (id: string) => {
  Modal.confirm({
    title: t('warningEditTodo'),
    content: t('textEditTodo'),
    okText: t('yes'),
    okType: 'danger',
    cancelText: t('no'),
    onOk() {
      removeHandler(id)
      notify('success', t('successModal'), t('successDeleted'))
    }
  })
}

const removeHandler = (id: string) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
  setTodoLocalStorage(todos.value)
}

const closeModal = (modal: Ref<boolean>, ...refs: Ref<string | null>[]) => {
  modal.value = false
  refs.forEach((ref) => (ref.value = ''))
}
</script>

<style scoped>
.modal-centered .ant-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
