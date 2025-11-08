<template>
  <button ref="_ref" class="vk-button" :class="{
    [`vk-button--${type}`]: type,
    [`vk-button--${size}`]: size,
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle,
    'is-disabled': disabled,
  }" :disabled="disabled"
  :autofocus="autofocus"
  :type="nativeType"
  >
  <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { defineOptions, ref } from 'vue';
import type { ButtonProps } from './types';
const _ref = ref<HTMLButtonElement>()
defineOptions({
  name: 'VkButton'
})
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})
defineExpose({
  ref: _ref
})
</script>
<style scoped>

</style>
