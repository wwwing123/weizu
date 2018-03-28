<template>
	<div>
		<mu-appbar title="图集" class="Top-Class" titleClass="titleclass" style="text-align:center;">
            <mu-icon value="format_align_center"  slot="right" @click="toggle"/>
            <mu-icon value="keyboard_arrow_left"  slot="left" @click="RouterOne"/>
	    </mu-appbar>
	    <mu-popup position="top" popupClass="demo-popup-top" :open="open" @close="Close" :overlay="true" :overlayOpacity="0.3">
    		<mu-menu>
    			<mu-menu-item title="根据标签类别筛选" style="border-bottom: 1px solid #9e9e9e;">
    				<mu-icon  value="keyboard_arrow_right" slot="right" color="#fff" style="margin-right:5px;"/>
    			</mu-menu-item>
    			<mu-raised-button label="确定" class="top-munu-button" secondary />
                <mu-raised-button label="取消" class="top-munu-button" @click="toggle" />
    		</mu-menu>		
  		</mu-popup>
  		<!--<mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refreshImage"/>-->
  		<div class="gridlist-demo-container">			
		  	<mu-grid-list class="gridlist-demo">
		    	<mu-sub-header>图片展示</mu-sub-header>
		    		<mu-grid-tile v-for="item,index in img_Data" :key="item.title" titlePosition="bottom" actionPosition="left" :rows="item.featured ? 2 : 1" :cols="item.featured ? 2 : 1">
			      	<img v-lazy="item.url+item.id"/>
			      	<span slot="title">{{item.title}}</span>
			      	<span slot="subTitle">by <b>{{item.author}}</b></span>
			      	<mu-icon-button icon="star_border" slot="action"/>
			    </mu-grid-tile>
		  	</mu-grid-list>
		</div>
   </div>
</template>

<script>
	export default{
		data(){
			return{
				open:false,
				refreshing:true,
				img_Data:{},
				trigger:null
			}
		},
		mounted(){
			this.loadingImage();
		},
		methods:{
			loadingImage(){
				axios.get('/atlas/index')
	            .then(res => {
	                if(res.status === 200) {
	                    this.img_Data = res.data.data.list;
	                }
	            })
			},
			toggle(){
				this.open = !this.open;
			},
			Close(){
				this.open = false;
			},
			RouterOne(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang="less">
	.demo-popup-top{
		width:100%;
		position:fixed;
		top:56px;
		background-color:#474a4f;
		.mu-menu-item{
			color:#fff;
			font-size:14px;
		}
		.top-munu-button{
			width:40%;
			margin:14px 14px 0 14px;
		}
	}
</style>