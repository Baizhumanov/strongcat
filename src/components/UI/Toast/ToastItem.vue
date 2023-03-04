<template>
  <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true" :id="item.id">
    <div class="d-flex" >
      <div class="toast-body">
        {{ item.text }}
      </div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToastItem",
  props: {
    item: {
      type: Object,
      default() {
        return {
          id: 0,
          text: "",
          options: {}
        }
      }
    }
  },
  data() {
    return {
      icon: "bi-info-lg",
    }
  },
  mounted() {
    const toastEl = document.getElementById(this.item.id)
    const toast = new bootstrap.Toast(toastEl)
    toastEl.addEventListener('hidden.bs.toast', () => {
      this.$emit('delete-toast', this.item.id)
    })

    toast.show()
  }
}
</script>

<style scoped>
.icon-container {
  border-radius: 5px;
  background-color: #3fbc60;
  width: 32px;
  height: 32px;
}
</style>