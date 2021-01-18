<template>
    <div class="seller" ref="sellerWrapper">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc  border-bottom-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">{{seller.ratingCount}}</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favoriate">
                    <span class="icon icon-favorite" :class="{'active': favoriate}" @click="toggleFavoriate"></span>
                    <span class="text" :class="{'active': favoriate}">{{favoriateText}}</span>
                </div>
            </div> 
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item" v-for="(item,i) in seller.supports" :key="i">
                        <span class="icon" :class="classMap[seller.supports[i].type]"></span>
                        <span class="text">{{seller.supports[i].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picListWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
                            <img :src="pic" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="infos-wrapper">
                <h1 class="title border-bottom-1px">商家信息</h1>
                <div class="infos" v-if="seller.infos">
                    <ul>
                        <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import {saveToLocal, loadFormLocal} from '@/common/js/util';
    import BScroll from 'better-scroll';
    import star from '@/components/star/star'
    import split from './../split/split';

    export default {
        
        props: {
            seller: {
                type : Object
            }
        },
        data() {
            return{
                favoriate : (() => {
                    return loadFormLocal(this.seller.id, 'favoriate', false)
                })()
            }
        },
        created() {
			this.classMap = ['decrease','discount','special','invoice','guarantee']
        },
        computed: {
            favoriateText(){
                return this.favoriate ? '已收藏' : '收藏'
            }
        },
        watch: {
            'seller'() {
                this.$nextTick(() => {
                    this._initScroll();
                    this._initPicList();
                })
                
            }
        },
        methods: {
            toggleFavoriate() {
                this.favoriate = !this.favoriate;
                saveToLocal(this.seller.id, 'favoriate', this.favoriate);
            },
            _initScroll() {
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.sellerWrapper,{
                        click : true
                    });
                }else{
                    this.scroll.refresh();
                }
            },
            _initPicList() {
                if(this.seller.pics){
                    let picList = this.$refs.picList;
                    let length = this.$refs.picList.getElementsByClassName("pic-item").length;
                    let width = 120;
                    let Mr = 6;
                    picList.style.width = (width + Mr) * length - Mr + 'px'; 
                    if(!this.pics){
                        this.pics = new BScroll(this.$refs.picListWrapper,{
                            scrollX : true,
                            eventPassthrough : 'vertical'
                        })
                    }else{
                        this.pics.refresh();
                    }
                }
            }
        },
        mounted() {
            this._initScroll();
            this._initPicList();
        },
        components: {
            star,
            split
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin"
    .seller
        position: absolute
        left: 0
        top: 174px 
        bottom: 0
        width: 100%
        overflow: hidden
        .overview
            position: relative
            padding: 18px
            .title
                margin-bottom: 8px
                line-height: 14px
                color: rgb(7,17,27)
                font-size: 14px
            .desc
                padding-bottom: 18px
                border-bottom-1px(rgba(7,17,27,0.1))
                font-size: 0
                .star
                    display: inline-block
                    margin-right: 8px
                    vertical-align: top
                .text
                    display: inline-block
                    margin-right: 12px
                    line-height: 18px
                    vertical-align: top
                    font-size: 10px
                    color: rgb(77,85,93)
            .remark
                display: flex
                padding-top: 18px
                .block
                    flex: 1
                    text-align: center
                    border-right: 1px solid rgba(7,17,27,0.1)
                    &:last-child
                        border-none()
                    h2
                        margin-bottom: 4px
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147,153,159)
                    .content
                        line-height: 24px
                        font-size: 10px
                        color: rgb(7,17,27)
                        .stress
                            font-size: 20px
            .favoriate
                position: absolute 
                width: 50px
                top: 18px
                right: 11px
                text-align: center
                .icon-favorite
                    display: block
                    margin-bottom: 4px
                    line-height: 24px
                    font-size: 24px
                    color: #d4d6d9
                    &.active
                        color:rgb(240,20,20)
                .text
                    font-size: 10px
                    line-height: 18px
                    color: #93999f
                    &.active
                        color: #4d555d

        .bulletin
            padding: 18px 18px 0 18px
            .title
                margin-bottom: 8px
                line-height: 14px
                color: rgb(7,17,27)
                font-size: 14px
            .content-wrapper
                padding: 0 12px 16px 12px
                color: rgba(7,17,27,0.1)
                .content
                    line-height: 24px
                    font-size: 12px
                    color: rgb(240,20,20)
            .supports
                .support-item
                    padding: 16px 12px
                    border-bottom-1px(rgba(7,17,27,0.1))
                    font-size: 0
                    &:last-child
                        border-none()
                .icon
                    display: inline-block
                    width: 16px
                    height: 16px
                    vertical-align: top
                    margin-right: 6px
                    background-size: 16px 16px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image("decrease_4")
                    &.discount
                        bg-image("discount_4")
                    &.guarantee
                        bg-image("guarantee_4")
                    &.invoice
                        bg-image("invoice_4")
                    &.special
                        bg-image("special_4")
                .text
                    line-height: 16px
                    font-size: 12px
                    color: rgb(7,17,27)

        .pics
            padding: 18px
            .title
                margin-bottom: 12px
                line-height: 14px
                color: rgb(7,17,27)
                font-size: 14px
            .pic-wrapper
                width: 100%
                overflow: hidden
                white-space: nowrap 
                .pic-list
                    font-size: 0
                    .pic-item
                        display: inline-block
                        margin-right: 6px
                        width: 120px
                        height: 90px
                        &:last-child
                            margin-right: 0
        .infos-wrapper
            padding: 18px 18px 0 18px;
            .infos
                margin-top: 12px
                li 
                    border-top-1px(rgba(7,17,27,0.1))
                    line-height: 16px
                    padding: 16px 12px
                    font-size: 12px
                    color: rgb(7,17,27)

</style>