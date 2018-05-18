<!-- <InfiniteScroll @onInfinite="loadMore()" ref="scroll">
    <div class="orderList"  slot="list">
        <div v-for='li in listData'></div>
    </div>
</InfiniteScroll> 
loadMore
无更多内容
this.$refs.scroll.$emit('loadedDone');

单次加载完成
this.$refs.scroll.$emit('finishLoad');
 -->
<style type="scss">
    .list-donetip,.list-loading{
        text-align: center;
        padding: 0.2rem 0;
    }
</style>
<template>
    <div>
        <slot name="list"></slot>

        <div class="list-donetip" v-show="!isLoading && isDone">
            <slot name="doneTip">没有更多数据了</slot>
        </div>

        <div class="list-loading" v-show="isLoading">
            <slot name="loadingTip">加载中</slot>
        </div>

        <div ref="tag" style="height: 1px;"></div>
    </div>
</template>

<script type="text/babel">
    import {getScrollview} from '@/global/msUtils';
    export default {
        name: 'yd-infinitescroll',
        data() {
            return {
                isLoading: false,
                isDone: false,
                num: 1
            }
        },
        props: {
            // onInfinite: {
            //     type: Function,
            //     required: true
            // },
            distance: {
                default: 0,
                validator(val) {
                    return /^\d*$/.test(val);
                }
            }
        },
        methods: {
            init() {
                this.scrollview = getScrollview(this.$el);
                this.scrollview.addEventListener('scroll', this.throttledCheck, false);
                this.$on('loadedDone', () => {
                    this.isLoading = false;
                    this.isDone = true;
                });
                this.$on('finishLoad', () => {
                    this.isLoading = false;
                });
                this.$on('reInit', () => {
                    this.isLoading = false;
                    this.isDone = false;
                });
            },
            scrollHandler() {
                if (this.isLoading || this.isDone)return;
                const scrollview = this.scrollview;
                const contentHeight = document.body.offsetHeight;
                const offsetTop = scrollview == window ? 0 : scrollview.getBoundingClientRect().top;
                if (!scrollview) {
                    console.warn('Can\'t find the scrollview!');
                    return;
                }
                if (!this.$refs.tag) {
                    console.warn('Can\'t find the refs.tag!');
                    return;
                }
                // let tag = getScrollview(this.$refs.tag)
                const tagOffsetTop = Math.floor(this.$refs.tag.getBoundingClientRect().top) - 1;
                const distance = !!this.distance && this.distance > 0 ? ~~this.distance : Math.floor(contentHeight / 10);
                if (tagOffsetTop > offsetTop && tagOffsetTop - (distance + offsetTop) * this.num <= contentHeight && tagOffsetTop - (distance + offsetTop) * this.num > 0) {
                    this.isLoading = true;
                    this.$emit('onInfinite')
                    // this.onInfinite();
                    this.num++;
                }
            },
            throttle(method, context) {
                clearTimeout(method.tId);
                method.tId = setTimeout(() => {
                    method.call(context);
                }, 50);
            },
            throttledCheck() {
                this.throttle(this.scrollHandler);
            }
        },
        mounted() {
            this.$nextTick(this.init);
        },
        destroyed() {
            this.scrollview.removeEventListener('scroll', this.throttledCheck);
        }
    }
</script>