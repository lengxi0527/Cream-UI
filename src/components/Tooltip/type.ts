import type { Placement } from "@popperjs/core";

export interface TooltipProps{
  content?:string;
  trigger: 'hover'|'click';
  placement?: Placement;
  maunal?: boolean
}

export interface TooltipEmits{
  (e:'visible-change', value:boolean) : void
}

export interface TooltipInstance{
  show: ()=>void;
  hide: ()=>void;
}
