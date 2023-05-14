<template>
  {{store.array.array}}
  <br>
  {{store.array.getArray()}}
  <br>
  {{store.array.double}}
  <br>
  <button @click="store.array.addElem(Math.random())">add</button>
  <button @click="store.array.a()">a</button>
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