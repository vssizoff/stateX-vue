import StoreModule from "@/plugins/stateManager/storeModule";
import {configType, moduleRawType, optionsType} from "@/plugins/stateManager/types";

export default class StoreMain {
    [prop: string]: any

    constructor(options: optionsType | ((store: StoreMain) => optionsType), config: configType) {
        if (typeof options === "function") {
            options = options.bind(this);
            options = options(this);
        }
        config.defaultModuleName = config.defaultModuleName !== undefined ? config.defaultModuleName : "global";
        this.$addModule(config.defaultModuleName, options);
        if (config.defaultModuleName === "") {
            let module = this[""];
            delete this[""];
            Object.keys(module).forEach(key => {this[key] = module[key]});
        }
        if (options.modules !== undefined){
            for (let module of Object.keys(options.modules)) {
                this.$addModule(module, options.modules[module]);
            }
        }
    }

    $addModule(name: string, module: moduleRawType | StoreModule) {
        if (module instanceof StoreModule) {
            this[name] = module;
            return;
        }
        if (typeof module === "function"){
            module = module(this);
        }
        if (typeof module === "object"){
            this[name] = new StoreModule(this, module);
        }
        else {
            this[name] = module;
        }
    }
}