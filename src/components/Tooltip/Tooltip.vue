<template>
  <div class="vk-tooltip">
    <div class="vk-tooltip__trigger" ref="triggerNode" @click="tooglePopper">
      <slot></slot>
    </div>
    <div v-show="isVisible" class="vk-tooltip__popper" ref="popperNode">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TooltipProps, TooltipEmits } from './type';
import type { Instance } from '@popperjs/core'
import { createPopper } from '@popperjs/core';
import { ref, watch } from 'vue';
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom"
})
const emits = defineEmits<TooltipEmits>()
const isVisible = ref(false)
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
const tooglePopper = () => {
  isVisible.value = !isVisible.value;
  emits('visible-change', isVisible.value)
}
watch(isVisible, (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, {
        placement: props.placement
      })
    }else{
        popperInstance?.destroy()
      }
  }
}, {flush:'post'})


</script>
