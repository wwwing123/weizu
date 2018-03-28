<template>
	<div class="Login-Body">
		<mu-appbar class="Top-Class" titleClass="titleClass">
			{{pageText.title}}
            <mu-icon-button icon="keyboard_arrow_left" @click="RouterOne" />
        </mu-appbar>
        <div class="input-class">
         	<mu-paper class="userImg" circle :zDepth="3">
    			<mu-avatar v-if="this.$route.path === '/loginpassword'" :src="User_Datas.icon + User_Datas.id" />
    			<mu-avatar v-else src="http://image.heitem.com/20170831150415275915317.png"/>
  			</mu-paper>
  			<mu-sub-header v-show="pageText.welcome" style="color:#ff5252">{{pageText.welcome}}</mu-sub-header>
            <mu-sub-header style="color:#fff">{{pageText.welcome_Bottom}}</mu-sub-header>
            <router-view></router-view>
            <!--<mu-raised-button :label="pageText.loginBtn" class="demo-raised-button" secondary fullWidth/>-->

            <div v-if="this.$route.query.login" class="login">
            	<mu-text-field label="请输入您的密码" v-model="passwordValue" type="password" icon="lock_outline" labelFloat fullWidth/>
            	<mu-raised-button label="登录" class="demo-snackbar-button" @click="login" secondary fullWidth/>
            </div>
            <div v-else class="regist">
            	<div class="vcode">
            		<mu-text-field v-validate="'required|vcode'" name="Vcode" hintText="请输入您的验证码" v-model="Vcode" type="number " icon="phonelink_lock" hintTextClass="tip"   fullWidth/>
            		<mu-raised-button :label="VcodeLabel" class="getVcode" @click="getVcode" primary :disabled="isgetting"/>
            		<span v-show="errors.has('Vcode')" class="error">{{errors.first('Vcode')}}</span>
            	</div>
            	<div class="pwd">
            		<mu-text-field v-validate="'required|password'" name="pwd" hintText="请输入您的密码" v-model="pwd" type="password" icon="lock_outline" hintTextClass="tip" fullWidth/>
            		<span v-show="errors.has('pwd')" class="error">{{errors.first('pwd')}}</span>
            	</div>
            	<div class="pwdAgain">
            		<mu-text-field v-validate="'required|password'" name="pwdAgain"hintText="请再次输入您的密码" v-model="pwdAgain" type="password" icon="lock_outline" hintTextClass="tip" fullWidth/>
            		<span v-show="errors.has('pwdAgain')" class="error">{{errors.first('pwdAgain')}}</span>
            	</div>
            	<mu-raised-button @click="regist" :label="pageText.regist" class="registBtn" secondary fullWidth/>
            </div>
            <mu-dialog :open="dialog" :title="messageText" titleClass="dialog">
    			<mu-flat-button label="确定" slot="actions" primary @click="close"/>
  			</mu-dialog>
            <mu-snackbar v-if="toast" :message="messageText" action="确定" @actionClick="hideToast" @close="hideToast"/>
         </div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				User_Datas:{},
				PhoneValue:'',
				messageText:'',
				toast:false,
				dialog:false,
				Vcode:'',
				VcodeLabel:'获取验证码',
				VcodeCount:10,
				isgetting:false,
				pwd:'',
				pwdAgain:'',
				timer:''
			}
		},
		created(){
			this.User_Datas = JSON.parse(sessionStorage.getItem("User_Data"));
			this.PhoneValue = JSON.parse(sessionStorage.getItem("PhoneNumber"));
			if(this.$route.query.login){
				this.pageText = {
					title:'登录',
					welcome:`亲爱的${this.User_Datas.name}欢迎回来`,
					welcome_Bottom:`您的登录账号是:${this.PhoneValue}`,
					loginBtn:'下一步'
				}
			}else{
				this.pageText = {
					title:'注册',
					welcome:'您还未注册，请进行下一步操作',
					welcome_Bottom:`您的注册账号是:${this.PhoneValue}`,
					regist:'注册'
				}
			}
		},
		methods:{
			RouterOne(){
				this.$router.go(-1);
			},

			hideToast(){
				this.toast = false;
			},

			close(){
				this.dialog = false;
			},

			showToast(text){
				this.messageText = text;
				this.dialog = true;
			},
      		getVcode(){
      			let vcode = JSON.stringify(Math.floor(Math.random()*900000+100000));
      			sessionStorage.setItem("Vcode",vcode);
      			this.showToast(`验证码发送成功！您的验证码是${vcode}`);
      			this.isgetting = true;
      			this.VcodeCount = 10;
      			this.timer = setInterval(() => {
      				this.VcodeCount--;
      				this.VcodeLabel = this.VcodeCount+'秒后重试';
      				if(this.VcodeCount<=0 ){
      					this.VcodeLabel = '重新获取';
      					this.isgetting = false;
      					clearInterval(this.timer);
      				}
      			},1000)
      		},


			login(){
				if(this.passwordValue === '123123123'){
          this.$store.commit('updateLogin',1);
					this.toast = true;
					this.messageText = '登录成功！正在跳转到个人页……';
                  	this.toastTimer && clearTimeout(this.toastTimer);
					this.toastTimer = setTimeout(() => {this.toast = false;this.$router.push('/user');},3000);
				}else{
					this.showToast('密码错误，请重新输入!')
				}
			},
			regist(){
				if(this.pwd==='' || this.pwdAgain==='' || this.Vcode===''){
					this.showToast('请填写完成的信息！');
				}else if(this.errors.any()){
					this.showToast(this.errors.items[0].msg);
				}else if(this.Vcode !== sessionStorage.getItem('Vcode')){
					this.showToast('验证码错误，请重新输入！');
				}else if(this.pwd !== this.pwdAgain){
					this.showToast('两次密码不一样，请重新输入！');
				}else{
          this.$store.commit('LoginPhone',this.PhoneValue);
          this.$store.commit('updateLogin',1);
					this.toast = true;
					this.messageText = '注册成功！正在跳转到个人页……';
                  	this.toastTimer && clearTimeout(this.toastTimer);
					this.toastTimer = setTimeout(() => {this.toast = false;this.$router.push('/user');},3000);
				}

			}
		}


	}
</script>

<style lang="less">
.mu-text-field-content input{
        color: #fff;
    }
    .dialog{
    	font-size:12px;
    	text-align:center;
    }
    .tip{
    	text-align:left;
        font-size:12px;
    }

</style>
<style scoped lang="less">
	.Login-Body{
        background-color:#474a4f;
        height: 100vh;
        text-align:center;
        .titleClass{
        	font-size:16px;
        	position:relative;
        	.mu-icon-button{
        		position:absolute;
        		left:0;
        		top:4px;
        	}
        }
        .input-class{
        	text-align:center;
        	padding:0 0.7467rem;
        	.userImg{
        		width:100px;
        		height:100px;
        		margin:20px auto;
        		.mu-avatar{
        			width:100%;
        			height:100%;
        		}
        	}
        	.mu-sub-header{
        		padding:0;
        		line-height:36px;
        	}
        	.regist{
        		.vcode,.pwd,.pwdAgain{position:relative;}
        		.mu-text-field{
        			font-size:12px;
        			min-height:60px;
        		}
        		.getVcode{
        			position:absolute;
        			right:0;
        			top:8px;
        			height:25px;
        		}
        		.registBtn{
        			margin-top:25px;
        		}
        		.error{
        			display:block;
        			text-align:left;
        			font-size:14px;
        			color:#FF5252;
        			position:absolute;
        			left:1.4933rem;
        			top:40px;
        		}
        	}

        }
    }


</style>
