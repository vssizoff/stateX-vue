<template>
  {{store.array.array}}
  <br>
  {{store.array.getArray()}}
  <br>
  {{store.array.double}}
  <br>
  <button @click="store.array.addElem(Math.random())">add</button>
  <button @click="store.array.a()">a</button>
  <br>
  {{store.arr.array}}
  <br>
  {{store.arr.getArray()}}
  <br>
  {{store.arr.double}}
  <br>
  <button @click="store.arr.addElem(Math.random())">add</button>
  <button @click="store.arr.a()">a</button>
  <br>
  <button @click="store.global.test0 = Math.random()">test0</button>
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