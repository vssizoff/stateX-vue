import {createStore} from "@/plugins/stateManager";
import StoreMain from "@/plugins/stateManager/storeMain";
import array from "@/store/array";

export default createStore({
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
        test0(this: StoreMain) {
            return this.global.test.value * this.global.test.value;
        }
    },
    modules: {
        array
    }
}, {
    defaultModuleName: "global"
});