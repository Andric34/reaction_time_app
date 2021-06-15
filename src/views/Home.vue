<template>
  <v-app app>
    <AppBar ></AppBar>
    <NavDrawer ></NavDrawer>
    <v-main
    app
    class="main-content"
    >
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import AppBar from '../components/app-bar'
import NavDrawer from '../components/nav-drawer'

export default {
  data () {
    return {
    }
  },
  components: {
    AppBar,
    NavDrawer
  }
}
</script>
<style lang="scss" scoped>
.main-content{
  background-color:rgb(27, 30, 36);
}

</style>
