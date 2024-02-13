<template>
    <svg
        class="BaseIcon"
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
    >
        <use :xlink:href="`/images/sprite.svg` + `?v=${version}#${name}`"/>
    </svg>
</template>
<script setup lang="ts">
import {computed} from 'vue'

defineProps<{
    name: Icons
}>()

const version = computed(() => {
    return import.meta.env.VITE_APP_VERSION
})
</script>