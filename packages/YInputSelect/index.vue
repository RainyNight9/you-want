<template>
  <span class="InputSelect">
    <a-input
      :value="inputValue"
      @change="handleinputValueChange"
      style="width: 25%; margin-right: 2%"
    />
    <a-select :value="selectValue" style="width: 72%" @change="handleselectValueChange">
      <a-select-option
        v-for="item in options || []"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </a-select-option>
    </a-select>
  </span>
</template>

<script>
export default {
  name: "YInputSelect",
  props: ["value", "options"],
  data() {
    const value = this.value || {};
    return {
      inputValue: value.inputValue || "",
      selectValue: value.selectValue || "",
    };
  },
  watch: {
    value(val = {}) {
      this.inputValue = val.inputValue || "";
      this.selectValue = val.selectValue || "";
    },
  },
  mounted() {},
  methods: {
    handleinputValueChange(e) {
      this.triggerChange({ inputValue: e.target.value });
    },
    handleselectValueChange(selectValue) {
      this.triggerChange({ selectValue });
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
