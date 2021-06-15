<template>
    <v-container class="main-wrapper ml-4 mt-3 pa-0">
      <v-row>
        <v-col class="wrapper ml-4 mb-5 px-6 py-4 cols-auto">
          <v-list
          color="rgb(27, 30, 36)"
          class = "pa-0">
            <v-list-item
            class="hovering pa-0 d-flex  justify-space-between">
              <p class="white--text">#</p>
              <p class="white--text">Player name</p>
              <p class="white--text">Reaction Time</p>
              <p class="white--text">Match UUID</p>
            </v-list-item>
            <v-list-item
            v-for="item in leaderboardList"
            :key="item.id"
            class="hovering pa-0 d-flex  justify-space-between">
              <p class="white--text">{{item.id}}</p>
              <p class="white--text">{{item.playerName}}</p>
              <p class="white--text">{{item.reactionTime}}</p>
              <p class="white--text">{{item.matchUIDD}}</p>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import store from '../store'
export default {
  data () {
    return {
      leaderboardList: []
    }
  },
  methods: {
    setLeaderboardList (data) {
      // called in the fetch request to set the leaderboard list
      // initializing the list
      const leaderboardList = []
      // for block used to cycle through data from the server
      for (let i = 0; i < data.count; i++) {
        // setting list item
        const leaderboardListItem = {
          id: i + 1,
          playerName: data.rows[i].user.username,
          reactionTime: data.rows[i].reactionTime,
          matchUIDD: data.rows[i].round.uuid
        }
        leaderboardList.push(leaderboardListItem)
      }
      this.leaderboardList = leaderboardList
    }
  },
  created () {
    // Making a fetch request to get leaderboard data from the server
    const requestOptions = {
      method: 'GET',
      headers: {
        // eslint-disable-next-line quote-props
        'Authorization': '< ' + this.$store.getters.getUserToken + ' >',
        'Content-Type': 'application/json'
      }
    }
    // calling the fetch function
    fetch('https://zadatak-iandric.provjeri.ga/ranking/top', requestOptions)
      .then(async response => {
        const data = await response.json()
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status
          return Promise.reject(error)
        }
        console.log(data)
        // calling the set leaderboard list and passing the response data
        this.setLeaderboardList(data)
      })
      .catch(error => {
        this.errorMessage = error
        console.error('There was an error!', error)
      })
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
  max-width: calc(100% - 116px);
  .wrapper{
        border: 1px solid rgb(102,104,108);
        border-radius: 10px;
        height: calc(100vh - 120px);
        header{
          color: white;
        }
    }
}
.hovering:hover{
    background-color: rgb(66,69,76);
}
</style>
