<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div v-for="item in items" :key="item.id">
      <toast-item :item="item" @delete-toast="deleteToast"></toast-item>
    </div>
  </div>
</template>

<script>
import ToastItem from "@/components/UI/Toast/ToastItem.vue";

export default {
  name: "Toast",
  components: {ToastItem},
  props: {
    initialToasts: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      items: [],
    }
  },
  computed: {
    toastsCount() {
      return this.toasts !== undefined ? this.toasts.length : 0
    },
    toasts() {
      let array = this.initialToasts
      return array
    }
  },
  methods: {
    handleToasts() {
      if (this.toasts.length === 0) {
        return
      }

      // Стэк (массив) для вывода уведомления, которые НЕ зависимы от Vuex
      for (let i = 0; i < this.toasts.length; i++) {
        this.items.push({
          id: this.items.length + 1,
          text: this.toasts[i].text,
          options: this.toasts[i].options
        })
      }

      // Очищаем Vuex (при этом уведомления (this.items) не исчезнут)
      this.$store.dispatch('cleanToasts')
    },
    deleteToast(id) {
      this.items.forEach((item, index, array) => {
        if (item.id === id) {
          array.splice(index, 1)
          return
        }
      })
    }
  },
  watch: {
    toastsCount() {
      this.handleToasts()
    }
  }
}
</script>

<style scoped>

</style>