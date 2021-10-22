<script>
export default {
  name: "SearchFrom",
  components: {},
  props: {
    FormProps: {
      type: Object,
      required: false,
      default: () => {},
    },
    FormListColumns: {
      type: [Array, Object],
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      form: null,
      advanced: true, // 展开收起
    };
  },
  computed: {},
  created() {
    this.form = this.$form.createForm(this, {
    onFieldsChange: (props, fields) => {
      console.log("onFieldsChange", props, fields);
    },
    onValuesChange: (props, values) => {
      this.$emit("onValuesChange", props, values);
    },
  });
  },
  methods: {
    queryClick() {
      this.form?.validateFields((err, values) => {
        if (!err) {
          this.$emit("getFromData", values);
        }
      });
    },
    // 设置表单的数据值
    setFromValue(values) {
      this.form?.setFieldsValue(values);
    },
    // 重置数据
    resetFromValue() {
      this.form?.resetFields();
    },
    // 特殊后部分UI处理
    renderAfter(afterProps) {
      const tag = afterProps.tag || afterProps.type; // 改参数，但是暂时兼容type
      if (tag === "Button") {
        return (
          <a-button class="myBtn" type="primary" onClick={afterProps.click}>
            {afterProps.label}
          </a-button>
        );
      } else if (tag === "Span") {
        return <span class="ant-form-text">{afterProps.label}</span>;
      }
    },
    // onValuesChange: (props, values) => {
    //   console.log("onValuesChange", this.$emit);
    //   this.$emit("onValuesChange", props, values);
    // },
    // 每一项渲染
    renderItem(item) {
      const nodeProps = item.nodeProps || {};
      const tag = item.tag || item.type; // 改参数，但是暂时兼容type
      // 常用属性设置 start
      // 设置 placeholder （没 自定义 用 默认）
      if (!nodeProps.placeholder) {
        const placeholderTypeOneList = ["Input", "Textarea", "InputNumber"];
        const placeholderTypeTwoList = ["RadioGroup", "DatePicker", "Select"];
        if (placeholderTypeOneList.includes(tag)) {
          nodeProps.placeholder = "请输入";
        } else if (placeholderTypeTwoList.includes(tag)) {
          nodeProps.placeholder = "请选择";
        }
      }
      // 设置 allowClear （默认为 true）
      nodeProps.allowClear = nodeProps.allowClear === false ? false : true;
      // 默认空事件，防止没有参数报错
      const defaultFun = () => {};
      // 常用属性设置 end
      if (tag === "Input") {
        return (
          <a-input
            v-decorator={[item.key, item.options || {}]}
            props={nodeProps}
          />
        );
      } else if (tag === "DatePicker") {
        return (
          <a-date-picker
            v-decorator={[item.key, item.options || {}]}
            props={nodeProps}
          />
        );
      } else if (tag === "Select") {
        return (
          <a-select
            v-decorator={[item.key, item.options || {}]}
            props={nodeProps}
            onChange={(nodeProps && nodeProps.change) || defaultFun}
            onSearch={(nodeProps && nodeProps.search) || defaultFun}
            onDeselect={(nodeProps && nodeProps.deselect) || defaultFun}
          ></a-select>
        );
      } else if (tag === "InputNumber") {
        return (
          <a-input-number
            v-decorator={[item.key, item.options || {}]}
            props={nodeProps}
            style="width: 100%"
          />
        );
      } else if (tag === "RangePicker") {
        return (
          <a-range-picker
            v-decorator={[item.key, item.options || {}]}
            props={nodeProps}
          >
            <a-icon slot="suffixIcon" type="calendar" />
          </a-range-picker>
        );
      }
    },
    // 收起 或 展开
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    renderCol(item, index) {
      const formItemProps = item.formItemProps;
      const renderData = (
        <a-col xxl={6} lg={8} sm={24}>
          <a-form-item key={index + item.key} props={formItemProps}>
            <div class="myRow">
              {this.renderItem(item)}
              {item.afterProps && this.renderAfter(item.afterProps)}
            </div>
          </a-form-item>
        </a-col>
      );
      if (!this.advanced) {
        return index < 3 ? renderData : null;
      } else {
        return renderData;
      }
    },
  },
  render() {
    let len
    if(this.FormListColumns instanceof Array) {
      len = this.FormListColumns.length
    }else{
      len = Object.keys(this.FormListColumns).length
    }
    return (
      <div
        class={
          this.advanced && len > 3 ? "search" : null
        }
      >
        <a-form form={this.form} props={this.FormProps}>
          <div
            class={
              this.advanced && len > 3 ? null : "fold"
            }
          >
            <a-row>
              {this.FormListColumns instanceof Array
                ? this.FormListColumns.map((item, index) =>
                    this.renderCol(item, index)
                  )
                : Object.keys(this.FormListColumns).map((key, index) => {
                    const item = this.FormListColumns[key];
                    item.key = key;
                    return this.renderCol(item, index);
                  })}
            </a-row>
          </div>
          {len > 0 ? (
            <span style="float: right; margin-top: 3px;">
              <a-button onClick={this.queryClick} type="primary">
                查询
              </a-button>
              <a-button onClick={this.resetFromValue} style="margin-left: 8px">
                重置
              </a-button>
              {len > 3 ? (
                <a onClick={this.toggleAdvanced} style="margin-left: 8px">
                  {this.advanced ? "收起" : "展开"}
                  <a-icon type={this.advanced ? "up" : "down"} />
                </a>
              ) : null}
            </span>
          ) : null}
        </a-form>
      </div>
    );
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>
