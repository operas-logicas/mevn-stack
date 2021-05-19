<template>
  <div id="app">
    <Navbar />

    <div id="app-container">
      <router-view />
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
div#app-container {
  width: 100%;
  position: fixed;
  top: 96px;
  bottom: 96px;
  left: 0;
  padding: 2rem;
  background-color: #1d2733;
  overflow: auto;
}  
</style>
