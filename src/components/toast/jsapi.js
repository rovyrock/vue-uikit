import Vue from "vue";
import toastVue from "./toast.vue";

// vNode的支持，todo
/*eslint no-prototype-builtins: "error"*/
const defaultOption = {
  title: "", //	标题
  text: "", //	内容部分
  position: "center", //显示位置，可选['top', 'center', 'button']
  time: 2000, //显示时间
  showClose: false, //是否显示关闭
  isShowMask: false, //是否显示蒙层
  icon: "", //fonticon图标名
  status: "", //状态类，可选['success', 'warning', 'error']
  success: function () { }, //接口调用成功的回调函数
  fail: function () { }, //接口调用失败的回调函数
  complete: function () { },//接口调用结束的回调函数（调用成功、失败都会执行）
};
let currentToast, instance;
let toastQueue = [];

const ToastConstructor = Vue.extend(toastVue);

const initInstance = () => {
    //挂载在新的div
  instance = new ToastConstructor({
    el: document.createElement("div")
  });
};

const showNextToast = () => {
  if (!instance) {
    initInstance();
  }
  instance.action = "";

  if (!instance.show) {
    if (toastQueue.length > 0) {
      currentToast = toastQueue.shift();

      let options = currentToast.options;
      for (let prop in options) {
                // if(options.hasOwnProperty.call(obj, prop)){
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      document.body.appendChild(instance.$el);

      Vue.nextTick(() => {
        instance.show = true;
      });
    }
  }
};

function ToastApi(options, callback) {
  if (typeof Promise !== "undefined") {
    return new Promise((resolve, reject) => {
      toastQueue.push({
        options: Object.assign(defaultOption, options),
        resolve: resolve,
        reject: reject
      });

      showNextToast();
    });
  } else {
    toastQueue.push({
      options: Object.assign(defaultOption, options)
    });

    showNextToast();
  }
}

ToastApi.show = options => {
  return ToastApi(Object.assign(defaultOption, options));
};

export default ToastApi;
export { ToastApi };
