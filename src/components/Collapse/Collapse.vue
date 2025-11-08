<template>
<div class="vk-collapse">
  <slot></slot>
</div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import type { nameType } from './types';
import { provide } from 'vue';
import { collapseItemContexKey } from './types';
import type { CollapseProps, CollapseEmits } from './types';
defineOptions({
  name:'VkCollapseItem'
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<nameType[]>(props.modelValue)
const handleItemClick = (item : nameType)=>{
  if(props.accordion){
    activeNames.value[0] = (activeNames.value[0] === item ? '' : item)
  }else{
     const index = activeNames.value.indexOf(item)
  if(index > -1){
    activeNames.value.splice(index, 1)
  }else{
    activeNames.value.push(item)
  }
  }
  emits('update-modelValue', activeNames.value)
  emits('change', activeNames.value)
}
provide(collapseItemContexKey, {
  activeNames,
  handleItemClick
})


watch(()=>props.modelValue, ()=>{
  activeNames.value = props.modelValue
})
</script>
<style scoped></style>
