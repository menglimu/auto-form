<template>
    <article class="m-list" :class="classes">
        <slot></slot>
    </article>
</template>

<script type="text/babel">
    export default {
        name: 'yd-list',
        props: {
            theme: {
                validator(value){
                    return ['1', '2', '3', '4', '5'].indexOf(value + '') > -1;
                },
                default: '1'
            }
        },
        computed: {
            classes() {
                return 'list-theme' + this.theme;
            }
        }
    }
</script>

<style lang="scss">
    @import '../../../../css/mixin.scss';
    .m-list {
      overflow: hidden;
      position: relative;
      .list-item:active {
        background: none; /* for firefox */
      }
    }

    .list-img {
      height: 0;
      width: 100%;
      padding: 50% 0;
      overflow: hidden;
      img {
        width: 100%;
        margin-top: -50%;
        background-color: #FFF;
        border: none;
      }
    }

    .list-mes {
      background-color: #FFF;
      .list-title {
        color: #505050;
        font-size: .26rem;
        text-align: justify;
        font-weight: 800;
      }
      .list-other {
        overflow: hidden;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        color: #999;
      }
    }

    .list-price {
      font-size: .3rem;
      color: #EB5211;
      > em {
        font-size: .22rem;
      }
    }

    .list-del-price {
      padding-left: .06rem;
      font-size: .2rem;
      margin-left: .02rem;
      position: relative;
      color: #8C8C8C;
      text-decoration: line-through;
      // &:after {
      //   @include top-line(#8C8C8C);
      //   top: auto;
      //   bottom: 50%;
      // }
    }

    .list-theme1 {
      padding: 0 2px 0;
      .list-item {
        width: 50%;
        float: left;
        padding: 0 2px;
        margin-top: 4px;
        .list-mes {
          padding: .1rem;
          .list-title {
            @include text-overflow();
            height: .36rem;
          }
        }
      }
    }

    .list-theme2 {
      .list-item {
        width: 50%;
        float: left;
        padding-top: 4px;
        &:nth-child(odd) {
          padding-right: 2px;
        }
        &:nth-child(even) {
          padding-left: 2px;
        }
        .list-mes {
          padding: .1rem;
          .list-title {
            @include text-overflow();
            height: .36rem;
          }
        }
      }
    }

    .list-theme3 {
      .list-item {
        width: 50%;
        float: left;
        padding: .2rem;
        position: relative;
        z-index: 0;
        background-color: #FFF;
        &:before {
          @include bottom-line(#E3E3E3);
        }
        &:nth-child(odd):after {
          @include right-line(#E3E3E3);
        }
        .list-mes {
          padding-top: .1rem;
          .list-title {
            @include text-overflow();
            // height: .36rem;
          }
        }
        &:active {
          background: #FFF; /* for old android */
        }
      }
    }

    .list-theme4 {
      padding: 0 7px;
      background-color: #FFF;
      .list-item {
        overflow: hidden;
        display: flex;
        padding: 7px 0 8px 0;
        position: relative;
        &:not(:last-child):after {
          @include bottom-line(#E3E3E3);
        }
        .list-img {
          width: 2rem;
          padding: 1rem 0;
        }
        .list-mes {
          flex: 1;
          padding-left: 7px;
          .list-title {
            @include text-area-overflow(3, .38rem);
          }
          .list-other {
            padding-top: .1rem;
          }
        }
      }
    }

    .list-theme5 {
      background-color: #FFF;
      .list-item {
        display: block;
        position: relative;
        z-index: 1;
        padding: .2rem .2rem 0 .2rem;
        &:after {
          @include bottom-line(#E3E3E3);
        }
        .list-mes {
          padding: .2rem 0 .15rem;
          .list-other {
            padding-top: .06rem;
          }
        }
      }
    }

    
</style>
