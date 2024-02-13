<template>
  <div
    class="LoggerGrid grid grid-cols-2 font-mono whitespace-nowrap overflow-hidden h-full"
    :style="{
      gridTemplateRows: `repeat(${rows}, 1fr)`
    }"
  >
    <template
      v-for="([key, list], listIndex) of listsValues"
      :key="key"
    >
      <div
        v-if="include.includes(key)"
        class="LoggerGrid__Col relative border overflow-hidden"
      >
        <div
          class="Logger__Wrap flex flex-col h-full overflow-auto"
          :style="{
            'flex-direction': !reverse ? 'column' : 'column-reverse',
          }"
        >
          <div class="absolute bottom-0 left-0 bg-slate-300 p-1 text-xxs">{{ key }}</div>
          <LoggerItem
            v-for="(item, itemIndex) in list"
            :key="itemIndex"
            :item="item"
            :query="query"
            :regexp="regexp"
          />
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import LoggerItem from '@/components/Logger/LoggerItem/LoggerItem.vue'

const props = defineProps({
  list: {
    type: Object as PropType<logger.Log[]>,
    required: true
  },
  query: {
    type: String,
    required: true
  },
  include: {
    type: Object as PropType<string[]>,
    required: true
  },
  reverse: {
    type: Boolean,
    required: true
  }
})

const defaultLists = {
  'TRACE': [],
  'ERROR': [],
  'FATAL': [],
  'INFO': [],
  'DEBUG': [],
  'WARN': []
}

const regexp = computed(() => {
  return new RegExp(props.query, 'gi')
})

const rows = computed(() => {
  return Math.trunc(props.include?.length / 2)
})

const lists = computed(() => {
  const lists = cloneDefaultList()

  props.list?.forEach((item) => {
    lists[item.l].push(item)
  })

  return lists
})

const listsValues = computed(() => {
  return Object.entries(lists.value)
})


function cloneDefaultList() {
  return JSON.parse(JSON.stringify(defaultLists))
}
</script>
<style lang="scss">
.Logger {
  &__Wrap {
    padding: var(--offset);
    gap: var(--offset);
  }
}
</style>
