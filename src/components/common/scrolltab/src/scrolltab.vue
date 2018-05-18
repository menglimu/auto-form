<template>
    <div class="m-scrolltab">
        <div class="scrolltab-nav">
            <a href="javascript:;" class="scrolltab-item"
               v-for="item in navList"
               :class="activeIndex == item._uid ? 'scrolltab-active' : ''"
               @click="moveHandler(item._uid)">
                <div class="scrolltab-icon"><i :class="item.icon"></i></div>
                <div class="scrolltab-title">{{item.label}}</div>
            </a>
        </div>
        <div class="scrolltab-content" ref="scrollView">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'scrolltab',
        data() {
            return {
                scrolling: false,
                navList: [],
                activeIndex: 0,
                timer: null
            }
        },
        methods: {
            init() {
                this.scrollView = this.$refs.scrollView;

                this.contentOffsetTop = this.scrollView.getBoundingClientRect().top;

                this.bindEvent();
            },
            addItem(panel) {
                this.navList.push(panel);
            },
            getPanels() {
                return this.$children.filter(item => item.$options.name === 'scrolltab-panel');
            },
            bindEvent() {
                this.scrollView.addEventListener('scroll', this.scrollHandler);
                window.addEventListener('resize', this.scrollHandler);
            },
            setDefault() {
                const panels = this.getPanels();

                let num = 0;
                panels.forEach((panel) => {
                    if (panel.active) {
                        this.activeIndex = panel._uid;
                        this.moveHandler(panel._uid);
                    } else {
                        ++num;
                        if (num >= panels.length)
                            this.activeIndex = panels[0]._uid;
                    }
                });
            },
            moveHandler(uid) {
                if (this.scrolling)return;
                this.scrolling = true;

                const panels = this.getPanels();
                const itemOffsetTop = panels.filter(item => item._uid == uid)[0].$el.getBoundingClientRect().top;

                this.scrollView.scrollTop = itemOffsetTop + this.scrollView.scrollTop - this.contentOffsetTop + 2;
                this.activeIndex = uid;

                setTimeout(() => {
                    this.scrolling = false;
                }, 6);
            },
            scrollHandler() {
                if (this.scrolling)return;

                const panels = this.getPanels();
                const panelsLength = panels.length;
                const scrollBox = this.scrollView;
                const scrollBoxHeight = scrollBox.offsetHeight;
                const scrollBoxTop = scrollBox.scrollTop;
                const panelItemHeight = panels[0].$el.offsetHeight;

                if (scrollBoxTop >= panelItemHeight * panelsLength - scrollBoxHeight) {
                    this.activeIndex = panels[panelsLength - 1]._uid;
                    return;
                }

                panels.forEach((panel) => {
                    if (panel.$el.getBoundingClientRect().top <= this.contentOffsetTop) {
                        this.activeIndex = panel._uid;
                    }
                });
            }
        },
        watch: {
            navList() {
                this.setDefault();
            }
        },
        mounted() {
            this.init();
        },
        destroyed() {
            this.scrollView.removeEventListener('scroll', this.scrollHandler);
            window.removeEventListener('resize', this.scrollHandler);
        }
    }
</script>

<style lang="scss">
    @import '../../../../css/mixin.scss';
    .m-scrolltab {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
    }

    .scrolltab-nav {
      height: 100%;
      background-color: #F5F5F5;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      position: relative;
      z-index: 1;
      &:after {
        @include right-line(#DFDFDF);
      }
    }

    .scrolltab-item {
      padding: 0 .3rem;
      height: 1rem;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 1;
      &.scrolltab-active {
        background-color: #FFF;
        &:before {
          @include right-line(#FFF);
        }
        &:active {
          background-color: #FFF;
        }
      }
      &:after {
        @include bottom-line(#DFDFDF);
      }
      &:before {
        @include right-line(#DFDFDF);
      }
      &:active {
        background: none; /* for firefox */
      }
    }

    .scrolltab-icon {
      margin-right: .2rem;
      font-size: .32rem;
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        height: .4rem;
        display: inline-block;
      }
    }

    .scrolltab-title {
      font-size: .3rem;
      color: #666;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 1.6rem;
    }

    .scrolltab-content {
      height: 100%;
      background-color: #FFF;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      flex: 1;
      padding: 0 .24rem .24rem .24rem;
      position: relative;
    }

    .scrolltab-content-title {
      font-size: .3rem;
      font-weight: normal;
      color: #555;
      display: block;
      padding-bottom: .1rem;
      padding-top: .32rem;
      margin-bottom: .2rem;
      position: relative;
      z-index: 1;
      &:after {
        @include bottom-line(#DFDFDF);
      }
    }

</style>
