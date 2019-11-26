<template>
  <div id="app">
    <div class = "links">
      <router-link to="/astar.html"> A* Pather </router-link>
      <router-link to="/"> Text Gen </router-link>
    </div>
    <img alt="lain" class="resizable" src="./assets/lain.gif">
    <TextGen msg="Text Generator"/>
  </div>
</template>

<script>
const axios = require('axios')
import TextGen from './components/TextGen.vue'

export default {
  name: 'app',
  components: {
    TextGen
  },
  methods: {
    astar: function() {
      axios.get('/astar')
    },
    textgen: function() {
      axios.get('/')
    }
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
  margin-top: 40px;
}
img.resizable {
  max-width: 100%;
}
div.links {
  max-width: 100%;
}
</style>
