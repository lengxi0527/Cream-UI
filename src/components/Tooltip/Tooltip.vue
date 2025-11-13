<template>
  <div class="vk-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="vk-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>
    <div v-show="isVisible" class="vk-tooltip__popper" ref="popperNode">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from './type';
import type { Instance } from '@popperjs/core'
import { createPopper } from '@popperjs/core';
import { onMounted, reactive, ref, watch } from 'vue';
import useClickOutside from '@/hooks/UseClickOutside';
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom"
})
const emits = defineEmits<TooltipEmits>()
const isVisible = ref(false)
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
const open = () => {
  isVisible.value = true
  emits('visible-change', true)
}
const close = () => {
  isVisible.value = false
  emits('visible-change', false)
}
const tooglePopper = () => {
  isVisible.value = !isVisible.value;
  emits('visible-change', isVisible.value)
}
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = open
    outerEvents['mouseleave'] = close
  } else if (props.trigger === 'click') {
    events['click'] = tooglePopper
  }
}
if (!props.maunal) {
  attachEvents()
}

useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isVisible.value && !props.maunal) {
    close()
  }
})
watch(() => props.trigger, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    // clear all events
    events = {}
    outerEvents = {}
    attachEvents()
  }
})
watch(isVisible, (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, {
        placement: props.placement
      })
    } else {
      popperInstance?.destroy()
    }
  }
}, { flush: 'post' })
watch(() => props.maunal, (newValue) => {
  if (newValue) {
    events = {}
    outerEvents = {}
  } else {
    attachEvents()
  }

})
onMounted(()=>{
   popperInstance?.destroy()
})

defineExpose<TooltipInstance>({
  'show': open,
  'hide': close,
})
</script>
