import Vue from 'vue'
import Router from 'vue-router'
import cookie from '../lib/cookie.js'

const viewloader = (name) => () => import(`@/views/${name}/index.vue`)

Vue.use(Router)

let router =  new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/home/choice'
		},
		{
			path: '/home',
			name: 'home',
			component: viewloader('home'),
			meta:{
				require: true,
				tabbar: true,
				title: '首页'
			},
			children: [{
				path: '/home/attention',
				name: 'attention',
				component: viewloader('home/components/attention'),
				meta: {
					require: true,
					tabbar: true,
					title: '我的关注'
				}
			},{
				path: '/home/choice',
				name: 'choice',
				component: viewloader('home/components/choice'),
				meta: {
					tabbar: true,
					title: '精选'
				}
			},{
				path: '/home/tostart',
				name: 'tostart',
				component: viewloader('home/components/tostart'),
				meta: {
					tabbar: true,
					title: '即将开始'
				}
			}]
		},
		{
			path: '/login',
			name: 'login',
			component: viewloader('login'),
			meta: {
				title: '登陆'
			}
		},
		{
			path: '/release',
			name: 'release',
			component: viewloader('release'),
			meta:{
				title: '发布活动',
			},
			children: [{
				path: '/release/firstStep',
				name: 'firstStep',
				component: viewloader('release/components/firstStep'),
				meta:{
					title: '发布活动',
					require: true
				},
			},{
				path: '/release/secondStep',
				name: 'secondStep',
				component: viewloader('release/components/secondStep'),
				meta:{
					title: '发布活动',
					require: true
				},
			},{
				path: '/release/thirdStep',
				name: 'thirdStep',
				component: viewloader('release/components/thirdStep'),
				meta:{
					title: '发布活动',
					require: true
				},
			}]
		},
		{
			path: '/acmap',
			name: 'acmap',
			component: viewloader('acmap'),
			meta: {
				title: '地图'
			}
		},
		{
			path: '/ticket',
			name: 'ticket',
			component: viewloader('ticket'),
			meta: {
				title: '票券设置'
			}
		},
		{
			path: '/acdescription',
			name: 'acdescription',
			component: viewloader('acdescription'),
			meta: {
				title: '活动描述'
			}
		},
		{
			path: '/my',
			name: 'my',
			component :viewloader('my'),
			meta: {
				title: '我的',
				tabbar: true,
				require: true
			}
		},
		{
			path: '/activitydetails',
			name: 'activitydetails',
			component: viewloader('activitydetails'),
			meta: {
				title: '活动介绍'
			}
		},
		{
			path: '/fillinformation',
			name: 'fillinformation',
			component: viewloader('fillinformation'),
			meta: {
				title: '填写报名信息',
				require: true
			}
		},
		{
			path: '/order',
			name: 'order',
			component: viewloader('order'),
			meta: {
				title: '订单',
				require: true
			}
		},
		{
			path: '/blankpage',
			name: 'blankpage',
			component: viewloader('blankpage'),
			meta: {
				title: '一起玩'
			}
		},
		{
			path: '/userprotocol',
			name: 'userprotocol',
			component: viewloader('userprotocol'),
			meta: {
				title: '用户协议'
			}
		},
		{
			path: '/reviewstandard',
			name: 'reviewstandard',
			component: viewloader('reviewstandard'),
			meta: {
				title: '活动审核标准'
			}
		},
		{
			path: '/mycollection',
			name: 'mycollection',
			component: viewloader('mycollection'),
			meta: {
				title: '我的收藏',
				require: true
			}
		},
		{
			path: '/cooperation',
			name: 'cooperation',
			component: viewloader('cooperation'),
			meta: {
				title: '商务合作'
			}
		},
		{
			path: '/feedback',
			name: 'feedback',
			component: viewloader('feedback'),
			meta: {
				title: '意见反馈'
			}
		},
		{
			path: '/find',
			name: 'find',
			component: viewloader('find'),
			meta: {
				title: '发现'
			}
		},
		{
			path: '/mysignup',
			name: 'mysignup',
			component: viewloader('mysignup'),
			meta: {
				title: '我报名的',
				require: true
			}
		},
		{
			path: '/follow',
			name: 'follow',
			component: viewloader('follow'),
			meta: {
				title: '关注',
				require: true
			}
		},
		{
			path: '/income',
			name: 'income',
			component: viewloader('income'),
			meta: {
				title: '收入',
				require: true
			}
		},
		{
			path: '/withdrawrecord',
			name: 'withdrawrecord',
			component: viewloader('withdrawrecord'),
			meta: {
				title: '已提现',
				require: true
			}
		},
		{
			path: '/takecash',
			name: 'takecash',
			component: viewloader('takecash'),
			meta: {
				title: '提现',
				require: true
			}
		},
		{
			path: '/blankcard',
			name: 'blankcard',
			component: viewloader('blankcard'),
			meta: {
				title: '银行卡',
				require: true
			}
		},
		{
			path: '/myticket',
			name: 'myticket',
			component: viewloader('myticket'),
			meta: {
				title: '我的票券',
				require: true
			}
		},
		{
			path: '/ownerhomepage',
			name: 'ownerhomepage',
			component: viewloader('ownerhomepage'),
			meta: {
				title: '盟主主页',
				require: true
			}
		},
		{
			path: '/createtribe',
			name: 'createtribe',
			component: viewloader('createtribe'),
			meta: {
				title: '盟主部落',
				require: true
			}
		},
		{
			path: '/tribelist',
			name: 'tribelist',
			component: viewloader('tribelist'),
			meta: {
				title: '部落列表',
				require: true
			}
		},
		{
			path: '/ownerintroduction',
			name: 'ownerintroduction',
			component: viewloader('ownerintroduction'),
			meta: {
				title: '盟主介绍'
			}
		},
		{
			path: '/eventalbum',
			name: 'eventalbum',
			component: viewloader('eventalbum'),
			meta: {
				title: '相册',
				require: true
			}
		},
		{
			path: '/uploadphotos',
			name: 'uploadphotos',
			component: viewloader('uploadphotos'),
			meta: {
				title: '发布照片',
				require: true
			}
		},
		{
			path: '/ownertribe',
			name: 'ownertribe',
			component: viewloader('ownertribe'),
			meta: {
				title: '盟主部落',
				require: true
			}
    },
    {
      path: '/newhome',
      name: 'newhome',
      component: viewloader('newhome'),
      meta: {
        title: '新home',
        require: true
      }
    }
	]
})

router.beforeEach((to, from, next) => {
	if(to.meta.require){
		let useId = cookie.getCookie('userId');
		let openId = cookie.getCookie('openId');
		if(!useId && !openId){
			next({
				path: '/login',
				query: {redirect: to.fullPath}
			})
		}
	}
	if(to.meta.title){
		document.title = to.meta.title
	}
	next()
})

export default router
