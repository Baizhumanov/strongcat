<template>
  <div class="container my-3">
    <div class="row my-3">
      <div class="col">
        <h1 class="text-center">Тренировка #{{ $route.params.id }}</h1>
      </div>
    </div>
    <div class="row my-3">
      <div class="col">
        <button class="btn btn-success my-2" @click="showAddExerciseModal">Добавить упражнение</button>
        <div v-for="exercise in exercises" :key="exercise.ID" class="my-4">
          <div class="d-flex align-items-center justify-content-between my-2">
            <div>{{ exercise.name || "" }}</div>
            <div class="d-flex align-items-center justify-content-between">
              <button class="btn btn-sm btn-primary me-md-3 me-1" @click="showAddSetModal(exercise.ID)">Добавить подход</button>
              <button class="btn-close" @click="deleteExercise(exercise.ID)"></button>
            </div>
          </div>
          <ul class="list-group">
            <li class="list-group-item" v-for="set in exercise.sets">
              <div class="d-flex align-items-center justify-content-between my-2">
                <div>{{ set.reps || 0 }} &#215; {{ set.weight || 0 }} {{ set.type || "kg" }}</div>
                <div class="d-flex align-items-center justify-content-between">
                  <button class="btn-close" @click="deleteSet(set.ID, exercise.ID)"></button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <Modal modal-id="modalToAddExercise" header-title="Добавление упражнения">
    <template #default>
      <form @submit.prevent>
        <div class="row gy-3">
          <div class="col">
            <label for="exercise" class="form-label">Упражнения</label>
            <select type="text" class="form-control" id="exercise" v-model="exerciseName">
              <option value="" selected>Не выбрано</option>
              <option v-for="item in initExercises" :key="item.ID" :value="item.name">{{item.name}}</option>
            </select>
          </div>
        </div>
      </form>
    </template>
    <template #modal-footer>
      <button class="btn btn-success" @click="addExercise">Сохранить</button>
    </template>
  </Modal>

  <Modal modal-id="modalToAddSet" header-title="Добавление подхода">
    <template #default>
      <form @submit.prevent>
        <div class="row gy-3">
          <div class="col">
            <label for="exercise" class="form-label">Количество</label>
            <input type="number" id="exercise" v-model="reps">
          </div>
          <div class="col">
            <label for="exercise" class="form-label">Вес</label>
            <input type="number" id="exercise" v-model="weight">
          </div>
          <div class="col">
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" class="btn-check" id="kg" value="kg" checked v-model="type">
              <label class="btn btn-outline-primary" for="kg">kg</label>

              <input type="radio" class="btn-check" id="lbs" value="lbs" v-model="type">
              <label class="btn btn-outline-primary" for="lbs">lbs</label>
            </div>
          </div>
        </div>
      </form>
    </template>
    <template #modal-footer>
      <button class="btn btn-success" @click="addSet">Сохранить</button>
    </template>
  </Modal>
</template>

<script>
import router from "@/router";
import toast from '@/mixins/toast'
import getMaxIdFromArray from "@/utils/getMaxIdFromArray";

/*
  * Как выглядит объект exercise
  * {
  *   ID: 2,
  *   date: 1561516,
  *   exercises: [
  *     {
  *       name: "Test",
  *       sets: [
  *         {
  *           reps: 10,
  *           weight: 50,
  *           type: "kg",
  *           ID: 4
  *         }
  *       ]
  *     }
  *   ],
  * }
  * */

export default {
  name: "Training",
  mixins: [toast],
  data() {
    return {
      exercises: [],
      initExercises: [],
      exerciseName: "",
      modal: {},
      reps: 0,
      weight: 0,
      type: "kg",
      currentExerciseId: 0,
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },

  created() {
    this.setData()
    this.setInitExercises()
  },
  methods: {
    setData() {
      if (localStorage.getItem('trainings') === null) {
        return
      }
      let trainings = JSON.parse(localStorage.getItem('trainings'))
      let exercises = []
      let isExist = false
      trainings.forEach(e => {
        if (e.ID == this.id) {
          exercises = e.exercises !== undefined ? e.exercises : []
          isExist = true
        }
      })

      // Доступ к несуществвующей тренировке (к примеру, ID 1235842)
      if (!isExist) {
        router.push({name: 'Trainings'})
      }

      if (exercises.length !== 0) {
        // Обязательная проверка exercises.sets (по умолчанию ставить [])
        exercises.forEach(e => {
          if (Object.keys(e).includes('sets')) {
            if (!Array.isArray(e.sets)) {
              e.sets = []
            }
          }
        })
        this.commitData(exercises)
      }
      this.exercises = exercises
    },
    commitData(exercises) {
      let trainings = JSON.parse(localStorage.getItem('trainings'))
      let array = []
      trainings.forEach(e => {
        if (e.ID == this.id) {
          e.exercises = exercises
        }
        array.push(e)
      })
      localStorage.setItem('trainings', JSON.stringify(array))
    },
    addSet() {
      this.reps = this.reps < 0 ? 0 : this.reps
      this.weight = this.weight < 0 ? 0 : this.weight
      this.exercises.forEach(e => {
        if (e.ID == this.currentExerciseId) {
          let id = getMaxIdFromArray(e.sets, "ID")
          e.sets.push({reps: this.reps, weight: this.weight, type: this.type, ID: id + 1})
        }
      })
      this.commitData(this.exercises)
      this.modal.hide()
      this.addToast("Добавлено")
    },
    deleteSet(id, exerciseID) {
      this.exercises.forEach((e, i, a) => {
        if (e.ID == exerciseID) {
          e.sets.forEach((set, index, sets) => {
            if (id == set.ID) {
              // console.log(index)
              // console.log(sets)
              sets.splice(index, 1)
            }
          })
        }
      })
      this.commitData(this.exercises)
    },
    addExercise() {
      if (this.exerciseName.trim() === "") {
        this.addToast("Выберите упражнение")
        return
      }
      this.exercises.push({name: this.exerciseName.trim(), sets: [], ID: this.exercises.length + 1})
      this.commitData(this.exercises)
      this.exerciseName = ""
      this.modal.hide()
      this.addToast("Добавлено")
    },
    deleteExercise(id) {
      this.exercises.forEach((e, i, a) => {
        if (e.ID == id) {
          a.splice(i, 1)
        }
      })
      this.commitData(this.exercises)
    },
    setInitExercises() {
      if (localStorage.getItem('exercises') === null) {
        return
      }
      let exercises = JSON.parse(localStorage.getItem('exercises'))
      this.initExercises = Array.isArray(exercises) ? exercises : []
    },
    showAddExerciseModal() {
      this.modal = new bootstrap.Modal(document.getElementById('modalToAddExercise'), {})
      this.modal.show()
    },
    showAddSetModal(id) {
      this.modal = new bootstrap.Modal(document.getElementById('modalToAddSet'), {})
      this.modal.show()
      this.currentExerciseId = id
    }
  },
}
</script>

<style scoped>

</style>