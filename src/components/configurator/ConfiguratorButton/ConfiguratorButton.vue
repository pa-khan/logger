<template>
  <BaseButton
    class="w-6"
    :class="{'text-sky-400': selected }"
  >
    <BaseIcon
      class="w-6 transition"
      :name="icon"
    />
  </BaseButton>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import BaseButton from '@/components/base/BaseButton/BaseButton.vue'
import BaseIcon from '@/components/base/BaseIcon/BaseIcon.vue'


defineProps({
  icon: {
    type: String as PropType<String>,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})
</script>