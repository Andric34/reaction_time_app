<template>
    <v-navigation-drawer
      app
      permanent
      left
      color="rgb(45, 48, 56)"
      width = "100px"
      fixed
    >
      <template>
          <v-list-item-avatar style="height:100px; width:100px" >
            <router-link :to="{path: '/'}">
            <v-icon color="white" large >mdi-av-timer</v-icon>
            </router-link>
          </v-list-item-avatar>
      </template>
      <v-list class="py-0">
        <v-list-item class="px-0"
        v-model="navItems"
          v-for="item in this.navItems"
          :key="item.title"
          two-line
        >
            <v-list-item-content class="hovering">
              <router-link :to="{path: item.url}" class="text-center" >
                <v-icon color="white font-weight-thin">{{ item.icon }}</v-icon>
                <p class="body-2 text-center white--text font-weight-thin">{{ item.title }}</p>
              </router-link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="logedIn">
            <v-list-item-content class="hovering" @click="logout">
                <v-icon color="white font-weight-thin">mdi-logout</v-icon>
                <p class="body-2 text-center white--text font-weight-thin">Logout</p>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    logout () {
      // method that resets user info in store and redirects user to home page
      this.$store.commit('logout')
      this.$router.push('/')
    }
  },
  computed: {
    navItems () {
      return this.$store.getters.getAppDrawerListItems
    },
    logedIn () {
      return this.$store.state.connectedUser.logedIN
    }
  }
}

</script>
<style lang="scss" scoped>
.v-application a {
    color: rgb(45, 48, 56);
}
.hovering:hover{
    background-color: rgb(66,69,76);
}
</style>
