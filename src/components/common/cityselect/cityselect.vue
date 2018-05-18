<template>
    <div>
        <div class="mask-cityselect" v-show="show" @click.stop="close"></div>
        <div class="m-cityselect" :class="show ? 'cityselect-active' : ''">
            <div class="cityselect-header">
                <p class="cityselect-title">所在地区</p>
                <div v-show="ready" class="cityselect-nav">
                    <a href="javascript:;"
                       v-show="!!nav.txt1"
                       @click.stop="backoffView(0)"
                       :class="nav.index == 0 ? 'cityselect-nav-active' : ''">{{nav.txt1}}</a>
                    <a href="javascript:;"
                       v-show="!!nav.txt2"
                       @click.stop="backoffView(1)"
                       :class="nav.index == 1 ? 'cityselect-nav-active' : ''">{{nav.txt2}}</a>
                    <a href="javascript:;"
                       v-show="!!nav.txt3"
                       @click.stop="forwardView(true)"
                       :class="nav.index == 2 ? 'cityselect-nav-active' : ''">{{nav.txt3}}</a>
                </div>
            </div>
            <div v-show="!ready" class="cityselect-loading">加载中</div>
            <ul v-show="ready" class="cityselect-content" :class="activeClasses">
                <li class="cityselect-item" ref="provanceBox">
                    <div class="cityselect-item-box">
                        <a href="javascript:;"
                           :class="item.n == activeProvance ? 'cityselect-item-active' : ''"
                           v-for="item in citys"
                           @click.stop="chooseProvance(item.n, item.c)"
                        ><span>{{item.n}}</span></a>
                    </div>
                </li>
                <li class="cityselect-item" ref="cityBox">
                    <div class="cityselect-item-box">
                        <a href="javascript:;"
                           :class="item.n == activeCity ? 'cityselect-item-active' : ''"
                           v-for="item in cityArray"
                           @click.stop="chooseCity(item.n, item.a)"
                        ><span>{{item.n}}</span></a>
                    </div>
                </li>
                <li class="cityselect-item" ref="areaBox">
                    <div class="cityselect-item-box">
                        <a href="javascript:;"
                           :class="item == activeArea ? 'cityselect-item-active' : ''"
                           v-for="item in areaArray"
                           @click.stop="chooseArea(item)"
                        ><span>{{item}}</span></a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/babel">
    import {addClass, removeClass, getScrollview} from '@/global/msUtils'
    import Citys from './ydui.citys';

    export default {
        name: 'yd-cityselect',
        data() {
            return {
                citys: Citys,
                show: this.value,
                nav: {
                    index: 0,
                    txt1: '请选择',
                    txt2: '',
                    txt3: ''
                },
                activeProvance: '',
                activeCity: '',
                activeArea: '',
                cityArray: [],
                areaArray: [],
                activeClasses: '',
                itemHeight: 40
            }
        },
        props: {
            ready: {
                type: Boolean,
                default: true
            },
            provance: String,
            city: String,
            area: String,
            done: Function,
            value: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            value(val) {
                if (this.isIOS) {
                    if (val) {
                        addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    } else {
                        removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');
                    }
                }

                this.show = val;
            },
            ready(val) {
                val && setTimeout(this.init, 0);
            }
        },
        methods: {
            init() {
                if (!this.ready)return;

                this.setDefalutValue();
                this.scrollView = getScrollview(this.$el);

                this.isIOS = !!(window.navigator && window.navigator.userAgent || '').match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            },
            chooseProvance(name, datas) {
                this.nav.index = 1;
                this.nav.txt1 = this.activeProvance = name;
                this.nav.txt2 = '请选择';
                this.nav.txt3 = '';
                this.cityArray = datas;
                this.activeCity = '';
            },
            chooseCity(name, datas) {
                this.nav.txt2 = this.activeCity = name;
                this.activeArea = '';
                if (datas.length <= 0) {
                    this.returnValue();
                    return;
                }
                this.nav.txt3 = '请选择';
                this.areaArray = datas;
                this.forwardView(true);
            },
            chooseArea(name) {
                this.nav.txt3 = this.activeArea = name;
                this.returnValue();
            },
            setDefalutValue() {

                if (!this.provance)return;

                this.citys.every((item1, index1) => {

                    if (item1.n == this.provance) {

                        const provanceBox = this.$refs.provanceBox;
                        provanceBox.scrollTop = index1 * this.itemHeight - provanceBox.offsetHeight / 3;

                        this.nav.index = 1;
                        this.nav.txt1 = this.activeProvance = this.provance;
                        this.nav.txt2 = '请选择';

                        const _cityData = this.cityArray = item1.c;

                        _cityData.every((item2, index2) => {

                            if (item2.n == this.city) {

                                const cityBox = this.$refs.cityBox;
                                cityBox.scrollTop = index2 * this.itemHeight - cityBox.offsetHeight / 3;

                                this.nav.txt2 = this.activeCity = this.city;

                                const _areaData = this.areaArray = item2.a;

                                const index3 = _areaData.indexOf(this.area);

                                if (_areaData.length > 0) {
                                    this.nav.index = 2;
                                    this.nav.txt3 = '请选择';
                                    this.forwardView(false);
                                }

                                if (index3 > -1) {

                                    const areaBox = this.$refs.areaBox;
                                    areaBox.scrollTop = index3 * this.itemHeight - areaBox.offsetHeight / 3;

                                    this.nav.txt3 = this.activeArea = this.area;
                                }

                                return false;
                            }
                            return true;
                        });
                        return false;
                    }
                    return true;
                });
            },
            returnValue() {
                this.done({
                    provance: this.activeProvance,
                    city: this.activeCity,
                    area: this.activeArea
                });
                this.close();
            },
            close() {
                this.isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');

                this.$emit('input', false);
                this.show = false;
            },
            backoffView(index) {
                this.nav.index = index;
                this.activeClasses = 'cityselect-move-animate cityselect-prev';
            },
            forwardView(animate) {
                this.nav.index = 2;
                this.activeClasses = (animate ? 'cityselect-move-animate' : '') + ' cityselect-next';
            }
        },
        mounted() {
            this.init();
        },
        destroyed() {
            this.close();
        }
    }
