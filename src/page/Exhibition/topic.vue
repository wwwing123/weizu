<template>
	<div>
		<div class="topic">
			<mu-icon-button icon="keyboard_arrow_left" class="Top-Class"  @click="RouterOne"/>
			<span style="font-size:16px;color:#fff"># 我和杭州有个约会 #</span>
			<span style="color:#9e9e9e">我和杭州有个约会我和杭州有个约会我和杭州有个约会我和杭州有个约会</span>
		</div>
		<div class="list">
			<mu-sub-header>{{data_num}}条互动</mu-sub-header>
			<mu-divider />
			<mu-list>
	    		<mu-list-item :title="item.name" v-for="item in topic_data" :key="item.urlid">
	    			<mu-avatar :src="item.icon+item.urlid" slot="leftAvatar"/>
	      			<span class="describe" slot="describe">{{item.describe}}</span>
	    		</mu-list-item>
    		</mu-list>
		</div>
	</div>
      		
</template>

<script>
	export default{
		data(){
			return{
				topic_data:{},
				data_num:''
			}
		},
		created(){
			axios.get('exhibition/topic')
			.then(res=>{
				if(res.status == 200){
					this.topic_data = res.data.data.list;
					this.data_num = this.topic_data.length;
				}
			})
		},
		methods:{
			RouterOne(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang="less">
	.topic{
		position:relative;
		width:100%;
		height:172px;
		padding:14px;
		padding-top:40px;
		background-image:url('http://placeimg.com/828/414/any');
		.Top-Class{
			position:absolute;
			left:0;
			top:0;
			color:#fff;
		}
		span{
			display:block;
			margin-top:20px;
		}
	}
</style>