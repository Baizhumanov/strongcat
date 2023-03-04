<template>
  <header class="d-flex justify-content-center p-3">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/" class="nav-link">Главная страница</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/trainings" class="nav-link">Тренировки</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/manage" class="nav-link">Упражнения</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.nav-item .router-link-active {
    color: var(--bs-nav-pills-link-active-color);
    background-color: var(--bs-nav-pills-link-active-bg);
}
</style>