</script>

<style lang="scss">
@import './../../../css/mixin.scss';
    .mask-cityselect {
        background-color: rgba(0,0,0,0.4);
        z-index: 499;
        position: fixed;
        @include pos();
    }

    .m-cityselect {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 6rem;
      background-color: #fff;
      z-index: 500;
      transform: translate(0, 100%);
      transition: transform .3s;
      &.cityselect-active {
        transform: translate(0, 0);
      }
    }

    .cityselect-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1;
      &:after {
        @include bottom-line(#e7e7e7);
      }
    }

    .cityselect-title {
      width: 100%;
      font-size: .3rem;
      text-align: center;
      height: 45px;
      line-height: 45px;
      position: relative;
      &:after {
        @include bottom-line(#dfdfdf);
      }
    }

    .cityselect-nav {
      width: 100%;
      padding-left: .2rem;
      overflow: hidden;
      display: flex;
      > a {
        font-size: .26rem;
        color: #222;
        display: block;
        height: 40px;
        line-height: 46px;
        padding: 0 .2rem;
        position: relative;
        margin-right: .15rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 40%;
        &.cityselect-nav-active {
          color: #F23030;
          &:after {
            content: '';
            width: 100%;
            height: 2px;
            background-color: #F23030;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 2;
          }
        }
      }
    }

    .cityselect-content {
      height: 100%;
      padding-top: 85px;
      width: 100%;
      display: flex;
      &.cityselect-move-animate {
        transition: transform .3s;
      }
      &.cityselect-next {
        transform: translate(-50%, 0);
      }
      &.cityselect-prev {
        transform: translate(0, 0);
      }
      > .cityselect-item {
        display: block;
        height: inherit;
        width: 50%; /* for old android */
        flex: 0 0 50%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #FFF;
        &::-webkit-scrollbar {
          width: 0;
        }
        &:nth-child(2n) {
          background-color: #F5F5F5;
        }
      }
    }

    .cityselect-item-box {
      width: 100%;
      height: inherit;
      display: block;
      padding: 0 .4rem;
      > a {
        color: #333;
        font-size: .26rem;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
        z-index: 1;
        &:before {
          @include bottom-line(#e7e7e7);
        }
        &:active {
          background: none; /* for firefox */
        }
        span {
          flex: 1;
          display: block;
        }
        &.cityselect-item-active {
          color: #F23030;
          &:after {
            display: block;
            content: '\E600';
            // font-family: @iconfont-inlay;
          }
        }
      }
    }

    .cityselect-loading {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .26rem;
      color: #999;
    }
</style>
