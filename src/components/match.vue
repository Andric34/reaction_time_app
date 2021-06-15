<template>
    <div class="wrapper ml-4 mb-5 pa-4">
        <v-list
        width="200px"
        style="border-radius: 10px"
        color="rgb(27, 30, 36)"
        class = "px-4 player-list d-inline-flex flex-column">
            <v-list-item
            class="white--text"
            v-model="RankingList"
            v-for="player in RankingList"
            :key="player.id">
            <p
            class="white--text">
            {{player.user.username}}
            </p>
            <p
            class="white--text ml-auto">
            {{player.reactionTime}}</p>
            </v-list-item>
        </v-list>
        <p
        v-if="clicked"
        class="white--text d-flex justify-end mr-8">Your time: {{reactionTime}}</p>
        <v-btn
            @click="stopTimer"
            style="border-radius: 100vh"
            v-bind:class="colorClass"
            class="d-block mx-auto mt-16"
            height="200px"
            width="200px">{{buttonText}}</v-btn>
    </div>
</template>

<script>
export default {
  data () {
    return {
      colorClass: 'red lighten-1',
      buttonText: 'Wait',
      timer: null,
      reactionTime: 0,
      RankingList: [],
      clicked: false
    }
  },
  methods: {
    startGame () {
      // method that changes text and color of the button and starts timer
      this.colorClass = 'green lighten-1'
      this.buttonText = 'GO'
      this.startTimer()
    },
    startTimer () {
      // method that increases 10 miliseconds to reaction time. It's called every 10 miliseconds
      this.timer = setInterval(() => {
        this.reactionTime += 10
      }, 10)
    },
    stopTimer () {
      // called after user clicks on the button
      // clearing interval
      clearInterval(this.timer)
      // changing color,text and seting clicked to true
      this.colorClass = 'grey lighten-1'
      this.buttonText = 'CLICKED'
      this.clicked = true
      // calling finish round
      this.finishRound()
    },
    finishRound () {
      const lobbie = this.$store.getters.getCurrentLobbie
      this.$store.state.socket.emit('leaveLobby', lobbie[0].channel)
      // geting game and round UUID from the store
      const gameUUID = this.$store.getters.getCurrentLobbie[0].game.uuid
      const roundUUID = this.$store.getters.getCurrentRound
      // constructing data object that is emited to the server
      const data = [roundUUID, gameUUID, this.reactionTime]
      // emiting updateRoundResult and passing data object
      this.$store.state.socket.emit('updateRoundResult', data)
    },
    setRankingList () {
      // method used to set ranking list
      const rankingList = this.$store.getters.getRankingList
      // displaying "waiting" instead of null in the list
      for (let i = 0; i < rankingList.length; i++) {
        if (rankingList[i].reactionTime === null) {
          rankingList[i].reactionTime = 'waiting'
        }
      }
      // setting the list
      this.RankingList = rankingList
    }
  },
  created () {
    this.setRankingList()
    // checking if the current time in miliseconds is less than game starting time.
    const startingTime = this.$store.getters.getCurrentLobbie[0].game.triggerDate
    const currentTime = new Date().getTime()
    // if blok that starts the game
    if ((new Date(startingTime).getTime() - currentTime) <= 0) {
      this.startGame()
    }
  }
}
</script>

<style lang="scss" scoped>
    .wrapper{
        border: 1px solid rgb(102,104,108);
        margin-right: 100px;
        border-radius: 10px;
        height: calc(100vh - 120px);
    }
.player-list{
  border: 1px solid rgb(102,104,108) !important;
  border-radius: 3px;
}
</style>
