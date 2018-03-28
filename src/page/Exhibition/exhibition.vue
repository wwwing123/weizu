<template>
	<div>
		<mu-appbar title="展集" class="mu-appbar-title"></mu-appbar>
		<div class="swiper-container" id="swiper">
		    <div class="swiper-wrapper">
		    	<div class="swiper-slide" v-for="item in swiper_data" :key="item.id">
		        	<p>by {{item.name}}</p>
		        	<p>{{item.title}}</p>
		        	<img :src="item.url+item.id"/>
		        	<mu-flat-button to="/exhibition/atlas"  class="demo-raised-button" labelPosition="before"  label="更多" icon="more_vert" primary/>
		        </div>
		    </div>
		    <div class="swiper-pagination"></div>
  		</div>
  		<div class="topic" @click="To_Potic">
  			<div>
  				<span class="content-left"></span>
  				<div class="content">
  					<mu-badge  content="本周话题" secondary  slot="after"/>
  					<p style="font-size: 1.1em;color:#fff;">#我和杭州有个约会！#</p>
                	<p style="color: #C9C9C9">我和杭州有个约会！我和杭州有个约会我和杭州有个约会</p>
  				</div>
  				<span class="content-right">
                	<mu-icon value="keyboard_arrow_right" />
            	</span>
  			</div>
  		</div>
  		<div class="topped">
  			<span class="topped-header">
  				<mu-icon value="whatshot" color="rgb(244,67,54)" style="margin-left:15px;vertical-align:middle;padding:10px 0;"/>热帖互动
  			</span>
  			<mu-divider />
  			<div class="topped-content" v-for="topped in Topped_Data" :key="topped.urlid">
  				<span class="topped-content-text">
                	{{topped.describe}}<mu-badge class="demo-badge-content">#{{topped.label}}</mu-badge>
            	</span>
	            <span class="topped-content-img">
	                <img v-lazy="topped.icon + topped.urlid" width="100%">
	            </span>
  			</div>
  		</div>
	</div>
</template>

<script>
	import Swiper from '../../../static/swiper/swiper-3.4.2.min.js';

	export default{
		data(){
			return{
				swiper_data:[],
				Topped_Data:{}
			}
		},
		created(){
			axios.get('Attlas')
		    .then(res => {
		      if(res.status === 200) {
		          this.swiper_data = res.data.data.list;
		          setTimeout(this.lunbo,0);
		      }
		    });
		    axios.get('exhibition/topped')
		    .then(res => {
		      if(res.status === 200) {
		          this.Topped_Data = res.data.data.list;
		      }
		    })
		},

		mounted(){

		},

		methods:{
			lunbo(){
					var swiper = new Swiper('#swiper',{
			      		effect: 'cube',
			      		grabCursor: true,
			      		paginationClickable: true,
					    pagination: '.swiper-pagination'
					})
			},
			To_Potic(){
				this.$router.push('/exhibition/topic');
			}
		}

	}
</script>

<style>
	@import url("../../../static/swiper/swiper-3.4.2.min.css");

	.mu-appbar-title{
		text-align: center;
	}
	.swiper-container{
      width:100%;
      background-color:#000;
      position:relative;
    }

    .swiper-slide p{
    	color:#fff;
    	font-size:16px;
    	text-align:center;
    	line-height:26px;
    }

    .swiper-slide .demo-raised-button{
    	position:absolute;
    	backface-visibility:hidden;
    	right:-20px;
    	top:0px;
    	color:#fff;
    }

    .swiper-slide .mu-raised-button-label{
    	padding:0;
    }

    .swiper-slide img{
    	display:block;
    	width:100%;
    }

    .topic{
    	margin-top:5px;
    	width:100%;
    	background:url('http://placeimg.com/828/196/any');

    }

    .topic>div{
    	display:flex;
    	width:100%;
    	background:rgba(0,0,0,.5);
    	height:98px;
    	padding:14px 10px 7px;
    }

    .topic .content-left{
    	width:1%;
    	background:#fff;
    	margin:0 15px;
    }

    .topic .content{
    	display:inline-block;
    	position:relative;
    }

    .topic .content .mu-badge-container{
    	position:absolute;
    	right:0;
    	top:0;
    }

   .topic  .mu-icon{
   		color:#fff;
   		line-height:70px;
   }

   .topped{
   		padding-bottom:56px;
   }

   .topped-content{
   		width: 100%;
	    padding: 1em;
	    display: flex;
	    border-bottom: 1px solid rgba(0,0,0,0.12);
   }

   .topped-content-text{
    	flex:3;
  	}

   .topped-content-img{
	    padding-left:10%;
	    flex:2;
   }

   .demo-badge-content{
      background-color: #ffab00;
      color: #ffffff;
      padding-left: 4px;
      padding-right: 4px;
  }
</style>
