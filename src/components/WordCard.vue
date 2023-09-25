<script setup lang="ts">
import { NSpin, useMessage } from 'naive-ui'

defineOptions({
  name: 'WordCard',
  inheritAttrs: false,
})
const props = defineProps<Props>()

interface Props {
	word: Words
	index: number
	loadingShow: boolean
	flipped: boolean
}

interface Words{
  word: string
  phonetic: string
  phoneticsUrl: string
  meanings: string
  translationText: string
}

const message = useMessage()

watch(() => props.word.phoneticsUrl, () => playPhonetic())

// 播放音频
function playAudio(url: string) {
  const audio = new Audio(url)
  audio.play()
}

function playPhonetic(isClick: boolean = false) {
  if (!props.word.phoneticsUrl) {
    isClick && message.warning('没有音频数据')
    return
  }
  playAudio(props.word.phoneticsUrl)
}
</script>

<template>
  <div class="card h-250px w-400px" :class="props.flipped ? 'flipped' : ''">
    <div class="card-inner">
      <div class="card-front left-0 top-0 h-full w-full flex justify-center">
        <!-- 卡片正面内容 -->
        <div class="h-full flex flex-col justify-center">
          <NSpin :show="loadingShow">
            <div>
              <div class="text-3xl font-medium" style="color: #e61e4c;">
                {{ props.word.word }}
              </div>
              <div class="mt-3 flex items-center justify-center">
                {{ props.word.phonetic }}
                <p v-show="props.word.phonetic" class="i-carbon-volume-down-filled ml-2 cursor-pointer" @click="playPhonetic(true)" />
              </div>
            </div>
          </NSpin>
        </div>
        <slot name="footer" />
      </div>
      <div class="card-back p-4">
        {{ props.word.translationText }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  perspective: 1000px; /* 设置透视视角 */
}

.card-inner {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d; /* 保持子元素的 3D 转换效果 */
  transition: transform 0.5s; /* 添加过渡效果 */
  border: 1px solid rgb(235, 235, 230);
  border-radius: 3px;
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  backface-visibility: hidden; /* 隐藏背面 */
}

.card-back {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateY(180deg);
}

.flipped .card-inner {
  transform: rotateY(180deg);
}

:deep(.n-spin-content){
	height: 100%;
}
</style>
