<template>
  <mwe-button @click="onClick">button</mwe-button>
</template>

<script>
export default {
  methods: {
    onClick (value) {
      alert('you click the button : ' + value)
    }
  }
}
</script>
