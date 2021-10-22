<template>
  <a-space class="RangeTimePicker">
    <a-time-picker
      placeholder="开始时间"
      :value="startTime"
      :disabledHours="disStartHouse"
      :disabledMinutes="disStartMinute"
      :disabledSeconds="disStartSeconds"
      @change="startTimeChange"
      :format="format"
      :disabled="disabled"
      :hourStep="hourStep"
      :minuteStep="minuteStep"
      :secondStep="secondStep"
    >
      <a-icon slot="suffixIcon" type="calendar" />
    </a-time-picker>
    ~
    <a-time-picker
      placeholder="结束时间"
      :value="endTime"
      :disabledHours="disEndHouse"
      :disabledMinutes="disEndMinute"
      :disabledSeconds="disEndSeconds"
      @change="endTimeChange"
      :format="format"
      :disabled="disabled"
      :hourStep="hourStep"
      :minuteStep="minuteStep"
      :secondStep="secondStep"
    >
      <a-icon slot="suffixIcon" type="calendar" />
    </a-time-picker>
  </a-space>
</template>

<script>
import moment from "moment";

// 定义时间数组
const Hours = Array.from(Array(24), (v, k) => k);
const Minutes = Array.from(Array(60), (v, k) => k);
const Seconds = Array.from(Array(60), (v, k) => k);

export default {
  name: "YRangeTimePicker",
  props: [
    "value",
    "format",
    "disabled",
    "hourStep",
    "minuteStep",
    "secondStep",
  ],
  data() {
    const value = this.value || [];
    return {
      startTime: value[0] || moment("00:00:00", this.format || "HH:mm:ss"),
      endTime: value[1] || moment("23:59:59", this.format || "HH:mm:ss"),
    };
  },
  watch: {},
  mounted() {},
  methods: {
    startTimeChange(value) {
      this.startTime = value;
      this.triggerChange([value, this.endTime]);
    },
    endTimeChange(value) {
      this.endTime = value;
      this.triggerChange([this.startTime, value]);
    },
    triggerChange(changedValue) {
      this.$emit(
        "change",
        Object.assign([], [this.startTime, this.endTime], changedValue)
      );
    },
    // 结束时间控制-hour
    disEndHouse() {
      if (this.startTime) {
        let h = this.startTime.hour();
        return Hours.slice(0, h);
      }
      return [];
    },
    // 结束时间控制-minute
    disEndMinute(h) {
      if (this.startTime) {
        if (h > this.startTime.hour()) return [];
        let m = this.startTime.minute();
        return Minutes.slice(0, m);
      }
      return [];
    },
    // 结束时间控制-second
    disEndSeconds(h, m) {
      if (this.startTime) {
        if (h > this.startTime.hour()) return [];
        if (m > this.startTime.minute()) return [];
        let s = this.startTime.second();
        return Seconds.slice(0, s);
      }
      return [];
    },
    // 开始时间控制-hour
    disStartHouse() {
      if (this.endTime) {
        let h = this.endTime.hour();
        console.log(Hours)
        return Hours.slice(h, Hours.length);
      }
      return [];
    },
    // 开始时间控制-minute
    disStartMinute(h) {
      if (this.endTime) {
        if (h < this.endTime.hour()) return [];
        let m = this.endTime.minute();
        console.log(Minutes)
        return Minutes.slice(m, Minutes.length);
      }
      return [];
    },
    // 开始时间控制-second
    disStartSeconds(h, m) {
      if (this.endTime) {
        if (h < this.endTime.hour()) return [];
        if (m < this.endTime.minute()) return [];
        let s = this.endTime.second();
        return Seconds.slice(s, Seconds.length);
      }
      return [];
    },
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>
