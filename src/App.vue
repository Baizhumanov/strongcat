<template>
  <Header v-if="view !== 'Home'"></Header>
  <router-view/>
  <Toast :initial-toasts="$store.state.toasts" />
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {Header},
  computed: {
    view() {
      return this.$route.name
    }
  }
}
</script>

<style>
</style>
