<template>
  <v-layout ref="app">
    <v-app-bar color="grey-lighten-2" name="app-bar" class="justify-center">
      <div class="d-flex justify-center align-center w-100">
        <v-text-field
          label="Digite um nick"
          :rules="rules"
          validate-on="submit"
          hide-details="auto"
          loading=""
        ></v-text-field>   
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <!-- <RouterLink to="/about">About</RouterLink> -->
      </nav>
    </v-app-bar>
    <!-- <v-navigation-drawer color="grey-darken-2" permanent name="drawer">
      <div class="d-flex justify-center align-center">
        <v-img
        aspect-ratio="16/9"
        cover
        src="https://wstatic-prod.pubg.com/web/live/static/og/img-og-pubg.jpg"
      ></v-img>
      </div>
    </v-navigation-drawer> -->
    <!-- <v-main>
      <v-card height="500px" width="600"></v-card>
    </v-main> -->
  </v-layout>
</template>
<script>
  export default {
    data: () => ({
        layout: null,
        rules: [
            value => !!value || "Required.",
            value => (value && value.length >= 3) || "Min 3 characters",
        ],
    }),
    methods: {
        print(key) {
            alert(JSON.stringify(this.$refs.app.getLayoutItem(key), null, 2));
        },
        
    },
}
</script>
<style scoped>

</style>
