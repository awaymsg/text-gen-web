<template>
  <div class="textgen">
    <h1>{{ msg }}</h1>
    <p>
      Simple Text Generator<br>
    </p>
    <button @click="generate"> Generate </button>
    <p>
      {{sentence}}
    </p>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'TextGen',
  data () {
    return {
    sentence: ""
  }},
  props: {
    msg: String
  },
  created: function() {
    axios.get('localhost:3000')
    .then(function (response) {
      // handle success
      alert(response);
    })
    .catch(function (error) {
      // handle error
      alert(error);
    })
    .finally(function () {
      // always executed
    });
  },
  methods: {
    generate: function() {
      this.sentence = sentence
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
