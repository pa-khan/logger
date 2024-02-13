<style src="./BaseSelect.scss"/>
<template>
    <div
        ref="element"
        v-click-outside="hide"
        class="BaseSelect"
        :class="{'--open' : isOpen}"
        @click="toggleOpen"
    >
        <div class="BaseSelect__Area">
            <div class="BaseSelect__Title">
                {{ modelValue }}
            </div>
            <BaseIcon
                class="BaseSelect__Chevron"
                name="caret-down"
            />
        </div>
        <div class="BaseSelect__Drop">
            <div class="BaseSelect__List">
                <div
                    v-for="(option, optionIndex) in options"
                    :key="optionIndex"
                    class="BaseSelect__Item"
                    @click="setValue(option)"
                >
                    <span>
                        {{ option }}
                    </span>
                    <BaseIcon
                        v-show="modelValue == option"
                        class="BaseSelect__Check"
                        name="check"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {PropType, ref} from 'vue'
import BaseIcon from '@/components/base/BaseIcon/BaseIcon.vue'

type Option = string | number

defineProps({
    options: {
        type: Object as PropType<Option[]>,
        required: true
    },
    modelValue: {
        type: [String, Number],
        required: true
    }
})

const emits = defineEmits(['update:modelValue'])

const element = ref<HTMLElement>()
const isOpen = ref(false)

function setValue(value: Option) {
    emits('update:modelValue', value)
}

function open() {
    isOpen.value = true
}

function hide() {
    isOpen.value = false
}

function toggleOpen() {
    !isOpen.value ? open() : hide()
}
</script>