<template>
    <div class="m-textarea">
        <textarea class="textarea" v-model="mlstr"
                  :placeholder="placeholder"
                  :maxlength="maxlength"
                  :readonly="readonly"
        ></textarea>
        <div class="textarea-counter" v-if="showCounter && maxlength">{{num}}/{{maxlength}}</div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-textarea',
        data() {
            return {
                num: 0,
                mlstr: ''
            }
        },
        props: {
            maxlength: {
                validator(val) {
                    if(!val) return true;
                    return /^(([1-9]\d*)|0)$/.test(val);
                }
            },
            placeholder: {
                type: String
            },
            readonly: {
                type: Boolean,
                default: false
            },
            value: {
                type: String
            },
            showCounter: {
                type: Boolean,
                default: true
            },
            change: {
                type: Function
            }
        },
        watch: {
            mlstr(val) {
                this.$emit('input', val);
                typeof this.change == 'function' && this.change();
                if (this.showCounter) this.num = val.length;
            }
        },
        mounted() {
            this.$nextTick(() => {
                const v = this.value;
                if (!v)return;
                this.mlstr = v.length > this.maxlength ? v.substr(v, this.maxlength) : v;
            });
        }
    }
</script>

<style lang="scss">
    .m-textarea {
        padding: .2rem 0;
        background-color: #fff;
        width: 100%;
        textarea {
            border: none;
            width: 100%;
            display: block;
            height: 1.8rem;
            font-size: .3rem;
        }
        .textarea-counter {
            font-size: .32rem;
            color: #B2B2B2;
            text-align: right;
            padding-top: .06rem;
        }
    }

</style>
