import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // navigation list used in the drawer on the left of the app
    appDrawerListItems: [
      { title: 'Matchmaking', icon: 'mdi-play', url: '/matchmaking' },
      { title: 'Leaderboard', icon: 'mdi-poll', url: '/leaderboard' },
      { title: 'Login', icon: 'mdi-login', url: '/login' },
      { title: 'Register', icon: 'mdi-account-plus', url: '/register' }
    ],
    // used for storing connected user info
    connectedUser: {
      username: '',
      email: '',
      token: '',
      logedIN: false
    },
    lobbies: [],
    socket: null,
    leaderboardList: [],
    selectedLobbie: ''
  },
  mutations: {
    // seting user info
    login (state, user) {
      state.connectedUser = {
        username: user.username,
        email: user.email,
        token: user.token,
        logedIN: true
      }
    },
    // reseting user info
    logout (state) {
      state.connectedUser = {
        username: '',
        email: '',
        token: '',
        logedIN: false
      }
    },
    setSocket (state, socket) {
      state.socket = socket
    },
    setLobbie (state, name) {
      state.selectedLobbie = name
    },
    unsetLobbie (state) {
      state.selectedLobbie = ''
    },
    setLeaderboardList (state, data) {
      state.leaderboardList = data
    },
    // global socket listeners (powered by using vue-socket.io-extended)
    SOCKET_LOBBIES (state, data) {
      state.lobbies = data
    },
    SOCKET_LOBBIES_UPDATE (state, data) {
      state.lobbies = data
    },
    SOCKET_GAME_UPDATE (state, data) {
      state.lobbies.game = data
    },
    SOCKET_GAME_FINISHED () {
      this.$router.push('/matchmaking')
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getAppDrawerListItems (state) {
      // filtering login and register from the navigation array on the condition that the user is logged in
      if (state.connectedUser.logedIN) {
        return state.appDrawerListItems.filter((e) => {
          if (e.title !== 'Login' && e.title !== 'Register') {
            return e
          }
        })
      } else {
        return state.appDrawerListItems
      }
    },
    getUserToken (state) {
      return state.connectedUser.token
    },
    getLeaderboardList (state) {
      return state.leaderboardList
    },
    getCurrentLobbie (state) {
      // returns an array that has only the selected lobby
      return state.lobbies.filter((e) => {
        if (e.name === state.selectedLobbie) {
          return e
        }
      })
    },
    getPlayerList (state) {
      // gets an array that has only the selected lobby
      const lobbie = state.lobbies.filter((e) => {
        if (e.name === state.selectedLobbie) {
          return e
        }
      })
      // checking if the array is empty. This ensures that the user has entered to a lobby
      if (lobbie.length !== 0) {
        // returning players list
        return lobbie[0].players
      }
      // if the array is empty getter returns empty array
      return []
    },
    getStartingTime (state) {
      // gets an array that has only the selected lobby
      const lobbie = state.lobbies.filter((e) => {
        if (e.name === state.selectedLobbie) {
          return e
        }
      })
      // returns game starting time
      return lobbie.startingTime
    },
    getLobbyState (state) {
      // gets an array that has only the selected lobby
      const lobbie = state.lobbies.filter((e) => {
        if (e.name === state.selectedLobbie) {
          return e
        }
      })
      // returns state of the selected lobby.It can be "waiting","starting", and "in progress"
      return lobbie.state
    },
    getCurrentRound (state) {
      // gets an array that has only the selected lobby
      const lobbie = state.lobbies.filter((e) => {
        if (e.name === state.selectedLobbie) {
          return e
        }
      })
      // returning the current round
      const roundNumber = lobbie[0].game.currentRoundNumber - 1
      return lobbie[0].game.rounds[roundNumber].uuid
    },
    getRankingList (state) {
      // gets an array that has only the selected lobby
      const lobbie = state.lobbies.filter((e) => {
        if (e.name === state.selectedLobbie) {
          return e
        }
      })
      // returning rankings list
      const roundNumber = lobbie[0].game.currentRoundNumber - 1
      return lobbie[0].game.rounds[roundNumber].rankings
    }
  }
})
