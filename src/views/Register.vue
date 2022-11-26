<template>
  <v-content
    ><v-card width="400" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">Register</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Email" prepend-icon="mdi-account-circle" />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="Password"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="info">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script>
export default {
  name: "Register",

  data: () => ({
    showPassword: false,
  }),
};
</script>

<style></style>
