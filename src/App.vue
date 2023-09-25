<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
</script>

<template>
  <main text-center font-sans>
    <NMessageProvider>
      <div box-border w-full p-4 text-right text-xl icon-btn @click="toggleDark()">
        <div i-carbon-sun dark:i-carbon-moon />
      </div>
      <RouterView />
    </NMessageProvider>
  </main>
</template>
