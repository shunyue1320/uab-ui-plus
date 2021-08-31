
<template>
  <h2>home --- theme：{{ theme }}  -------- lang：{{ lang }}</h2>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps([ 'theme', 'lang' ])
const { theme, lang } = toRefs(props);

</script>

<style>

</style>
