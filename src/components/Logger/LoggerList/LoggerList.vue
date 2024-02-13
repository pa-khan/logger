<template>
  <div
    class="LoggerList flex flex-col font-mono whitespace-nowrap overflow-x-auto"
    :style="{
      'flex-direction': !reverse ? 'column' : 'column-reverse',
    }"
  >
    <template
      v-for="(item, itemIndex) in list"
      :key="itemIndex"
    >
      <LoggerItem
        v-if="include.includes(item.l)"
        :item="item"
        :query="query"
        :regexp="regexp"
      />
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

const regexp = computed(() => {
  return new RegExp(props.query, 'gi')
})
</script>

<style lang="scss">
.LoggerList {
  gap: var(--offset);
  padding: var(--offset);
}
</style>