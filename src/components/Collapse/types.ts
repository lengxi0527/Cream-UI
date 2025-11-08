import type {InjectionKey, Ref} from 'vue'
export type nameType = string | number
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
