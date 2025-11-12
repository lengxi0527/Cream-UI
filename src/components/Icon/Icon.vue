<template>
  <i class="vk-icon" :class="{
    [`vk-icon--${type}`]: type
  }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { IconProps } from "./type";
import { omit } from "lodash-es";
defineOptions({
  name: "VkIcon",
  inheritAttrs: false,
});
const props = defineProps<IconProps>();
const filterProps = computed(() => {
  return omit(props, ['type', 'color'])
});
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>
<style scoped></style>
