<script>
import InputNumberSelect from "./components/InputNumberSelect";

export default {
  name: "FormList",
  components: { InputNumberSelect },
  props: {
    FormProps: {
      type: Object,
      required: false,
      default: () => {},
    },
    FormListColumns: {
      type: [Array, Object],
      required: false,
      default: () => [],
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
    };
  },
  computed: {},
  created() {
    this.form = this.$form.createForm(this, {
      onFieldsChange: (props, fields) => {
        console.log("onFieldsChange", props, fields);
      },
      onValuesChange: (props, values) => {
        console.log("onValuesChange", props, values);
        this.$emit("onValuesChange", props, values);
      },
    });
    // 处理 hidden
    // this.Columns = this.FormListColumns.map(item=>{
    //   if(item.hidden && this.isExpression(item.hidden)) {
    //     this.hiddens[item.key] = this.getRunString(item.hidden)
    //   }
    // })
    // this.isExpression("{{console.log(1==true)}}");
    // console.log(this.isExpression("{{console.log(1==true)}}"));
  },
  beforeDestroy() {
    this.form?.resetFields();
  },
  methods: {
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
      Function(`"use strict";
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
        console.log(values)
        if (!err) {
          callback && callback(values);
        }
      });
    },
    setFromValue(values) {
      this.form?.setFieldsValue(values);
    },
    resetFromValue() {
      this.form?.resetFields();
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
        return (
          <a-tooltip
            title={afterProps.title}
            placement={afterProps.placement || "top"}
          >
            <a-icon
              class="myIcon"
              type={afterProps.type || "question-circle"}
            />
          </a-tooltip>
        );
      }
    },
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
            <input-number-select
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
            />
          );
        case "RangePicker":
          return (
            <a-range-picker
              v-decorator={[item.key, item.options || {}]}
              props={nodeProps}
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
        default:
          return null;
      }
    },
    renderCol(item, index) {
      const formItemProps = item.formItemProps;
      return !item.hidden ? (
        <a-col span={item.colSpan || 24}>
          <a-form-item key={index + item.key} props={formItemProps}>
            <div class="myRow">
              {item.otherNode
                ? item.otherNode.map((otherItem) => this.renderItem(otherItem))
                : this.renderItem(item)}
              {item.afterProps && this.renderAfter(item.afterProps)}
            </div>
          </a-form-item>
        </a-col>
      ) : null;
    },
  },
  render(h, context) {
    console.log(h, context);
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
