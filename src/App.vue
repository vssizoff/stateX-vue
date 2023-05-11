<template>
<button @click="console.log(store.array.getArray())">get</button>
<button @click="store.array.addElem(elem++)">add</button>
<button @click="console.log(store.array.double)">double</button>
<button @click="console.log(store.array.a())">a</button>
{{store.test}}
<button @click="console.log(store)">a</button>
</template>

<script lang="ts">
export default {
  data() {
    return {
      console,
      elem: 0
    }
  }
}
</script>

<style lang="less">

</style>