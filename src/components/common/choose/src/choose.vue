<template>
    <div class="m-tab">
        <ul class="tab-nav">
            <li class="tab-nav-item"
                v-for="item in navList"
                :class="item._uid == activeIndex ? 'tab-active' : ''"
                @click="changeHandler(item._uid, item.tabkey)">
                <a href="javascript:;">{{item.label}}</a>
            </li>
        </ul>
        <div class="tab-panel">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'yd-tab',
        data() {
            return {
                navList: [],
                activeIndex: 0
            }
        },
        props: {
            change: Function
        },
        methods: {
            init() {
                const tabPanels = this.$children.filter(item => item.$options.name === 'yd-tab-panel');

                let num = 0;

                tabPanels.forEach((panel) => {
                    this.navList.push({
                        label: panel.label,
                        _uid: panel._uid,
                        tabkey: panel.tabkey
                    });
                    if (panel.active) {
                        this.activeIndex = panel._uid;
                    } else {
                        ++num;
                        if (num >= tabPanels.length) this.activeIndex = tabPanels[0]._uid;
                    }
                });
            },
            changeHandler(uid, key) {
                // typeof this.change == 'function' && this.change(label);
                this.$emit('change',uid, key)
                this.activeIndex = uid;
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang="scss">
    @import '../../../../css/mixin.scss';
    .m-tab {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: scroll;
    }

    .tab-nav {
      background-color: #FFF;
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      height: 0.85rem;
      width: 100%;
      &:after {
        @include bottom-line(#585858, 3);
      }
    }

    .tab-nav-item {
      width: 1%;
      flex: 1;
      position: relative;
      text-align: center;
      color: #999;
      font-size: 0.28rem;
      line-height: 0.85rem;
      display: block;
      &.tab-active {
        color: $main-color;
      }
      background-color: #FFF;
      a {
        display: inherit;
        color: inherit;
      }
      &:not(:last-child):after {
        position: absolute;
        top: 35%;
        right: 0;
        content: '';
        width: 1px;
        height: 30%;
        transform: scaleX(.5);
        border-right: 1px solid #d9d9d9;
      }
      &.tab-active {
        color: $main-color;
        &:before {
          content: '';
          width: 70%;
          height: 2px;
          position: absolute;
          left: 50%;
          bottom: 0;
          margin-left: -35%;
          z-index: 4;
          background-color: $main-color;
        }
      }
    }

    .tab-panel {
      top: 0.85rem;
      left: 0;
      bottom: 0;
      width: 100%;
      position: absolute;
      overflow-y: scroll;
      overflow-x: hidden;
      background-color: #f0f0f0;
      .tab-panel-item {
        width: 100%;
        position: absolute;
        top: 0;
        transform: translateX(-100%);
        &.tab-active {
          position: relative;
          transition: transform .15s;
          transform: translateX(0);
          & ~ .tab-panel-item {
            transform: translateX(100%);
          }
        }
      }
    }

</style>
