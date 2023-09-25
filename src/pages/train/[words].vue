<script setup lang="ts">
import { NButton, useMessage } from 'naive-ui'

const props = defineProps<{ words: string }>()
const router = useRouter()
const message = useMessage()

const loadingShow = ref(false)
const flipped = ref(false)
const wordsList = JSON.parse(props.words)
const index = ref(0)
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const translationUrl = 'http://v.52ym.vip/translate.php?c=word&m=getsuggest&nums=1&is_need_mean=1&word='
const word = reactive({
  word: '',
  phonetic: '',
  phoneticsUrl: '',
  meanings: '',
  translationText: '',
})

watch(index, (newIndex) => {
  loadingShow.value = true
  const promiseList = [fetch(url + wordsList[newIndex]), fetch(translationUrl + wordsList[newIndex])]
  Promise.all(promiseList).then((res) => {
    res[0].json().then((res) => {
      res = res[0]
      word.word = res.word
      word.phonetic = res.phonetic
      word.phoneticsUrl = res.phonetics.find((item: any) => item.audio)?.audio ?? ''
    })
    res[1].json().then((res) => {
      word.translationText = res.message[0].paraphrase
    })
  }).finally(() => {
    loadingShow.value = false
  })
}, { immediate: true })

window.addEventListener('keydown', (e) => {
  // 如果是空格
  if (e.key === ' ')
    flipped.value = !flipped.value
  // 如果是左箭头
  if (e.key === 'ArrowLeft') {
    if (index.value === 0) {
      message.info('已经跳转到最后一个单词')
      index.value = wordsList.length - 1
      return
    }
    index.value--
  }
  // 如果是右箭头
  if (e.key === 'ArrowRight') {
    if (index.value + 1 === wordsList.length) {
      message.info('已经跳转到第一个单词')
      index.value = 0
      return
    }
    index.value++
  }
})
</script>

<template>
  <div class="mt-50 h-full w-full flex flex-col items-center justify-center">
    <WordCard :word="word" :index="index" :loading-show="loadingShow" :flipped="flipped">
      <template #footer>
        <div class="absolute bottom-2 right-3">
          {{ index + 1 }} / {{ wordsList.length }}
        </div>
      </template>
    </WordCard>
    <div mt-8>
      <NButton type="primary" @click="router.back()">
        Home
      </NButton>
    </div>
  </div>
</template>
