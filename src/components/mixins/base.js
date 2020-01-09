export default {
  props: {
    value: [String, Number],
    classExtra: [String, Number],
    classPrefix: {
      type: String,
      default: 'mwe',
    },
    isRem:{
      type:Boolean,
      default:true
    },
    rem2px:{
      type:[Number],
      default:16
    }
  },
  created() {
    // this.classPrefix = 'uikit';
    this.handleChangeEvent = false;
  },
  mounted() {

  },
  data() {
    return {
      uuid: this.createId(),
    };
  },
  watch: {
    value(newVal) {
      if (!this.handleChangeEvent) {
        this.$emit('on-change', newVal);
        this.$emit('input', newVal);
      }
    },
  },
  methods: {
    createId() {
      return Math.random().toString(36).substring(3, 8);
    },
  },
};
