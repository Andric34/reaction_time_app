<template>
    <v-form
    ref="form"
    v-model="valid"
    @submit="submit"
    method="post"
    >
    <v-container>
      <v-row>
          <v-col
          cols=6
          offset=3
          md="4"
        >
          <v-text-field
            v-model="user.email"
            placeholder="E-mail"
            :rules="emailRules"
            required
            clearable
            background-color="white"
            rounded
          ></v-text-field>
          </v-col>
          </v-row>
          <v-row>
        <v-col
          cols=6
          offset=3
          md="4"
        >
          <v-text-field
            v-model="user.password"
            placeholder="Password"
            :rules="passwordRules"
            required
            clearable
            background-color="white"
            rounded
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
          <v-col
          cols="4"
          offset="5"
          >
              <v-btn
        class="mr-4"
        type="submit"
        :disabled="!valid"
      >
        submit
      </v-btn>
          </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import Vue from 'vue'
import store from '../store'
export default {
  data: () => ({
    valid: false,
    user: {
      email: '',
      password: ''
    },
    emailRules: [
      v => !!v || 'E-mail is required'
    ],
    passwordRules: [
      v => !!v || 'Password is required'
    ]
  }),
  methods: {
    submit (e) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.user)
      }
      fetch('https://zadatak-iandric.provjeri.ga/auth/login', requestOptions)
        .then(async response => {
          const data = await response.json()
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status
            return Promise.reject(error)
          }
          // calling logInUser method and passing data
          this.logInUser(data)
        })
        .catch(error => {
          this.errorMessage = error
          console.error('There was an error!', error)
        })
      e.preventDefault()
    },
    logInUser (data) {
      // making user object
      const user = {
        username: data.user.username,
        email: data.user.email,
        token: data.token
      }
      // storing user object in vuex store
      this.$store.commit('login', user)
      // connecting socket to server
      this.openSocket(data.token)
      // redirecting user to matchmaking
      this.$router.push('/Matchmaking')
    },
    openSocket (token) {
      // initializing socket with token for auth
      const socket = io('https://zadatak-iandric.provjeri.ga', {
        query: {
          token: token
        }
      })
      // using vue-socket.io-extended to open connection.
      // Store is passed as third argument so that event listeners can be stored in vuex store.
      Vue.use(VueSocketIOExt, socket, { store })
      // storing the socket instance so it can be used from other components.
      this.$store.commit('setSocket', socket)
    }
  }
}
</script>

<style lang="scss" scoped>
v-text-field {
    color:white;
    font-size: 1rem;
}
</style>
