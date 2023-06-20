<script setup>
  import contentBox from "@/components/contentBox.vue"
</script>

<template>
  <v-app 
    color="background"
  >
    <v-card
      color="secondary"
    >
      <v-card-title
        class="text-accent text-center"
        style="padding: 2rem;"
      >
        Gift Exchange
      </v-card-title>
    </v-card>
    <v-card
      color="primary"
    >
      <v-card-text
        style="padding: 1rem;"
      >
        <contentBox />
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
  import contentBox from "@/components/contentBox.vue"

  export default {
      name: "ContentBox",
      components: {
        contentBox: contentBox
      }
  }
</script>
