/*
 * @Author: grabbychen
 * @Date: 2019-05-15 13:05:36
 * @Description: 路由页面切换效果（主要针对移动端，模拟APP左右滑出效果）
 */


export default {
  data() {
    return {
      routes: [],
      transition: '',
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transition = 'slide-left';
      } else {
        this.transition = 'slide-right';
      }
    },
  },
};
