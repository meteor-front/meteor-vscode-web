<template>
  <img :src="src" alt="">
</template>
<script type="text/javascript">
export default {
  name: 'BasicPage',
  props: {
    src: {
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
