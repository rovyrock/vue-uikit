/*
 * @Author: grabbychen
 * @Date: 2019-05-15 12:53:03
 * @Description: 一些小工具集合
 */


/**
 * 读取属性值
 * @param {*} target            目标对象
 * @param {*} key               字段名
 * @param {*} defaultValue      默认值
 */
export function readProperty(target, key, defaultValue) {
  if (target && target.hasOwnProperty(key)) {
    return target[key] || defaultValue;
  }
  return defaultValue;
}
export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  }
  return (` ${el.className} `).indexOf(` ${cls} `) > -1;
}
export function addClass(el, cls) {
  if (!el) return;

  const classes = (cls || '').split(' ');
  let curClass = el.className;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ` ${clsName}`;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el, cls) {
  if (!el || !cls) return;
  const classes = cls.split(' ');
  let curClass = ` ${el.className} `;

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(` ${clsName} `, ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

export function findComponentUpward(context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = context.$parent;
  let { name } = parent.$options;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }

  return parent;
}

export function findComponentsUpward(context, componentName, components = []) {
  let parent = context.$parent;
  let { name } = parent.$options;

  while (parent && name) {
    if (componentName === name) {
      components.push(parent);
    }

    parent = parent.$parent;
    if (parent) {
      name = parent.$options.name;
    }
  }

  return components;
}

export function findComponentDownward(context, componentName) {
  const childrens = context.$children;
  let children;

  if (childrens.length) {
    childrens.forEach((child) => {
      if (child.$options.name === componentName) {
        children = child;
      }
    });

    for (let i = 0, len = childrens.length; i < len; i++) {
      const child = childrens[i];
      const { name } = child.$options;

      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }

  return children;
}

export function findComponentsDownward(context, componentName, components = []) {
  const childrens = context.$children;

  if (childrens.length) {
    childrens.forEach((child) => {
      const subChildren = child.$children;
      const { name } = child.$options;

      if (name === componentName) {
        components.push(child);
      }
      if (subChildren.length) {
        const findChildren = findComponentsDownward(child, componentName, components);
        if (findChildren) {
          components.concat(findChildren);
        }
      }
    });
  }

  return components;
}

export function isMobilePhone(str) {
  return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
}
export function isEmail(value) {
  const reg = new RegExp('^[A-Za-z0-9_-\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$');
  return reg.test(value);
}
export function isUrl(value) {
  const reg = new RegExp('(http|ftp|https):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?');
  reg.lastIndex = 0;
  return reg.test(value);
}

export function isArray(value) {
  if (!value) {
    return false
  }
  return Object.prototype.toString.call(value) === '[object Array]'
}
export function getElement (expr) {
  return (typeof expr === 'string') ? document.querySelector(expr) : expr
}

export function getComputedStyle (el, key) {
  var computedStyle = window.getComputedStyle(el)
  return computedStyle[key] || ''
}

// Easing Equations (c) 2003 Robert Penner, all rights reserved.
// Open source under the BSD License.
export function easeOutCubic (pos) {
  return (Math.pow((pos - 1), 3) + 1)
}

export function easeInOutCubic (pos) {
  if ((pos /= 0.5) < 1) {
    return 0.5 * Math.pow(pos, 3)
  }
  return 0.5 * (Math.pow((pos - 2), 3) + 2)
}

export function passiveSupported () {
  var passiveSupported = false
  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function () {
        passiveSupported = true
      }
    })
    window.addEventListener('test', null, options)
  } catch (err) {}
  return passiveSupported;
}

export function throttle (fn, delay, mustRunDelay = 0) {
  if (delay == null) return fn;
  /* istanbul ignore next */
  const timestampProvider =
    typeof performance === 'object' ? performance : Date;
  let timer = null;
  let tStart;
  return function () {
    const tCurr = timestampProvider.now();
    if (timer != null) clearTimeout(timer);
    if (!tStart) {
      tStart = tCurr;
    }
    if (mustRunDelay !== 0 && tCurr - tStart >= mustRunDelay) {
      fn.apply(this, arguments);
      tStart = tCurr;
    } else {
      const context = this;
      const args = [...arguments];
      timer = setTimeout(function () {
        timer = null;
        return fn.apply(context, args);
      }, delay);
    }
  };
}

export const PASSIVE_OPTS = (function () {
  let value = false;
  try {
    window.addEventListener('test', noop, {
      get passive() {
        value = true;
        return true;
      }
    });
    window.removeEventListener('test', noop);
  } catch (e) {
    /* istanbul ignore next */
    value = false;
  }
  return value && { passive: true };

  /* istanbul ignore next */
  function noop() {}
})();

export function create(prototype, properties) {
  const obj = Object.create(prototype);
  Object.assign(obj, properties);
  return obj;
}