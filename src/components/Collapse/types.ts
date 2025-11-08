import type {InjectionKey, Ref} from 'vue'
export type nameType = string | number
export interface CollapseProps{
  modelValue: nameType [],
  accordion?: boolean
}
export interface CollapseEmits{
  (e:'update-modelValue', values: nameType[]) : void
  (e:'change', values: nameType[]) : void
}
export interface CollapseItemProps{
  name: nameType,
  title?: string,
  disabled? : boolean
}
export interface CollapseItemContex{
  activeNames: Ref<nameType[]>
  handleItemClick : (name : nameType) => void
}
export const collapseItemContexKey : InjectionKey<CollapseItemContex> =  Symbol('collapseItemContexKey')
