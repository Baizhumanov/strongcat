<template>
  <div class="card text-start">
    <div class="card-header d-flex">
      <span>{{ title }}</span> &nbsp;
      <div class="actions" @click="$emit('action-click')"><i class="bi bi-three-dots-vertical"></i></div>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <slot></slot>
      <slot name="card-footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
}
</script>

<style scoped>
.card-header {
  background: none;
  border-bottom: none;
}
</style>