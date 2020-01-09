<template>
  <div :class="`${pagePrefixCls}-warp`">
    <div
      v-show="isShowMask && show"
      :class="`${pagePrefixCls}-mask`"
    ></div>
    <transition :name="currentTransition">
      <div
        v-show="show"
        :class="classNames"
      >
        <div :class="`${pagePrefixCls}-inner`">
          <we-icon
            v-if="iconName"
            :name="iconName"
            :class-extra="`${pagePrefixCls}-icon`"
            size="l"
          ></we-icon>
          <h3
            v-if="title"
            :class="`${pagePrefixCls}-title`"
          >
            {{ title }}
          </h3>
          <div :class="`${pagePrefixCls}-desc`">
            <slot name="default">
              {{ text }}
            </slot>
          </div>
        </div>
        <a
          v-if="!autoClose || showClose"
          href="javascript:;"
          :class="`${pagePrefixCls}-close`"
          @click="hide"
        >
          <we-icon
            name="close"
            :class-extra="`${pagePrefixCls}-close-icon`"
          ></we-icon>
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
import mixinBase from "../mixins/base";
import mixinEmitter from "../mixins/emitter";
import WeIcon from "../icon";
export default {
  name: "WeToast",
  components: {
    WeIcon
  },
  mixins: [mixinBase, mixinEmitter],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: false
    },
    icon: String,
    title: String,
    text: String,
    transition: String,
    position: {
      type: String,
      default: "center",
      validator: val => ["top", "bottom", "center"].indexOf(val) > -1
    },
    time: {
      type: Number,
      default: 2000
    },
    isShowMask: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      validator: val => ["success", "warning", "error"].indexOf(val) > -1
    },
    width: {
      type: String,
      default: ""
    },
    success: {
      type: Function,
      default: () => () => {}
    },
    fail: {
      type: Function,
      default: () => () => {}
    },
    complete: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      show: this.value
    };
  },
  computed: {
    pagePrefixCls() {
      return `${this.classPrefix}-toast`;
    },
    iconName() {
      const classArr = {
        success: "success",
        error: "error",
        warning: "warning"
      };
      return this.icon ? this.icon : this.status ? classArr[this.status] : "";
    },
    classNames() {
      return [
        `${this.pagePrefixCls}`,
        `${this.status ? `${this.pagePrefixCls}--${this.status}` : ""}`,
        `${this.position ? `${this.pagePrefixCls}--${this.position}` : ""}`
      ];
    },
    currentTransition() {
      if (this.transition) {
        return this.transition;
      }
      if (this.position === "top") {
        return "toast-slide-from-top";
      }
      if (this.position === "bottom") {
        return "toast-slide-from-bottom";
      }
      return "toast-fade";
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$emit("input", true);
        this.$emit("on-show");
        this.success({ errMsg: "showToast:ok" });
        //this.fixSafariOverflowScrolling('auto')
        if (this.autoClose) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.show = false;
            this.$emit("input", false);
            this.$emit("on-hide");
            //this.fixSafariOverflowScrolling('touch')
          }, this.time);
        }
      } else {
        this.complete({ errMsg: "showToast:complete" });
      }
    },
    value(val) {
      this.show = val;
    }
  },
  created() {
    if (this.value) {
      this.show = true;
    }
    console.log(this.iconName);
  },
  mounted(){
    this.$nextTick(() => {
      if (this.autoClose) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.show = false;
          this.$emit("input", false);
          this.$emit("on-hide");
        }, this.time);
      }
    });
  },
  methods: {
    hide() {
      this.show = false;
      this.$emit("input", false);
      this.$emit("on-hide");
    }
  }
};
</script>
