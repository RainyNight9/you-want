<template>
  <div class="y-button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "y-button",
  props: {
    type: String,
  },
};
</script>

<style scoped>
.y-button {
  display: inline-block;
  padding: 3px 6px;
  background: #000;
  color: #fff;
}
</style>