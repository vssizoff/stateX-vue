import {App} from "vue";
import StoreMain from "./storeMain";
import {moduleFunctionalType, namedModuleType, optionsType} from "./types";
import StoreModule from "./storeModule";

export type configType = {
    name?: string
    defaultModuleName?: string
}

export type mixinType = (module: optionsType | ((store: StoreMain) => optionsType), config?: configType) => { data: () => object };

export type createType = (module: optionsType | ((store: StoreMain) => optionsType), config?: configType) => (app: App) => void;

export type storeType = (app: App, options: {
    module: optionsType | ((store: StoreMain) => optionsType),
    config?: configType
}) => void;

export const storeMixin: mixinType = (module, config = {}) => {
    return {
        data() {
            return  {
                [config.name || "store"]: new StoreMain(module, config)
            };
        }
    }
}

export const createStore: createType = (module, config = {}) => (app: App) => app.mixin(storeMixin(module, config));

export const store: storeType = (app, options) => {
    app.mixin(storeMixin(options.module, options.config || {}));
};

export function createStoreModule(module: StoreModule | moduleFunctionalType, name: string = ""): namedModuleType {
    return [name, module];
}

export function bothTypeModules(obj: {[key: string]: moduleFunctionalType}, array: Array<namedModuleType>): Array<namedModuleType> {
    Object.keys(obj).forEach(key => {
        array.push([key, obj[key]]);
    });
    return array;
}