import Vue from 'vue';
import loadMask from './loadMask'
const  maskConstructor = Vue.extend(loadMask);
const  mask = new maskConstructor({
    el: document.createElement('div'),
  });
document.body.appendChild(mask.$el);


Vue.laodMask = Vue.prototype.laodMask = mask
