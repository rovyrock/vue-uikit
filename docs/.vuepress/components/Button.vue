<template>
  <mwe-button @click="onClick">button</mwe-button>
</template>

<script>
export default {
  methods: {
    onClick (value) {
      alert('Component B has value: ' + value)
    }
  }
}
</script>
