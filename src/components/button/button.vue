<template>
  <a
    :class="classNames" 
    @click="handleClick"
  >
    <we-icon
      v-if="loading"
      name="loading"
      :size="size"
      :class="`${pagePrefixCls}-loading`"
    >
    </we-icon>
    <we-icon
      v-if="icon"
      :name="icon"
      :size="size"
      :class="`${pagePrefixCls}-icon`"
    >
    </we-icon>
    <span
      v-if="$slots.default"
      :class="`${pagePrefixCls}-text`"
    >
      <slot></slot>
    </span>
  </a>
</template>

<script>
import mixinBase from "../mixins/base";
import mixinEmitter from "../mixins/emitter";
import WeIcon from '../icon'
export default {
  name: "WeButton",
  components: {
    WeIcon
  },
  mixins: [mixinBase, mixinEmitter],
  props: {
    type: {
      type: String,
      // validator: val => ['default', 'primary','text'].indexOf(val) > -1
    },
    status:{
      type:String,
      validator: val => ['success', 'warning','error'].indexOf(val) > -1
    },
    size: {
      type:String,
      validator: val => ['s', 'xs','l','full'].indexOf(val) > -1
    },
    icon: String,
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    full:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: this.value
    };
  },
  computed:{
    pagePrefixCls(){
      return `${this.classPrefix}-button`
    },
    classNames() {
      return [
        `${this.pagePrefixCls}`,
        `${this.type ? `${this.pagePrefixCls}--${this.type}` : ""}`,
        `${this.status ? `${this.pagePrefixCls}--${this.status}` : ""}`,
        `${this.size ? `${this.pagePrefixCls}--${this.size}` : ""}`,
        `${this.ghost ? `${this.pagePrefixCls}--ghost` : ""}`,
        `${this.circle && !this.$slots.default ? `${this.pagePrefixCls}--circle` : ""}`,
        `${this.full ? `${this.pagePrefixCls}--full` : ""}`,
        `${this.disabled ? `${this.pagePrefixCls}--disabled` : ""}`,
      ];
    },
  },
  methods:{
    handleClick(evt) {
      if(!this.disabled){
        this.$emit("click", evt);
      }
    }
  },
};
</script>