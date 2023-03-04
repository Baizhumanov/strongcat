<template>
  <div class="container my-3">
    <div class="row my-3">
      <div class="col">
        <h1 class="text-center">Управление упражнениями</h1>
      </div>
    </div>
    <div class="row my-3">
      <div class="col">
        <button class="btn btn-success my-2" @click="showModal('add')">Добавить упражнение</button>
        <ul class="list-group">
          <li class="list-group-item" v-for="item in items" :key="item.ID">
            <div class="d-flex align-items-center justify-content-between">
              <div class="name">{{ item.name }}</div>
              <div class="d-flex align-items-center justify-content-between">
                <button class="btn btn-sm btn-warning me-md-3 me-1" @click="editExercise(item.ID)">Изменить</button>
                <button class="btn-close" @click="deleteExercise(item.ID)"></button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <Modal modal-id="modalToAddExercises" header-title="Добавление упражнения">
    <template #default>
      <form @submit.prevent>
        <div class="row gy-3">
          <div class="col">
            <label for="exerciseName" class="form-label">Название упражнения</label>
            <input type="text" class="form-control" id="exerciseName" placeholder="Введите название упражнения" v-model.trim="exerciseName">
          </div>
        </div>
      </form>
    </template>
    <template #modal-footer>
      <button class="btn btn-success" @click="saveExercise">Сохранить</button>
    </template>
  </Modal>
</template>

<script>
import toast from '@/mixins/toast'
export default {
  name: "Manage",
  mixins: [toast],
  data() {
    return {
      items: [],
      exerciseName: "",
      modal: {},
      modalType: "add",
      currentId: 0,
    }
  },
  methods: {
    showModal() {
      switch (this.modalType) {
        case 'add':
          this.exerciseName = ""
          break;
        case 'edit':
          //
          break;
      }
      this.modal = new bootstrap.Modal(document.getElementById('modalToAddExercises'), {})
      this.modal.show()
    },
    addExercise() {
      if (this.exerciseName.length <= 0) {
        this.addToast("Введите название")
        return
      }
      this.items.push({ID: this.items.length + 1, name: this.exerciseName})
      this.commitItems()
      this.modal.hide()
      this.addToast("Упражнение успешно добавлено")
    },
    editExercise(id) {
      this.modalType = "edit"
      this.currentId = id
      const element = this.items.find(el => el.ID === id)
      this.exerciseName = (element === undefined) ? "" : (element.name === undefined ? "" : element.name)
      this.showModal("edit")
    },
    updateExercise() {
      this.items.forEach(e => {
        if (e.ID === this.currentId) {
          e.name = this.exerciseName
          return
        }
      })
      this.commitItems()
      this.modal.hide()
      this.addToast("Упражнение успешно изменено")
    },
    saveExercise() {
      if (this.modalType === "add") {
        this.addExercise()
      } else {
        this.updateExercise()
      }
    },
    deleteExercise(id) {
      if (confirm("Вы действительно хотите удалить упражнение?")) {
        this.items.forEach((e, i, a) => {
          if (e.ID === id) {
            a.splice(i, 1)
            return
          }
        })
        this.commitItems()
      }
    },
    commitItems() {
      localStorage.setItem('exercises', JSON.stringify(this.items))
    },
    setItems() {
      if (localStorage.getItem('exercises') === null) {
        return
      }
      let exercises = JSON.parse(localStorage.getItem('exercises'))
      this.items = Array.isArray(exercises) ? exercises : []
    }
  },
  mounted() {
    this.setItems()
  }
}
</script>

<style scoped>

</style>