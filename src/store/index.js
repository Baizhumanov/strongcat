import { createStore } from 'vuex'

export default createStore({
  state: {
    toasts: [],
  },
  mutations: {
    addToast(state, payload) {
      state.toasts.push({text: payload.text, options: payload.options})
    },
    cleanToasts(state) {
      state.toasts = []
    }
  },
  actions: {
    addToast(context, payload) {
      context.commit('addToast', {text: payload.text, options: payload.options})
    },
    cleanToasts(context) {
      context.commit('cleanToasts')
    }
  },
  modules: {
  }
})
