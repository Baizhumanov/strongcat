<template>
  <div class="container my-5">
    <div class="row">
      <div class="col">
        <h1 class="text-center">Демо-приложение для ведения журнала тренировок</h1>
      </div>
    </div>
    <div class="row my-5">
      <div class="d-flex align-items-center justify-content-center">
        <button class="btn btn-success mx-4" @click="router('Trainings')">Перейти к тренировкам</button>
        <button class="btn btn-outline-success mx-4" @click="router('Manage')">База упражнений</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'Home',
  methods: {
    router(name) {
      return router.push({name: name})
    }
  }
}
</script>
