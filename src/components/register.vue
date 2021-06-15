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
          cols="4"
          offset=4
          md="4"
        >
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            placeholder="E-mail"
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
          offset=4
          md="4"
        >
          <v-text-field
            v-model="user.password"
            :rules="passwordRules"
            placeholder="Password"
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
          offset=4
          md="4"
        >
          <v-text-field
            v-model="user.username"
            :rules="usernameRules"
            placeholder="Username"
            required
            clearable
            background-color="white"
            rounded
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
          <v-col
          cols="2"
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
export default {
  data: () => ({
    valid: false,
    user: {
      email: '',
      username: '',
      password: ''
    },
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    usernameRules: [
      v => !!v || 'Username is required',
      v => v.length >= 3 || 'Name must be more than 3 characters',
      v => v.length <= 16 || 'Name must be less than 16 characters'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 8 || 'Name must be more than 8 characters',
      v => /\d/.test(v) || 'Password must have a number',
      v => /[A-Z]/.test(v) || 'Password must have a Uppercase letter',
      v => /[!@#$%^&*)(+=._-]/.test(v) || 'Password must have a special symbol'
    ]
  }),
  methods: {
    submit (e) {
      // setting request options
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.user)
      }
      // submiting register data using fetch
      fetch('https://zadatak-iandric.provjeri.ga/auth/register', requestOptions)
        .then(async response => {
          const data = await response.json()

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status
            return Promise.reject(error)
          }
        })
        .catch(error => {
          this.errorMessage = error
          console.error('There was an error!', error)
        })
      e.preventDefault()
      // after registration redirecting user to login page
      this.$router.push('/Login')
    }
  }
}
</script>
