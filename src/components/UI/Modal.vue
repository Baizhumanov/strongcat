<template>
  <div class="modal fade" tabindex="-1" :id="modalId">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header" v-if="headerEnabled">
          <h5 class="modal-title">{{ headerTitle }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="modal-footer"></slot>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" v-if="closeButtonEnabled">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    headerEnabled: {
      type: Boolean,
      default: true
    },
    headerTitle: {
      type: String,
      default: ""
    },
    closeButtonEnabled: {
      type: Boolean,
      default: true
    },
    modalId: String,
  },
}
</script>

<style scoped>

</style>