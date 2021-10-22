<script>
import YInputNumberSelect from "../YInputNumberSelect";
import YRangeTimePicker from "../YRangeTimePicker";
import YInputSelect from "../YInputSelect";

export default {
  name: "YFormList",
  components: { YInputNumberSelect, YRangeTimePicker, YInputSelect },
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
    DetailData: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      form: null,
      hiddens: {},
      formData: {},
    };
  },
  computed: {},
  created() {
    this.form = this.$form.createForm(this, {
      // onFieldsChange: (props, fields) => {
      //   console.log("onFieldsChange", props, fields);
      // },
      onValuesChange: (props, values) => {
        this.formData = Object.assign(this.formData, values); // 缓存数据，做对比
        // this.setHiddens();
        this.$emit("onValuesChange", props, values);
      },
    });
    // 处理 hidden
    for (let key in this.FormListColumns) {
      let item = this.FormListColumns[key];
      this.formData[key] = item.options?.initialValue;
      if (this.isExpression(item.hidden)) {
        this.hiddens[key] = item.hidden;
      }
    }
  },
  beforeDestroy() {
    this.form?.resetFields();
  },
  methods: {
    setHiddens() {
      for (let key in this.hiddens) {
        let value = this.hiddens[key];
        let str = this.getRunString(value)[1];
        this.FormListColumns[key].hidden = this.evaluateString(
          str,
          this.formData
        );
      }
    },
    // 获取可运行的表达式
    getRunString(func) {
      const pattern = /^{{(.+)}}$/;
      return func.match(pattern);
    },
    // 代替eval的函数
    parseString(string) {
      Function('"use strict";return (' + string + ")")();
    },
    // 解析函数字符串值
    // formData 整个 form 的值
    evaluateString(string, formData) {
      return Function(`"use strict";
      const formData = ${JSON.stringify(formData)};
      return (${string})`)();
    },
    // 判断是否是“函数”
    // JSON无法使用函数值的参数，所以使用"{{...}}"来标记为函数
    isExpression(func) {
      if (typeof func !== "string") return false;
      // 这样的 pattern {{.....}}
      const pattern = /^{{(.+)}}$/;
      const reg1 = /^{{(function.+)}}$/;
      const reg2 = /^{{(.+=>.+)}}$/;
      if (
        typeof func === "string" &&
        func.match(pattern) &&
        !func.match(reg1) &&
        !func.match(reg2)
      ) {
        return true;
      }
      return false;
    },
    getFromValue(callback) {
      this.form?.validateFields((err, values) => {
        console.log(err, values);
        if (!err) {
          callback && callback(values);
        }
      });
    },
    setFromValue(values) {
      this.form?.setFieldsValue(values);
    },
    resetFromValue(values) {
      values instanceof Array
        ? this.form?.resetFields(values)
        : this.form?.resetFields();
    },
    checkHtml(htmlStr) {
      const reg = /<[^>]+>/g;
      return reg.test(htmlStr);
    },
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
      } else if (tag === "Tooltip") {
        const isHtml = this.checkHtml(afterProps.title);
        return (
          <a-tooltip placement={afterProps.placement || "top"}>
            <template slot="title">
              {isHtml ? (
                <div
                  {...{
                    domProps: {
                      innerHTML: afterProps.title,
                    },
                  }}
                ></div>
              ) : (
                afterProps.title
              )}
            </template>
            <a-icon
              class="myIcon"
              type={afterProps.type || "question-circle"}
            />
          </a-tooltip>
        );
      }
    },
    renderNodeItem(item) {
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
          val = val === 0 ? 0 : val || "--";
          val = item.options?.initialValue || item.value || val;
          return <span class="ant-form-text">{val}</span>;
        }
        case "Badge": {
          const statusMap = {
            已解决: "success",
            未解决: "error",
          };
          let val = item.key && this.DetailData && this.DetailData[item.key];
          nodeProps.text = val || nodeProps.text;
          nodeProps.status =
            (nodeProps.text && statusMap[nodeProps.text]) || "default";
          return (
            <a-badge
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            />
          );
        }
        case "Input":
          return (
            <a-input
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
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
        case "Cascader":
          return (
            <a-cascader
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            />
          );
        case "InputSelect":
          return (
            <y-input-select
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            />
          );
        default:
          return null;
      }
    },
    renderCol(item, index) {
      // 插槽渲染--处理自定义类型表单
      if (item.tag === 'Slot') return this.$scopedSlots?.default() || null
      const formItemProps = item.formItemProps;
      let hidden = item.hidden;
      if (this.isExpression(item.hidden)) {
        let str = this.getRunString(hidden)[1];
        hidden = this.evaluateString(str, this.formData);
      }
      return !hidden ? (
        <a-col span={item.colSpan || 24}>
          <a-form-item key={index + item.key} props={formItemProps}>
            <div class="myRow">
              {item.otherNode ? (
                <a-space>
                  {item.otherNode.map((otherItem) =>
                    this.renderNodeItem(otherItem)
                  )}
                </a-space>
              ) : (
                this.renderNodeItem(item)
              )}
              {item.afterProps && this.renderAfter(item.afterProps)}
            </div>
          </a-form-item>
        </a-col>
      ) : null;
    },
  },
  render() {
    return (
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
        </a-row>
      </a-form>
    );
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>
