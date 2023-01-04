<template>
  <v-content>
    <v-container>
      <div class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/WalkItLogo1.png')"
            class="my-3"
            contain
            height="200"
          />
        </v-col>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Walk it!</h1>
        <h2>
          Walk it is a website that encourages you to live a healthier
          lifestyle. Each route is not just a simple walk. If you want to,
          during your walk you're able to find a small package via the hints
          available for every route. Depending on the size of the package, you
          can sign your name alongside other app users, take a quick picture and
          publish it. With that you will receive points that will determine your
          walking rank.
        </h2>

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
      </div></v-container
    ></v-content
  >
</template>

<script>
export default {};
</script>

<style></style>
