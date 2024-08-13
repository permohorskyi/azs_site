<template>
  <main>
    <h1>Page not found</h1>
    <AppLink
      name="settings"
      :params="null"
    >
      <p>Go to the main page</p>
    </AppLink>
  </main>
</template>

<script setup lang="ts">
import AppLink from "@/components/global/AppLink.vue"
</script>
