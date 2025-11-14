import type { Placement } from "@popperjs/core";
import type { Options } from "@popperjs/core";

export interface TooltipProps {
  content?: string;
  trigger: 'hover' | 'click';
  placement?: Placement;
  maunal?: boolean;
  popperOptions?: Partial<Options>;
  transition?: string
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
}

export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}
