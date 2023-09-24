<script setup lang="ts">
import { NButton, NCard, useMessage } from 'naive-ui'

const props = defineProps<{ words: string }>()
const router = useRouter()
const message = useMessage()

const wordsList = JSON.parse(props.words)
const index = ref(0)
const translationText = ref('')
let translation = ''
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const translationUrl = 'http://v.52ym.vip/translate.php?c=word&m=getsuggest&nums=1&is_need_mean=1&word='
const word = reactive({
  word: '',
  phonetic: '',
  phoneticsUrl: '',
  meanings: '',
})

watch(index, (newIndex) => {
  fetch(url + wordsList[newIndex]).then((res) => {
    res.json().then((res) => {
      res = res[0]
      word.word = res.word
      word.phonetic = res.phonetic
      word.phoneticsUrl = res.phonetics.find((item: any) => item.audio).audio
      word.phoneticsUrl && playAudio(word.phoneticsUrl)
    })
  })
  fetch(translationUrl + wordsList[newIndex]).then((res) => {
    res.json().then((res) => {
      translation = res.message[0].paraphrase
    })
  })
}, { immediate: true })

// 播放音频
function playAudio(url: string) {
  const audio = new Audio(url)
  audio.play()
}

window.addEventListener('keydown', (e) => {
  // 如果是空格
  if (e.key === ' ')
    translationText.value = translationText.value ? '' : translation
  // 如果是左箭头
  if (e.key === 'ArrowLeft') {
    if (index.value === 0) {
      message.error('已经是第一个了')
      return
    }
    index.value--
    translationText.value = ''
  }
  // 如果是右箭头
  if (e.key === 'ArrowRight') {
    if (index.value + 1 === wordsList.length) {
      message.error('已经是最后一个了')
      return
    }
    index.value++
    translationText.value = ''
  }
})
</script>

<template>
  <div class="mt-50 h-full w-full flex flex-col items-center justify-center">
    <NCard class="h-250px w-400px">
      <div class="h-full flex flex-col justify-center">
        <div>
          <div class="text-3xl font-medium" style="color: #e61e4c;">
            {{ word.word }}
          </div>
          <div class="mt-3">
            {{ word.phonetic }}
          </div>
          <div v-show="translationText" class="mt-5">
            {{ translationText }}
          </div>
        </div>
      </div>
      <template #action>
        <div class="text-right">
          {{ index + 1 }} / {{ wordsList.length }}
        </div>
      </template>
    </NCard>
    <div mt-8>
      <NButton type="primary" @click="router.back()">
        Back
      </NButton>
    </div>
  </div>
</template>
