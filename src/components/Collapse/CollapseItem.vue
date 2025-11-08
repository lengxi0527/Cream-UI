<template>
<div class="vk-collapse-item"
:class="{
  'is-disabled': disabled
}"
>
  <div class="vk-collapse-item-header" :id="`item-header-${name}`" @click="handleClick">
   <slot name="title">{{ title }}</slot>
  </div>
  <div class="vk-collapse-item-content" :id="`item-content-${name}`" v-show="isActive">
    <slot></slot>
  </div>
</div>
</template>
<script setup lang="ts">
import type { CollapseItemProps } from './types';
import { computed, inject } from 'vue';
import { collapseItemContexKey } from './types';

defineOptions({
  name:'VkCollapseItem'
})
const props = defineProps<CollapseItemProps>()
const collapseItemContex = inject(collapseItemContexKey,)
const isActive = computed(()=>
 collapseItemContex?.activeNames.value.includes(props.name)
)
const handleClick = ()=>{
  if(props.disabled) return;
  collapseItemContex?.handleItemClick(props.name)
}
</script>
<style scoped>
.vk-collapse-item-header{
  font-size: 30px;
  margin-bottom: 20px;
}
</style>
