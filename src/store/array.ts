import { createStoreModule } from "@/plugins/stateManager";
import StoreMain from "@/plugins/stateManager/storeMain";

export default createStoreModule({
    data: {
        array: ["test", 0, 8, "abcd"]
    },
    getters: {
        getArray(this: StoreMain): Array<any> {
            return this.array.array.value;
        }
    },
    mutations: {
        addElem(this: StoreMain, elem: any): void {
            this.array.array.value.push(elem);
        }
    },
    computed: {
        double(this: StoreMain): Array<any> {
            return [...this.array.array.value, ...this.array.array.value];
        }
    },
    methods: {
        a(this: StoreMain): Array<any> {
            this.array.array.value = this.array.double.value;
            return this.array.array.value;
        }
    },
    deepWatch: {
        array(newValue: Array<any>) {
            console.log("Variable changed", newValue[newValue.length - 1]);
            console.log(this);
        }
    }
}, "array");