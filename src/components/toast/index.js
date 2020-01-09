import Toast from "./toast.vue";

Toast.install = function(Vue) {
  Vue.component(Toast.name, Toast);
};

export default Toast;
