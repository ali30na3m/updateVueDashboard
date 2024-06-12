<template>
  <div class="child:flex child:items-center child:justify-center">
    <div>
      <a-card
        class="w-[80%] h-[60vh] overflow-y-auto dark:bg-zinc-800 dark:child:!text-white text-center"
        :title="$t('todoList')"
      >
        <div
          class="flex items-center w-full justify-between border-2 my-2 border-black/10 p-4 rounded-xl child:text-sm md:child:text-2xl"
          v-for="(todo, index) in todos"
          :key="todo.id"
        >
          <p>{{ index + 1 }}- {{ todo.title }}</p>
          <div class="flex items-center gap-6">
            <button class="!text-gray-400" @click="showEditModal(todo)">
              <EditOutlined />
            </button>
            <button class="!text-red-500" @click="confirmDelete(todo.id)">
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
      <Modal
        class="modal-centered dark:!bg-zinc-800"
        v-model:open="addTodoModal"
        centered
        :title="$t('AddTodo')"
        :ok-text="$t('yes')"
        :cancel-text="$t('no')"
        @ok="addTodoHandler"
      >
        <div class="flex flex-col items-center">
          <Input
            class="my-4 w-full md:w-[200px]"
            v-model:value="todoVal"
            :placeholder="$t('title')"
            @keyup.enter="addTodoHandler"
          />
        </div>
      </Modal>
      <Modal
        class="modal-centered"
        v-model:open="editTodoModal"
        centered
        :title="$t('editTodo')"
        :ok-text="$t('yes')"
        :cancel-text="$t('no')"
        @ok="editTodoHandler"
      >
        <div class="flex flex-col items-center">
          <Input
            v-model:value="editTodoVal"
            :placeholder="$t('title')"
            class="my-4 w-[calc(100% - 200px)]"
            @keyup.enter="editTodoHandler"
          />
        </div>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { Input, Modal } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'
import { getTodoLocalStorage, notify, setTodoLocalStorage } from '@/utils'
import type { Ref } from 'vue'
import type { todoInfo } from './type'

const { t } = useI18n()

const addTodoModal = ref(false)
const editTodoModal = ref(false)
const todoVal = ref('')
const editTodoVal = ref('')
const editTodoId = ref<string | null>(null)
const todos = ref<todoInfo[]>([])

const showModal = () => {
  addTodoModal.value = true
}
const showEditModal = (todo: todoInfo) => {
  editTodoId.value = todo.id
  editTodoVal.value = todo.title
  editTodoModal.value = true
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
    closeModal(addTodoModal, todoVal)
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
      closeModal(editTodoModal, editTodoVal, editTodoId)
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
onMounted(() => {
  const savedTodos = getTodoLocalStorage()
  if (savedTodos) {
    todos.value = savedTodos
  }
})
</script>

<style scoped>
.modal-centered .ant-modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
