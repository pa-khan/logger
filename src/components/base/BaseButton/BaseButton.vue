<style src="./BaseButton.scss"/>
<template>
    <component
        :is="type"
        class="BaseButton"
    >
        <slot/>
    </component>
</template>
<script setup lang="ts">
import {PropType} from 'vue'

defineProps({
    type: {
        type: String as PropType<'div' | 'button'>,
        default: 'div'
    }
})
</script>