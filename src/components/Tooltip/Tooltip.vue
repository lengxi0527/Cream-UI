<template>
  <div class="vk-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="vk-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>
    <transition :name="transition">
      <div v-if="isVisible" class="vk-tooltip__popper" ref="popperNode">
        <slot name="content">{{ content }}</slot>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./type";
import type { Instance } from "@popperjs/core";
import { createPopper } from "@popperjs/core";
import { reactive, ref, watch, computed, onUnmounted } from "vue";
import useClickOutside from "@/hooks/UseClickOutside";
import { debounce } from "lodash-es";
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
  transition: "fade",
  openDelay: 0,
  closeDelay: 0,
});
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 9],
        },
      },
    ],
    ...props.popperOptions,
  };
});
const emits = defineEmits<TooltipEmits>();
const isVisible = ref(false);
const triggerNode = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();
const popperContainerNode = ref<HTMLElement>();
let popperInstance: Instance | null = null;
let events: Record<string, any> = reactive({});
let outerEvents: Record<string, any> = reactive({});
let openDelayTimes = 0;
let closeDelayTimes = 0;
const open = () => {
  setTimeout(() => {
    openDelayTimes++;
    isVisible.value = true;
    emits("visible-change", true);
  }, props.openDelay);
  console.log("openDelayTimes==", openDelayTimes);
};
const close = () => {
  setTimeout(() => {
    closeDelayTimes++;
    isVisible.value = false;
    emits("visible-change", false);
  }, props.closeDelay);
  console.log("closeDelayTimes==", closeDelayTimes);
};

const openDebance = debounce(open, props.openDelay)
const closeDebance = debounce(close, props.closeDelay)
const openFinal = ()=>{
  closeDebance.cancel()
  openDebance()
}
const closeFinal = ()=>{
  openDebance.cancel()
  closeDebance()
}
const tooglePopper = () => {
  if (isVisible.value) {
    closeFinal();
  } else {
    openFinal();
  }
};
const attachEvents = () => {
  if (props.trigger === "hover") {
    events["mouseenter"] = openFinal;
    outerEvents["mouseleave"] = closeFinal;
  } else if (props.trigger === "click") {
    events["click"] = tooglePopper;
  }
};
if (!props.manual) {
  attachEvents();
}

useClickOutside(popperContainerNode, () => {
  if (props.trigger === "click" && isVisible.value && !props.manual) {
    closeFinal();
  }
});
watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      // clear all events
      events = {};
      outerEvents = {};
      attachEvents();
    }
  }
);
watch(
  isVisible,
  (newValue) => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value);
      } else {
        popperInstance?.destroy();
      }
    }
  },
  { flush: "post" }
);
watch(
  () => props.manual,
  (newValue) => {
    if (newValue) {
      events = {};
      outerEvents = {};
    } else {
      attachEvents();
    }
  }
);

onUnmounted(() => {
  popperInstance?.destroy();
});

defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
});
</script>
