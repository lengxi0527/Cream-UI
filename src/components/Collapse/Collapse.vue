<template>
<div class="vk-collapse">
  <slot></slot>
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { nameType } from './types';
import { provide } from 'vue';
import { collapseItemContexKey } from './types';
defineOptions({
  name:'VkCollapseItem'
})
const activeNames = ref<nameType[]>([])
const handleItemClick = (item : nameType)=>{
  const index = activeNames.value.indexOf(item)
  if(index > -1){
    activeNames.value.splice(index, 1)
  }else{
    activeNames.value.push(item)
  }
}
provide(collapseItemContexKey, {
  activeNames,
  handleItemClick
})
</script>
<style scoped></style>
