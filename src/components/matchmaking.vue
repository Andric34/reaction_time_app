<template>
    <v-container class="main-wrapper ml-4 mt-3 pa-0">
      <v-row class="pa-0">
        <v-col
        v-model="UserselectedLobby"
        v-if="!UserselectedLobby"
        class="wrapper pa-0 col-3 ml-4">
          <v-list
          color="rgb(27, 30, 36)"
          class = "pa-0">
            <v-list-item
            dense
            class="hovering px-4 py-5"
            v-model="list"
            v-for="item in this.list"
            :key="item.name"
            @click="joinLobby(item)">
              <p class="white--text ">{{item.name}} ({{item.players.length}} players)</p>
              <p class="white--text ml-auto">{{item.state}}</p>

            </v-list-item>
          </v-list>
        </v-col>
        <v-col
        class="wrapper ml-4 mb-5 px-4 py-5 mr-10">
          <p class="h3 text-center white--text">{{this.LobbieName}}</p>
          <v-list
          class="player-list d-inline-flex flex-column pa-5"
          color="rgb(27, 30, 36)"
          v-if="UserselectedLobby"
          >
          <v-list-item>
            <p class="white--text text-center pb-4">Player list: </p></v-list-item>
            <v-list-item
            class="white--text"
            v-model="playerList"
            v-for="player in playerList"
            :key="player.id">
            <p
            class="white--text">
            {{player.username}}
            </p>
            <p></p>
            </v-list-item>
          </v-list>
          <p
          class="white--text text-h4 text-center ma-16"
          v-if="UserselectedLobby"
          >Game starting in: {{countdown}}</p>
            <v-btn
            v-if="UserselectedLobby"
            @click="leaveLobby"
            elevation="4"
            class="d-block mx-auto"
            >Leave lobby</v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import store from '../store'
export default {
  data () {
    return {
      UserselectedLobby: false,
      countdown: null
    }
  },
  sockets: {
    // listener for lobbies update
    lobbies_update (data) {
      if (data.startingTime !== null) {
        // method that starts countdown to the start of the game.
        this.startCountdown(data.startingTime)
      }
    },
    game_update (data) {
      if (data.state === 'IN_PROGRESS') {
        // redirects user when the game begins.
        this.$router.push('/match')
      }
    }
  },
  computed: {
    list () {
      return this.$store.state.lobbies
    },
    playerList () {
      return this.$store.getters.getPlayerList
    },
    LobbieName () {
      return this.$store.state.selectedLobbie
    }
  },
  methods: {
    joinLobby (lobbie) {
      // emiting joinLobby event to server and passing channel
      this.$store.state.socket.emit('joinLobby', lobbie.channel)
      this.UserselectedLobby = true
      // storing name of the lobbie name in vuex store
      this.$store.commit('setLobbie', lobbie.name)
    },
    leaveLobby () {
      // getting current lobbie
      const lobbie = this.$store.getters.getCurrentLobbie
      // emiting leaveLobby event
      this.$store.state.socket.emit('leaveLobby', lobbie[0].channel)
      this.UserselectedLobby = false
      // reseting current lobby in store
      this.$store.commit('unsetLobbie')
    },
    startCountdown (startingTime) {
      // method that displays the countdown till the game starts every second
      const timer = setInterval(() => {
        const current = new Date().getTime()
        const starting = new Date(startingTime).getTime()
        const seconds = parseInt((starting - current) / 1000)
        this.countdown = seconds
        if (seconds <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    }
  },
  beforeRouteEnter (to, from, next) {
    // navigation guard that checks if the user is logged in and if he isn't redirects him to login.
    if (store.state.connectedUser.token !== '') {
      next()
    } else {
      next('/Login')
    }
  }
}

</script>

<style lang="scss" scoped>
.main-wrapper{
  margin-right: 100px;
  max-width: 100%;
  .wrapper{
        border: 1px solid rgb(102,104,108);
        border-radius: 10px;
        height: calc(100vh - 120px);
        overflow: hidden;
    }
}
.hovering:hover{
    background-color: rgb(66,69,76);
}
.player-list{
  border: 1px solid rgb(102,104,108) !important;
  border-radius: 3px;
}
</style>
