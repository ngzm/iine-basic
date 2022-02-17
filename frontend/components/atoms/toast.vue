<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ToastComponent',
  methods: {
    makeToast(title: string = '', message: string = 'message', variant: string = 'default') {
      this.$bvToast.toast(message, {
        title,
        variant,
        solid: true,
        appendToast: false
      })
    }
  }
})
</script>
