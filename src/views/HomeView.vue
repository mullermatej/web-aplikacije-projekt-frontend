<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/WalkItLogo1.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome back</h1>

        <p class="subheading font-weight-regular">
          Start walking
          <br />
          <v-btn
            class="ma-2"
            :loading="loading"
            :disabled="loading"
            color="primary"
            @click="loader = 'loading'"
          >
            Show me routes
          </v-btn>
        </p>
      </v-col>
    </v-row>
    <!-- <div class="text-center">
      <v-btn
        class="ma-2"
        :loading="loading"
        :disabled="loading"
        color="primary"
        @click="loader = 'loading'"
      >
        Login
      </v-btn>

      <v-btn
        class="ma-2"
        :loading="loading2"
        :disabled="loading2"
        color="success"
        @click="loader = 'loading2'"
      >
        REGISTER
        <template v-slot:loader>
          <span>Loading...</span>
        </template>
      </v-btn>
    </div> -->
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com",
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify",
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs",
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify",
      },
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer",
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/getting-started/pre-made-layouts",
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
  }),
};
</script>
