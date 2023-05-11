import { createStoreModule } from "@/plugins/stateManager";
import StoreMain from "@/plugins/stateManager/storeMain";

export default createStoreModule({
    data: {
        array: ["test"]
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
    watch: {
        array(newValue: any): void {
            console.log(newValue);
        }
    }
});