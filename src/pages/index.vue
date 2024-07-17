<template>
  <v-container>
    <v-row>
      <v-col class="pa-0" cols="12">
        <v-img class="position-absolute opacity-10" src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="100%" cover></v-img>
        <h1 class="text-center mt-5">目前事項：<span class="text-pink-accent-3">{{ currentText }}</span>
        </h1>
        <div class="text-center my-5">
          <v-progress-circular :model-value="timeleft * 20" :rotate="360" :size="150" :width="15" color="pink-accent-3">
            <template v-slot:default>
              <v-row class="flex-column">
                <v-col class="pa-0">
                  <p>剩餘時間</p>
                </v-col>
                <v-col class="pa-0">
                  <h1>{{ currentTime }}</h1>
                </v-col>
              </v-row>
            </template>
          </v-progress-circular>
        </div>
      </v-col>
      <v-row class="text-center justify-center">
        <v-col cols="2">
          <v-btn icon="mdi-play" @click="startTimer" :disabled="status === STATUS.COUNTING || (currentItem.length === 0 && items.length === 0)"></v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn icon="mdi-pause" @click="pauseTimer" :disabled="status !== STATUS.COUNTING"></v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn icon="mdi-skip-next" @click="finishTimer" :disabled="currentItem.length === 0"></v-btn>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script setup>
import { definePage } from 'vue-router/auto'
import { useListStore } from '@/stores/list'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useWebNotification } from '@vueuse/core'

definePage({
  meta: {
    title: '蕃茄鐘 | 首頁'
  }
})

const STATUS = {
  STOP: 0,
  COUNTING: 1,
  PAUSE: 2
}
const status = ref(STATUS.STOP)

const list = useListStore()
const { currentItem, items, timeleft } = storeToRefs(list)
const { setCurrentItem, countdown, setFinishItem } = list

const settings = useSettingsStore()
const { selectedAlarmFile } = storeToRefs(settings)

let timer = 0
const startTimer = () => {
  if (status.value === STATUS.STOP && items.value.length > 0) {
    setCurrentItem()
  }

  status.value = STATUS.COUNTING

  timer = setInterval(() => {
    countdown()
    if (timeleft.value === 0) {
      finishTimer()
    }
  }, 1000)
}

const pauseTimer = () => {
  status.value = STATUS.PAUSE
  clearInterval(timer)
}

const finishTimer = () => {
  clearInterval(timer)
  status.value = STATUS.STOP

  // 截止時間到後，播放聲音
  const audio = new Audio()
  audio.src = selectedAlarmFile.value
  audio.play()

  // 完成事項後，跳出通知訊息
  const { show, isSupported } = useWebNotification({
    title: '完成事項',
    body: currentItem.value,
    icon: new URL('@/assets/tomato.png', import.meta.url).href
  })
  if (isSupported.value) {
    show()
  }

  setFinishItem()

  if (items.value.length > 0) {
    startTimer()
  }
}

const currentText = computed(() => {
  if (currentItem.value.length > 0) {
    return currentItem.value
  } else if (items.value.length > 0) {
    return '點擊開始'
  } else {
    return '沒有事項'
  }
})

const currentTime = computed(() => {
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})

</script>
