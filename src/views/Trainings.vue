<template>
  <div class="container my-3">
    <div class="row my-3">
      <div class="col">
        <h1 class="text-center">Журнал тренировок</h1>
      </div>
    </div>
    <div class="row my-3">
      <div class="col">
        <button class="btn btn-success my-2" @click="addTraining">Добавить тренировку</button>
        <ul class="list-group">
          <li class="list-group-item" v-for="training in trainings" :key="training.ID">
            <div class="d-flex align-items-center justify-content-between my-2">
              <div>{{ training.ID }}. {{ getDate(training.date) }}</div>
              <div class="d-flex align-items-center justify-content-between">
                <button class="btn btn-sm btn-primary me-md-3 me-1" @click="editTraining(training.ID)">Перейти</button>
                <button class="btn-close" @click="deleteTraining(training.ID)"></button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import getDate from "@/utils/convertDate"

export default {
  name: "Trainings",
  data() {
    return {
      initTrainings: []
    }
  },
  computed: {
    trainings() {
      let array = [];
      this.initTrainings.forEach(e => {
        if (e.ID !== undefined && e.date !== undefined) {
          array.push(e)
        }
      })
      return array
    }
  },
  methods: {
    addTraining() {
      let trainings = this.getTrainings()
      let id = trainings.length + 1
      trainings.push({ID: id, date: Date.now()})
      this.commitTrainings(trainings)
      router.push({name: 'Training', params: {id: id}})
    },
    getTrainings() {
      if (localStorage.getItem('trainings') === null) {
        this.commitTrainings([])
      }
      return JSON.parse(localStorage.getItem('trainings'))
    },
    commitTrainings(trainings) {
      localStorage.setItem('trainings', JSON.stringify(trainings))
      this.initTrainings = this.getTrainings()
    },
    getDate(timestamp) {
      return getDate(timestamp)
    },
    editTraining(id) {
      router.push({name: 'Training', params: {id: id}})
    },
    deleteTraining(id) {
      if (confirm("Вы действительно хотите удалить тренировку?")) {
        let trainings = this.getTrainings()
        trainings.forEach((e, i, a) => {
          if (e.ID === id) {
            a.splice(i, 1)
            return
          }
        })
        this.commitTrainings(trainings)
      }
    },
  },
  mounted() {
    this.initTrainings = this.getTrainings()
  }
}
</script>

<style scoped>

</style>