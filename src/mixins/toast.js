export default {
    methods: {
        addToast(text, options = {}) {
            this.$store.dispatch('addToast', {text: text, options: options})
        }
    }
}