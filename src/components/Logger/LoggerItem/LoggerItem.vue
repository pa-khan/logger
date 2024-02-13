<template>
  <div
    class="LoggerItem"
    :class="[color]"
    v-html="message"
  />
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<logger.Log>,
    required: true
  },
  query: {
    type: String,
    required: true
  },
  regexp: {
    type: Object as PropType<RegExp>,
    required: true
  }
})

const colors: {[key in logger.LogItemLevel]: string} = {
  TRACE: 'text-slate-400',
  ERROR: 'text-red-400',
  FATAL: 'text-red-700',
  INFO: 'text-yellow-700',
  DEBUG: 'text-slate-700',
  WARN: 'text-yellow-400',
}

const message = computed(()=>{
  return props.query.length >= 5 ? props.item.v.replace(props.regexp, (match) => `<i class="bg-yellow-600 text-white">${match}</i>`) : props.item?.v
})

const color = computed(()=>{
  return colors[props.item!.l]
})
</script>
