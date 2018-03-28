<template>
	<div>
		<router-view></router-view>
		<mu-popup position="bottom" popupClass="Login-popup-bottom" :open="LoginBottom" @close="LoginBottomClose">
		    <mu-content-block class="Login-Bottom">
		    	<mu-flat-button  label="关闭" color="white" class="Login-Bottom-Close" @click="LoginBottomClose"/>
			   	<div class="Login-Bottom-Icon">
	                <img src="../assets/logo.png">
	            </div>
	            <mu-sub-header style="color:rgb(243, 255, 82);">系统检测您暂未登录，请输入手机号进行下一步操作！</mu-sub-header>
            	<mu-sub-header style="color:#ccc;">输入11位进入登录页，输入12位进入注册页！</mu-sub-header>
            	<mu-text-field iconClass="Phone-Input" v-model="PhoneNumber" type="number" icon="phone_iphone" labelFloat fullWidth/>
            	<mu-raised-button  label="下一步" @click="login" secondary fullWidth />
		    </mu-content-block>
  		</mu-popup>
  		<mu-snackbar v-if="toast" :message="indexToast" action="确定" @actionClick="hideSnackbar" @close="hideSnackbar"/>
		<mu-paper class="Bottom-Nav-Class">
			<mu-bottom-nav :value="bottomNav" @change="handleChange">
        <mu-bottom-nav-item value="home" title="主页" icon="home" to="/home" />
        <mu-bottom-nav-item value="exhibition" title="展集" icon="collections" to="/exhibition" />
        <mu-float-button icon="add" @click="publish"/>
        <mu-bottom-nav-item value="more" title="更多" icon="explore" to="more"  />
        <mu-bottom-nav-item value="user" title="我" icon="account_circle"/>
      </mu-bottom-nav>
    </mu-paper>
  	</div>
</template>

<script>
	export default{
		data() {
		    return {
		      bottomNav: 'home',
		      LoginBottom: false,
		      PhoneNumber: '',
		      toast: false,
		      indexToast: '',
		    }
		},
		created(){
			this.BottomActive();
		},

		watch: {
      		"$route": "BottomActive",
  		},
		methods:{
			handleChange (val) {
		        if(val === 'user'){
		            this.GoUser();
		        }else{
		            this.bottomNav = val
		        }
		    },
		    GoUser (){
		        if(!sessionStorage.getItem('isLogin')){
		            this.LoginBottom = true;
		        }else{
		            this.$router.push('/user');
		        }
		    },
		    login(){
		    	axios.get('/login?phone=' + this.PhoneNumber)
		        .then(res => {
		            if(res.status === 200){
		                sessionStorage.setItem("User_Data", JSON.stringify(res.data.data));
		            }
		        })


		        if(this.isPhoneNum()){
		        	this.indexToast = this.PhoneNumber == '13060751236' ? '欢迎回来，即将前往登录页' : '您还未注册，即将前往注册页';
		        	this.showSnackbar();
	                sessionStorage.setItem('PhoneNumber', JSON.stringify(this.PhoneNumber))
	                if(this.PhoneNumber == '13060751236'){
	                	setTimeout(() => { this.$router.push({path:'/loginregist',query:{login:1}});}, 2000)
	                }else{
	                	setTimeout(() => { this.$router.push({path:'/loginregist',query:{regist:1}});}, 2000)
	                }

		        }else{
		        	this.indexToast = '请输入正确手机号';
		        	this.showSnackbar();
		        }
		    },
			BottomActive(){
		        const routePath = this.$route.path;
		        this.bottomNav = (routePath === '/home' && 'home') || (routePath === '/exhibition' && 'exhibition') || (routePath === '/more' && 'more') || (routePath === '/user' && 'user')
		   },
		   LoginBottomClose(){
		   		this.LoginBottom = false;
		   },
		   LoginBottomOpen(){
		   		this.LoginBottom = true;
		   },
		   publish(){
         if(!sessionStorage.getItem('isLogin')){
           this.LoginBottomOpen()
         }else{
           this.$router.push('/publish')
         }
		   },
		   hideSnackbar(){
		   		this.toast = false;
		   		this.toastTimer && clearTimeout(this.toastTimer);
		   },
		   showSnackbar(){
		   		this.toast = true;
		   		this.toastTimer && clearTimeout(this.toastTimer);
		   		this.toastTimer = setTimeout(()=>{this.toast = false},2000)
		   },

		   isPhoneNum(){
		   		const mayReg1 = /^1[3|4|5|8][0-9]\d{4,8}$/;
		   		return mayReg1.test(this.PhoneNumber);
		   }
		}
	}

</script>

<style scoped lang="less">
	.Bottom-Nav-Class{
        position:fixed;
        width: 100%;
        bottom: 0;
        table-layout: fixed;
    }

    .mu-bottom-item-active .mu-buttom-item-wrapper .mu-bottom-item-icon,.mu-bottom-item-active .mu-buttom-item-wrapper .mu-bottom-item-text{
        color: #ff5252;
    }


    .Login-Bottom-Icon{
    	width:70px;
    	height:70px;
    	display: inline-block;
        margin:42px 7px 7px 7px;
    	border-radius:100px;
    	background-color:#fff;
    	border:2px solid #fff;
    	text-align: center;
    	img{
    		width:100%;
    	}
    }
</style>

<style lang="less">
	.Login-popup-bottom{
        margin-bottom: 56px;
        width:100%;
        background-color:#474a4f !important;
        .Login-Bottom{
        	text-align:center;
        	.Login-Bottom-Close{
	        	position:absolute;
	        	top:0;
	        	right:0;
	        }
	        .mu-sub-header{
	        	padding:0;
	        	line-height:32px;
	        }
	        .Phone-Input,.mu-text-field-input{
	        	color:#fff;
	        }
	        .Login-popup-bottom .Login-Bottom .mu-text-field-focus-line{
    			color:#fff;
    		}
        }
        .mu-bottom-item-active .mu-buttom-item-wrapper .mu-bottom-item-icon,.mu-bottom-item-active .mu-buttom-item-wrapper .mu-bottom-item-text{
        color: #ff5252;
    	}


    }


</style>
