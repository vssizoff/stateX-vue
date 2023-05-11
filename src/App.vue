<template>
  {{store.global.test}}
  <button @click="store.global.incrementTest()">increment</button>
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