import type { CommandDef } from "citty";

const _hDefault = (h: any) => (h.default || h) as Promise<CommandDef>;

export const commands = {
    init: () => import('./init').then(_hDefault),
} as const