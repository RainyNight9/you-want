<script>
import YInputNumberSelect from "../YInputNumberSelect";
import YRangeTimePicker from "../YRangeTimePicker";

export default {
  name: "YSearchForm",
  components: { YInputNumberSelect, YRangeTimePicker },
  props: {
    FormProps: {
      type: Object,
      required: false,
      default: () => {
        return {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        };
      },
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
      advancedFalseNum: 3, // 收起展示的个数
      offsetFlag: 0,
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
  mounted() {
    window.addEventListener("resize", this.handleResize);
    const clientW = document.documentElement.clientWidth;
    this.handleClientW(clientW);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    getListLength() {
      return this.FormListColumns instanceof Array
        ? this.FormListColumns.length
        : Object.keys(this.FormListColumns).length;
    },
    handleClientW(width) {
      const len = this.getListLength();
      if (width >= 1600) {
        this.advancedFalseNum = 3;
        this.offsetFlag = 4 - (len % 4) - 1;
      } else if (width >= 992) {
        this.advancedFalseNum = 2;
        this.offsetFlag = 3 - (len % 3) - 1;
      } else if (width >= 576) {
        this.advancedFalseNum = 1;
        this.offsetFlag = 0;
      } else {
        this.advancedFalseNum = len + 1;
        this.offsetFlag = 0;
      }
    },
    handleResize(e) {
      const e_width = e.target.innerWidth;
      this.handleClientW(e_width);
    },
    // 查询按钮
    queryClick() {
      this.form?.validateFields((err, values) => {
        // isInit = true
        if (!err) this.$emit("getFromData", values, true);
      });
    },
    // 获取表单数据
    getFromValue() {
      this.form?.validateFields((err, values) => {
        if (!err) this.$emit("getFromData", values);
      });
    },
    // 设置表单的数据值
    setFromValue(values = {}) {
      this.form?.setFieldsValue(values);
    },
    // 重置数据
    resetFromValue(values) {
      values instanceof Array
        ? this.form?.resetFields(values)
        : this.form?.resetFields();
    },
    // 特殊后部分UI处理
    renderAfter(afterProps) {
      const tag = afterProps.tag || afterProps.type; // 改参数，但是暂时兼容type
      if (tag === "Button") {
        return (
          <a-button class="node-btn" type="primary" onClick={afterProps.click}>
            {afterProps.label}
          </a-button>
        );
      } else if (tag === "Span") {
        return <span class="ant-form-text">{afterProps.label}</span>;
      }
    },
    // 收起 或 展开
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    // input 框回车键
    onPressEnterInput() {
      this.queryClick();
    },
    nodeItemRender(item) {
      // const item = this.item;
      if (!item.nodeProps) return null;
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
      switch (tag) {
        case "Span": {
          let val = item.key && this.DetailData && this.DetailData[item.key];
          val = val === 0 ? 0 : val || "";
          return <span class="ant-form-text">{item.value || val}</span>;
        }
        case "Input":
          return (
            <a-input
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
              onPressEnter={this.onPressEnterInput}
            />
          );
        case "RadioGroup":
          return (
            <a-radio-group
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
              onChange={(nodeProps && nodeProps.change) || defaultFun}
            ></a-radio-group>
          );
        case "DatePicker":
          return (
            <a-date-picker
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            />
          );
        case "Textarea":
          return (
            <a-textarea
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            />
          );
        case "Select":
          if (nodeProps.showSearch || nodeProps.mode === "multiple")
            nodeProps.suffixIcon = <a-icon type="search" />;
          return (
            <a-select
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
              onChange={(nodeProps && nodeProps.change) || defaultFun}
              onSearch={(nodeProps && nodeProps.search) || defaultFun}
              onDeselect={(nodeProps && nodeProps.deselect) || defaultFun}
            ></a-select>
          );
        case "InputNumber":
          return (
            <a-input-number
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
              style="width:100%"
            />
          );
        case "Switch":
          return (
            <a-switch
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            />
          );
        case "Slider":
          return (
            <a-slider
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            />
          );
        case "Rate":
          return (
            <a-rate
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            />
          );
        case "Upload":
          return (
            <a-upload
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            ></a-upload>
          );
        case "InputNumberSelect":
          return (
            <y-input-number-select
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            />
          );
        case "RangePicker":
          return (
            <a-range-picker
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
              style="width:100%"
            >
              <a-icon slot="suffixIcon" type="calendar" />
            </a-range-picker>
          );
        case "TimePicker":
          return (
            <a-time-picker
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            >
              <a-icon slot="suffixIcon" type="calendar" />
            </a-time-picker>
          );
        case "RangeTimePicker":
          return (
            <y-range-time-picker
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            />
          );
        case "AutoComplete":
          return (
            <a-auto-complete
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            />
          );
        default:
          return null;
      }
    },
    renderCol(item, index) {
      const formItemProps = item.formItemProps;
      const renderData = (
        <a-col xxl={6} lg={8} sm={12} xs={24}>
          <a-form-item key={index + item.key} props={formItemProps}>
            <div class="node-box">
              {this.nodeItemRender(item)}
              {item.afterProps && this.renderAfter(item.afterProps)}
            </div>
          </a-form-item>
        </a-col>
      );
      return !this.advanced && index >= this.advancedFalseNum
        ? null
        : renderData;
    },
  },
  render() {
    const len = this.getListLength();
    const offset = this.advanced ? this.offsetFlag : 0;
    const wrapperColSpan =
      (this.FormProps?.wrapperCol?.span || 0) +
        (this.FormProps?.labelCol?.span || 0) || 24;
    return (
      <div class="search-from">
        <a-form form={this.form} props={this.FormProps}>
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

            <a-col
              xxl={{ span: 6, offset: 6 * offset }}
              lg={{ span: 8, offset: 8 * offset }}
              sm={{ span: 12, offset: 0 }}
              xs={{ span: 24, offset: 0 }}
              class="btns-box"
            >
              <a-form-item
                wrapper-col={{
                  span: wrapperColSpan,
                  offset: 0,
                }}
              >
                <a-button onClick={this.queryClick} type="primary">
                  查询
                </a-button>
                <a-button onClick={this.resetFromValue} class="node-btn">
                  重置
                </a-button>
                {len > this.advancedFalseNum ? (
                  <a onClick={this.toggleAdvanced} class="node-btn">
                    {this.advanced ? "收起" : "展开"}
                    <a-icon type={this.advanced ? "up" : "down"} />
                  </a>
                ) : null}
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    );
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>
