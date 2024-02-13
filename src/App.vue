<script setup lang="ts">
import LoggerList from '@/components/Logger/LoggerList/LoggerList.vue'
import Logger from '@/logger'
import { computed, onMounted, reactive, ref } from 'vue'
import BaseLoaderFilled from '@/components/base/BaseLoaderFilled/BaseLoaderFilled.vue'
import ConfiguratorButton from '@/components/configurator/ConfiguratorButton/ConfiguratorButton.vue'
import BaseIcon from '@/components/base/BaseIcon/BaseIcon.vue'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'
import LoggerGrid from '@/components/Logger/LoggerGrid/LoggerGrid.vue'
import BaseIncDec from '@/components/base/BaseIncDec/BaseIncDec.vue'
import BaseRange from '@/components/base/BaseRange/BaseRange.vue'

/**
 * Инициализация логера
 * @type {Logger}
 */
const logger = new Logger()
const loggs = ref<logger.Log[]>([])

const isLoading = ref(true)
const query = ref('')

const config = reactive({
  type: 'rows',
  reverse: false,
  wrap: true,
  offset: 1,
  fontSize: 16,
  include: ['TRACE', 'ERROR', 'FATAL', 'INFO', 'DEBUG', 'WARN']
})

const styles = computed(() => {
  return {
    'white-space': config.wrap ? 'wrap' : 'nowrap',
    'fontSize': `${ config.fontSize }px`,
    '--offset': `${ config.offset}em`
  }
})

const loggerWrap = ref<HTMLElement>()

const mods = ['TRACE', 'ERROR', 'FATAL', 'INFO', 'DEBUG', 'WARN']

onMounted(async () => {
  /**
   * Авторизация в клиенте
   */
  await logger.login()

  /**
   * Подписка на события логов
   */
  logger.subscribeLogs()
    .then((response: logger.LogsResult) => {
      isLoading.value = false

      const [,, data] = response

      if ('SubscribeError' in data) {
        console.error('Sub error')
      } else {
        /**
         * Парсинг сообщения
         * @type {{v: string, l: "FATAL" | "ERROR" | "DEBUG" | "INFO" | "TRACE" | "WARN"}[]}
         */
        const logs: logger.Log[] = data.Items.map(item => {
          return {
            l: item.Level,
            v: Object.values(item).join(' ')
          }
        })

        loggs.value.push(...logs)
      }
    })
})

function reverse() {
  config.reverse = !config.reverse
}

function wrap() {
  config.wrap = !config.wrap
}

function toggleInclude(value: string) {
  const index = config.include.indexOf(value)
  if (index >= 0) {
    config.include.splice(index, 1)
  } else {
    config.include.push(value)
  }
}

function setType(type: string) {
  config.type = type
}

</script>

<template>
  <BaseLoaderFilled
    v-if="isLoading"
  />
  <div
    v-else
    class="flex flex-col h-screen select-none"
  >
    <div class="flex items-center gap-4 border-b p-2">
      <div>
        <div class="flex gap-1">
          <ConfiguratorButton
            :selected="config.type == 'rows'"
            icon="square-split-vertical"
            @click="setType('rows')"
          />
          <ConfiguratorButton
            :selected="config.type == 'table'"
            icon="grid-four"
            @click="setType('table')"
          />
        </div>
      </div>

      <div>
        <div class="flex gap-2">
          <ConfiguratorButton
            icon="arrow-down"
            :class="config.reverse ? 'rotate-180' : ''"
            @click="reverse"
          />

          <ConfiguratorButton
            :selected="config.wrap"
            icon="key-return"
            @click="wrap"
          />
        </div>
      </div>

      <div class="w-16">
        <BaseIncDec
          :min="12"
          :max="20"
          v-model="config.fontSize"
        />
      </div>

      <div class="w-48">
        <BaseRange
          :min="0"
          :max="3"
          :step="0.1"
          v-model="config.offset"
        />
      </div>

      <div class="flex gap-1 ml-auto">
        <BaseButton
          v-for="(mode, modeIndex) in mods"
          :key="modeIndex"
          class="text-xs px-2 py-1 rounded text-white"
          :class="config.include.includes(mode) ? 'bg-sky-500' : 'bg-slate-400'"
          @click="toggleInclude(mode)"
        >
          {{ mode }}
        </BaseButton>
      </div>

      <div class="relative flex gap-2 w-80">
        <input class="outline-none border p-2 text-xs rounded pr-16 w-full" type="text" v-model="query">
        <BaseIcon
          class="absolute w-6 top-1/2 right-2 -translate-y-1/2"
          name="magnifying-glass"
        />

      </div>
    </div>
    <div
      class="app-wrap flex-grow"
      ref="loggerWrap"
    >
      <LoggerList
        v-if="config.type == 'rows'"
        :style="styles"
        :list="loggs"
        :query="query"
        :include="config.include"
        :reverse="config.reverse"
      />
      <LoggerGrid
        v-if="config.type == 'table'"
        :style="styles"
        :list="loggs"
        :query="query"
        :include="config.include"
        :reverse="config.reverse"
      />
    </div>
  </div>
</template>

<style>
.app-wrap {
  height: calc(100% - 51px);
}
</style>
