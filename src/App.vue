<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
</script>

<template>
  <main text-center font-sans>
    <NMessageProvider>
      <RouterView />
      <TheFooter />
    </NMessageProvider>
  </main>
</template>
