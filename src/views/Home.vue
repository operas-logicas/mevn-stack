<template>
  <div id="custom-home">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },

  beforeCreate: async function() {
    try {
      const res = await fetch(this.$store.state.apiUrl + '/api/users')
      console.log(res)
    } catch(err) {
      console.log(err)
    }
  }
}
</script>

<style>
div#custom-home {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}  
</style>
