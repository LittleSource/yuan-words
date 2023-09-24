<script setup lang="ts" generic="T extends any, O extends any">
import { NButton, NInput } from 'naive-ui'

defineOptions({
  name: 'IndexPage',
})

const words = ref('')

const router = useRouter()
function go() {
  const wordsList = words.value.split('\n')
  if (words.value)
    router.push(`train/${JSON.stringify(wordsList)}`)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div i-carbon-campsite inline-block text-center text-4xl />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>

    <div class="w-1/5">
      <NInput
        v-model:value="words"
        class="w-2/5"
        type="textarea"
        placeholder="请输入单词，回车隔开"
      />
    </div>

    <div>
      <NButton
        class="m-3"
        :disabled="!words"
        @click="go"
      >
        Go
      </NButton>
    </div>
  </div>
</template>
