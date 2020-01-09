<template>
  <i :class="classNames"></i>
</template>

<script>
import mixinBase from "../mixins/base";
import mixinEmitter from "../mixins/emitter";
export default {
  name: "WeIcon",
  components: {
      
  },
  mixins: [mixinBase, mixinEmitter],
  props: {
    name: {
      type: String,
    },
    size: String,
    //classExtra:[String, Number],
  },
  computed:{
    pagePrefixCls(){
      return `${this.classPrefix}-icon`
    },
    classNames() {
      return [
        `${this.pagePrefixCls}`,
        `${this.name ? `${this.pagePrefixCls}-${this.name}` : ""}`,
        `${this.size ? `${this.pagePrefixCls}--${this.size}` : ""}`,
        `${this.classExtra ? `${this.classExtra}` : ""}`
      ];
    },
  }
};
</script>