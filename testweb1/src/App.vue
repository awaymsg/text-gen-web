<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <TextGen msg="Simple Text Generator"/>
  </div>
</template>

<script>
import TextGen from './components/TextGen.vue'

export default {
  name: 'app',
  components: {
    TextGen
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
