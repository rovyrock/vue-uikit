<template>
  <span
    :class="classNames"
    v-text="text"
  ></span>
</template>

<script>
import mixinBase from "../mixins/base";
import mixinEmitter from "../mixins/emitter";
export default {
  name: "WeBadge",
  components: {
      
  },
  mixins: [mixinBase, mixinEmitter],
  props: {
    text: {
      type:[String, Number],
      default: undefined
    },
    withBorder: {
      type: Boolean,
      default: false
    },
  },
  computed:{
    pagePrefixCls(){
      return `${this.classPrefix}-badge`
    },
    classNames() {
      return [
        `${this.pagePrefixCls}`,
        `${typeof this.text==='undefined' ? `${this.pagePrefixCls}--dot` : ""}`,
        `${typeof this.text!=='undefined' && this.text.toString().length === 1 ? `${this.pagePrefixCls}--single` : ""}`,
        `${this.withBorder ? `${this.pagePrefixCls}--border` : ""}`,
      ];
    },
  }
};
</script>