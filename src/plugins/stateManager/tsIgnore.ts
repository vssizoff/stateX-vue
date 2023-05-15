import {computedType} from "./types";
import {computed, ComputedRef, WritableComputedRef} from "vue";

export function createComputed(data: computedType): ComputedRef | WritableComputedRef<any> {
    // @ts-ignore
    return computed(data);
}