<script setup>
  import Welcome from "@/components/content/Welcome.vue"
</script>

<template>
    <div>
        <Welcome />
    </div>
</template>

<script>
    import Welcome from "@/components/content/Welcome.vue"

    export default {
        name: "ContentBox",
        components: {
            Welcome: Welcome
        }
    }
</script>