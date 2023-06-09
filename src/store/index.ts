import {bothTypeModules, createStore} from "@/plugins/stateManager";
import StoreMain from "@/plugins/stateManager/storeMain";
import array from "@/store/array";

export default createStore({
    modules: bothTypeModules({arr: array[1]}, [
        array
    ]),
    data: {
        test: 0
    },
    getters: {
        getTest(this: StoreMain) {
            return this.global.test.value;
        }
    },
    methods: {
        incrementTest(this: StoreMain) {
            this.global.test.value++;
            console.log(this.global.test.value);
            return this.global.test.value;
        }
    },
    computed: {
        test0: {
            get(this: StoreMain) {
                return this.global.test.value * this.global.test.value;
            },
            set(newValue) {
                console.log(newValue);
            }
        }
    },
    watch: {
        test(newValue: number) {
            console.log("Variable changed", newValue);
        }
    }
}, {
    defaultModuleName: "global"
});