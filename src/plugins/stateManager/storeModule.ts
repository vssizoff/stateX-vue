import StoreMain from "./storeMain";
import {computedType, moduleType, watchType} from "./types";
import {ref, Ref, watch} from "vue";
import {createComputed} from "./tsIgnore";

export default class StoreModule {
    [prop: string]: any
    $refs: {[key: string]: Ref} = {}
    $store: StoreMain

    constructor(store: StoreMain, options: moduleType) {
        this.$store = store;
        if (options.data !== undefined){
            if (typeof options.data === "function"){
                options.data = options.data().bind(store);
            }
            if (typeof options.data === "object"){
                for (let elem of Object.keys(options.data)){
                    this.$addData(elem, options.data[elem]);
                }
            }
        }
        if (options.computed !== undefined && typeof options.computed === "object") {
            for (let elem of Object.keys(options.computed)){
                this.$addComputed(elem, options.computed[elem]);
            }
        }
        if (options.getters !== undefined && typeof options.getters === "object"){
            options.methods = {...options.methods, ...options.getters};
        }
        if (options.mutations !== undefined && typeof options.mutations === "object"){
            options.methods = {...options.methods, ...options.mutations};
        }
        if (options.methods !== undefined && typeof options.methods === "object"){
            for (let elem of Object.keys(options.methods)){
                this.$addMethod(elem, options.methods[elem]);
            }
        }
        if (options.watch !== undefined && typeof options.watch === "object"){
            for (let elem of Object.keys(options.watch)){
                this.$addWatch(elem, options.watch[elem]);
            }
        }
        if (options.deepWatch !== undefined && typeof options.deepWatch === "object"){
            for (let elem of Object.keys(options.deepWatch)){
                // @ts-ignore
                this.$addWatch(elem, typeof options.deepWatch[elem] === "object" ? {...options.deepWatch[elem], deep: true} : {handler: options.deepWatch[elem], deep: true});
            }
        }
    }

    $addData<Type>(name: string, data: Type) {
        this.$refs[name] = ref(data);
        this.$addComputed(name, {
            get: () => {
                return this.$refs[name].value;
            },
            set: (newValue: Type) => {
                this.$refs[name].value = newValue;
            }
        })
    }

    $addComputed(name: string, data: computedType) {
        if (typeof data === "function") { data = data.bind(this.$store) }
        else if (typeof data === "object") {
            data = {
                get: data.get.bind(this.$store),
                set: data.set.bind(this.$store)
            };
        }
        this[name] = createComputed(data);
    }

    $addMethod(name: string, data: (...args: any) => any) {
        this[name] = data.bind(this.$store);
    }

    $addWatch(name: string, data: watchType) {
        let options = undefined;
        if (typeof data === "function") {
            data = data.bind(this.$store);
        }
        else if (typeof data === "object") {
            let {handler, ...option} = data
            data = handler.bind(this.$store);
            options = option;
        }
        watch(this.$refs[name], data, options);
    }
}