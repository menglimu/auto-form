//import Vue from 'vue';

const  maskConstructor = Vue.extend(require('./popMask.vue'));
const  mask = new maskConstructor({
    el: document.createElement('div'),
  });
document.body.appendChild(mask.$el);

Vue.popMask = Vue.prototype.popMask = mask
// let removeDom = event => {
//   if (event.target.parentNode) {
//     event.target.parentNode.removeChild(event.target);
//   }
// };

// ToastConstructor.prototype.close = function() {
//   this.visible = false;
//   this.$el.addEventListener('transitionend', removeDom);
//   this.closed = true;
//   returnAnInstance(this);
// };

// let Toast = (options = {}) => {
//   let duration = options.duration || 3000;

//   let instance = getAnInstance();
//   instance.closed = false;
//   clearTimeout(instance.timer);
//   instance.message = typeof options === 'string' ? options : options.message;
//   instance.position = options.position || 'middle';
//   instance.className = options.className || '';
//   instance.iconClass = options.iconClass || '';


//   Vue.nextTick(function() {
//     instance.visible = true;
//     instance.$el.removeEventListener('transitionend', removeDom);
//     instance.timer = setTimeout(function() {
//       if (instance.closed) return;
//       instance.close();
//     }, duration);
//   });
//   return instance;
// };

// export default Toast;
