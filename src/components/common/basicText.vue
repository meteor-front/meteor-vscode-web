<template>
  <span>{{ text }}</span>
</template>
<script type="text/javascript">
export default {
  name: 'BasicText',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
