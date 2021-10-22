<template>
  <span class="InputNumberSelect">
    <a-input-number
      type="text"
      :value="number"
      @change="handleNumberChange"
      style="width: 63%; margin-right: 2%"
    />
    <a-select :value="unit" style="width: 32%" @change="handleunitChange">
      <a-select-option
        v-for="item in options||[]"
        :key="item.value"
        :value="item.value"
        >{{ item.label }}</a-select-option
      >
    </a-select>
  </span>
</template>

<script>
export default {
  name: "YInputNumberSelect",
  props: ["value", "options"],
  data() {
    const value = this.value || {};
    return {
      number: value.number || 0,
      unit: value.unit || "",
    };
  },
  watch: {
    value(val = {}) {
      this.number = val.number || 0;
      this.unit = val.unit || "";
    },
  },
  mounted() {
  },
  methods: {
    handleNumberChange(value) {
      const number = parseInt(value || 0, 10);
      if (isNaN(number)) {
        return;
      }
      this.triggerChange({ number });
    },
    handleunitChange(unit) {
      this.triggerChange({ unit });
    },
    triggerChange(changedValue) {
      this.$emit("change", Object.assign({}, this.$data, changedValue));
    },
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>
