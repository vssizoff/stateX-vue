import StoreMain from "./storeMain";
import StoreModule from "./storeModule";
// import {ComputedGetter, ComputedSetter} from "vue";
// import {ComputedGetter, WritableComputedOptions} from "vue";

export type computedType = {
    get: () => any,
    set: (newValue: any) => void
} | (() => any);

// export type computedType = {
//     get: ComputedGetter<any>,
//     set: ComputedSetter<any>
// } | (() => any);

export type watchType = ((newValue: any, oldValue: any, onCleanup: ((cleanupFn: () => void) => void)) => void) | {
    [key: string]: any,
    handler: (newValue: any, oldValue: any, onCleanup: ((cleanupFn: () => void) => void)) => void
};

export type moduleType = {
    data?: (() => {[key: string]: any}) | {[key: string]: any},
    watch?: {[key: string]: watchType},
    computed?: {[key: string]: computedType},
    methods?: {[key: string]: (...args: any) => any},
    mutations?: {[key: string]: (...args: any) => void},
    getters?: {[key: string]: () => any},
    deepWatch?: {[key: string]: watchType}
    // activated?: () => void,
    // beforeMount?: () => void,
    // mounted?: () => void,
    // beforeUpdate?: () => void,
    // updated?: () => void,
    // beforeUnmount?: () => void,
    // unmounted?: () => void,
    // deactivated?: () => void
};

export type namedModuleType = [string, moduleFunctionalType | StoreModule];

export type moduleRawType = moduleType | StoreModule;

export type moduleFunctionalType = ((store: StoreMain) => moduleRawType) | moduleRawType;

export type optionsType = {
    modules?: {[key: string]: moduleFunctionalType} | Array<namedModuleType>
} & moduleType;

export type configType = {
    defaultModuleName?: string
};

export function isNamedModule(module: moduleFunctionalType | namedModuleType): module is namedModuleType {
    return Array.isArray(module) && module.length === 2 && typeof module[0] === "string"
}