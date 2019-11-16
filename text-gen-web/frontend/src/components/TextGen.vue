<template>
  <div class="textgen">
    <h1>{{ msg }}</h1>
    <p>
      <select name="gentype" @change="onChange($event)" class="form-control" v-model="selected">
        <option value="lotr">Lord of the Rings</option>
        <option value="got">Game of Thrones</option>
      </select>
      <br>
    </p>
    <button @click="generate"> Generate </button>
    <p>
      {{sentence}}
    </p>
    <button @click.prevent="read"> Read </button>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  name: 'TextGen',
  data () {
    return {
      sentence: "",
      selected: "lotr"
    }},
  props: {
    msg: String
  },
  created: function() {
    
  },
  methods: {
    generate: function() {
      axios.get('/gen-sentence')
      .then((response) => {
        // handle success
        this.sentence = response.data
      })
      .catch((error) => {
        // handle error
        alert(error)
      })
      .finally(() => {
        // always executed
      });
    },
    onChange(event) {
      if (event.target.value === "lotr") {
        axios.post('/change-file', {data: "lotr"})
      }
      if (event.target.value === "got") {
        axios.post('/change-file', {data: "got"})
      }
    },
    read() {
      if (this.sentence === "") return
      axios.post('/read-sentence', {data: this.sentence})
      .then((response) => {
        if (response.data) {
          let audio = new Audio('text.mp3')
          audio.play()
          audio = null
        }
      })
      .catch((error) => {
        // handle error
        alert(error)
      })
      .finally(() => {
        // always executed
      });
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
  margin: 0 50px;
}
a {
  color: #0f0f0f;
}
</style>
