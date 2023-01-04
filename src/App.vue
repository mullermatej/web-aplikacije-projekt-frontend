<template>
  <v-app>
    <v-content>
      <router-view />
      <v-app-bar app color="primary" dark>
        <v-toolbar-title> Balance: 0,00 </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text rounded>Home</v-btn>
        <v-btn text rounded>Login</v-btn>
        <v-btn text rounded>Register</v-btn>
        <v-btn text rounded>My Profile</v-btn>
        <v-btn text rounded>Map</v-btn>
      </v-app-bar>
    </v-content>

    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Walk it</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
