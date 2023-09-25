<script setup lang="ts">
import { NButton, NCard, NSpin, useMessage } from 'naive-ui'

const props = defineProps<{ words: string }>()
const router = useRouter()
const message = useMessage()

const loadingShow = ref(false)
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
  loadingShow.value = true
  const promiseList = [fetch(url + wordsList[newIndex]), fetch(translationUrl + wordsList[newIndex])]
  Promise.all(promiseList).then((res) => {
    res[0].json().then((res) => {
      res = res[0]
      word.word = res.word
      word.phonetic = res.phonetic
      word.phoneticsUrl = res.phonetics.find((item: any) => item.audio).audio
      word.phoneticsUrl && playAudio(word.phoneticsUrl)
    })
    res[1].json().then((res) => {
      translation = res.message[0].paraphrase
    })
  }).finally(() => {
    loadingShow.value = false
  })
}, { immediate: true })

// 播放音频
function playAudio(url: string) {
  const audio = new Audio(url)
  audio.play()
}

function playPhonetic() {
  if (!word.phoneticsUrl) {
    message.error('没有音频')
    return
  }
  playAudio(word.phoneticsUrl)
}

window.addEventListener('keydown', (e) => {
  // 如果是空格
  if (e.key === ' ')
    translationText.value = translationText.value ? '' : translation
  // 如果是左箭头
  if (e.key === 'ArrowLeft') {
    if (index.value === 0) {
      message.info('已经跳转到最后一个单词')
      index.value = wordsList.length - 1
      return
    }
    index.value--
    translationText.value = ''
  }
  // 如果是右箭头
  if (e.key === 'ArrowRight') {
    if (index.value + 1 === wordsList.length) {
      message.info('已经跳转到第一个单词')
      index.value = 0
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
      <NSpin :show="loadingShow" class="h-full flex justify-center">
        <div class="h-full flex flex-col justify-center">
          <div>
            <div class="text-3xl font-medium" style="color: #e61e4c;">
              {{ word.word }}
            </div>
            <div class="mt-3 flex items-center justify-center">
              {{ word.phonetic }}
              <p class="i-carbon-volume-down-filled ml-2 cursor-pointer" @click="playPhonetic" />
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
      </NSpin>
    </NCard>
    <div mt-8>
      <NButton type="primary" @click="router.back()">
        Back
      </NButton>
    </div>
  </div>
</template>
