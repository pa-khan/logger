<style src="./BaseRange.scss"/>
<template>
    <div class="BaseRange">
        <div
            class="BaseRange__Handle bg-slate-300"
            :style="{
                left: `${left}%`
            }"
        />
        <div class="BaseRange__Line"/>
        <input
            v-model.number="value"
            class="BaseRange__Input"
            type="range"
            :min="min"
            :max="max"
            :step="step"
        >
    </div>
</template>
<script setup lang="ts">
import {computed, ref, watch} from 'vue'

const props = defineProps({
    min: {
        type: Number,
        default: 1
    },
    max: {
        type: Number,
        default: 1
    },
    step: {
        type: Number,
        default: 1
    },
    modelValue: {
        type: Number,
        required: true
    }
})

const emits = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)


const diff = computed(()=>{
    return props.max - props.min
})

const percent = computed(()=>{
    return 100 / diff.value
})

const left = computed(()=>{
    return (value.value - props.min) * percent.value
})

watch(
    value,
    () => {
        emits('update:modelValue', value.value)
    }
)

watch(
    () => props.modelValue,
    () => {
        if (value.value != props.modelValue) {
            value.value = props.modelValue
        }
    }
)
</script>