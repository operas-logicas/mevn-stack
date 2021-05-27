<template>
  <footer id="customer-footer">
    <span class="mr-4">&copy; {{ year }} Robert Miller</span>
    <span class="mr-4">Privacy</span>
    <span>Terms of Service</span>
  </footer>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Footer',

  computed: {
    year() {
      return moment().format('YYYY')
    }
  }
}
</script>

<style scoped>
#customer-footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 6rem;
  background-color: #373f46;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;  
}
</style>
