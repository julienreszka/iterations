<template>
  <v-app id="inspire">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
#inspire {
  background-color:	#F5F5F5;  
}
</style>
