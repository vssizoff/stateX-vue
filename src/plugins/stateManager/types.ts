import StoreMain from "@/plugins/stateManager/storeMain";
import StoreModule from "@/plugins/stateManager/storeModule";
// import {ComputedGetter, WritableComputedOptions} from "vue";

export type computedType = {[key: string]: {
    get: () => any,
    set: (newValue: any) => void
} | (() => any)};

export type watchType = ((newValue: any) => void) | {
    [key: string]: any,
    handler: (newValue: any) => void
};

export type moduleType = {
    data?: (() => {[key: string]: any}) | {[key: string]: any},
    watch?: {[key: string]: watchType},
    computed?: computedType,
    methods?: {[key: string]: (...args: any) => any},
    mutations?: {[key: string]: (...args: any) => void},
    getters?: {[key: string]: () => any}
    // activated?: () => void,
    // beforeMount?: () => void,
    // mounted?: () => void,
    // beforeUpdate?: () => void,
    // updated?: () => void,
    // beforeUnmount?: () => void,
    // unmounted?: () => void,
    // deactivated?: () => void
};

export type moduleRawType = ((store: StoreMain) => moduleType) | moduleType

export type optionsType = {
    modules?: {[key: string]: moduleRawType | StoreModule}
} & moduleType;

export type configType = {
    defaultModuleName?: string
};