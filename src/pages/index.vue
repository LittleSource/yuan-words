<script setup lang="ts" generic="T extends any, O extends any">
import { NButton, NInput } from 'naive-ui'

defineOptions({
  name: 'IndexPage',
})

const words = ref('')

const router = useRouter()
function go() {
  const wordsList = words.value.split('\n').filter(item => item.trim())
  if (words.value)
    router.push(`train/${JSON.stringify(wordsList)}`)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div i-carbon-campsite mt-10 inline-block text-center text-4xl />
    <p>源英语</p>
    <div class="mt-8 w-1/5">
      <NInput
        v-model:value="words"
        class="w-2/5"
        type="textarea"
        placeholder="请输入单词，回车隔开"
      />
    </div>

    <div>
      <NButton
        class="mt-6"
        :disabled="!words"
        @click="go"
      >
        Go
      </NButton>
    </div>
  </div>
</template>
