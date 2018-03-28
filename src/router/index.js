import Vue from 'vue'
import Router 			 from 'vue-router'
import HomeIndex     from '@/page/index'
import Home   			 from '@/page/home/Home'
import More          from '@/page/more/more'
import User          from '@/page/user/user'
import OthErs        from '@/page/others/others'
import exhibition    from '@/page/Exhibition/exhibition'
import Atlas         from '@/page/Exhibition/atlas'
import topic         from '@/page/Exhibition/topic'
import loginRegist   from '@/page/user/loginRegist'
import DiscoVer      from '@/page/more/discover'
import MoreLaBel     from '@/page/more/label'
import InforMation   from '@/page/more/information'
import RanKing       from '@/page/more/ranking'
import keyWord       from '@/page/user/keyword'
import BlackList     from '@/page/user/blacklist'
import ModifyData    from '@/page/user/modifydata'
import CellPhone     from '@/page/user/cellphone'
import Follow        from '@/page/user/follow'
import Power         from '@/page/user/power'
import UserIssUe     from '@/page/user/Userissue'
import DiscUss       from '@/page/user/discuss'
import Publish       from '@/page/publish/index'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect:{ path:'/home' },
      component: Home
    },
    {
    	path: '/',
    	name: '首页四栏',
    	component: HomeIndex,
    	children:[
    		{path: '/home',name: '主页', component: Home},
    		{path: '/more',name:'更多', component: More},
    		{path: '/user',name: '个人中心',component: User},
        {path: '/others/:name', name: '其他人的资料' ,component: OthErs},
        {path: '/exhibition', name: '展集',component: exhibition},
        {path: '/exhibition/atlas', name: '图集',component: Atlas},
    		{path: '/exhibition/topic', name: '本周话题',component: topic}
    	]
    },
    {path: '/loginregist',name:'登录注册',component:loginRegist},
    {path: '/more/discover',    name: '发现',        component: DiscoVer},
    {path: '/more/information', name: '收到的评论',   component: InforMation},
    {path: '/more/label',       name: '分类及标签',   component: MoreLaBel},
    {path: '/more/ranking',     name: '数据排行榜',   component: RanKing},
    {path: '/user/power',       name: '发布权限',    component: Power},
    {path: '/user/keyword',     name: '关键词过滤',  component: keyWord},
    {path: '/user/blacklist',   name: '黑名单',      component: BlackList},
    {path: '/user/modifydata',  name: '修改资料',    component: ModifyData},
    {path: '/user/cellphone',   name: '手机绑定',    component: CellPhone},
    {path: '/user/follow',      name: '关注的人',    component: Follow},
    {path: '/user/userissue',   name:'我相关的',     component: UserIssUe},
    {path: '/user/discuss',     name: '我的评论',    component: DiscUss},
    {path: '/publish',          name: '发布',       component: Publish},

  ]
})
