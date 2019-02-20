import {get, post} from './config.js';

//图片上传
export const uploadImg = data => post('/api/file/upFileImg', data);

//获取活动类型列表
export const getProductCatalogList = () => get("/api/product/getProductCatalogList");

//图片验证码
export const checkCodeQuick = (param) => post('/api/user/checkCodeQuick', param)

// 短信验证码
export const verifyCodeQuick = (param) => post('/api/user/verifyCodeQuick', param)

// 登陆
export const quickLogin = (param) => post('/api/user/quickLogin', param)

//活动详情
export const getProductDetail = (param) => post('/api/product/getProductDetail', param)

//报名并生成订单
export const submitOrder = (param) => post('/api/ticket/submitOrder', param)

//查看订单详情
export const viewOrdDetail = (param) => post('/api/order/viewOrdDetail', param)

// 微信登陆 code
export const getWeixinH5Config = (param) => post('/api/user/getWeixinH5Config', param)

// 微信登陆 access_token 
export const getWeixinH5AccessToken = (param) => post('/api/user/getWeixinH5AccessToken', param)

// 验证手机号 短信
export const  bindPhoneSendSms = (param) => post('/api/user/bindPhoneSendSms', param)

//验证手机号 
export const checkBindPhoneVerify = (param) => post('/api/user/checkBindPhoneVerify', param)

// 支付
export const payOrderByWeixin = (param) => post('/api/payment/payOrderByWeixin', param)

//收藏点赞分享
export const collectOrShare = (param) => post('/api/user/collectOrShare', param)

// 发布
export const addProductV2 = (param) => post('/api/product/addProductV2', param)

//腾讯地图地址逆解析
export const geocoder = (param) => post('/api/area/geocoder', param)

//获取该用户对该活动收藏,点赞状态 
export const getCollectLikeStatus = (param) => post('/api/user/getCollectLikeStatus', param)

//首页内容banner
export const getIndexPage = (param) => post('/api/indexpage/getIndexPage', param)

//首页盟主推荐
export const mengzhu = (param) => post('/api/recommend/mengzhu', param)

// 首页活动推荐
export const activity = (param) => post('/api/recommend/activity', param)

//首页-关注列表接口
export const getProductListByUserFollow = (param) => post('/api/user/getProductListByUserFollow', param)

//首页-即将开始活动
export const getProductListByWeek = (param) => post('/api/product/getProductListByWeek', param)

//我的页面接口
export const getUserInfo = (param) => post('/api/user/getUserInfo', param)

//我的收藏
export const getCollectList = (param) => post('/api/user/getCollectList', param)

//添加反馈
export const feedback = (param) => post('/api/user/feedback', param)

//获取订单列表
export const getOrderList = (param) => post('/api/ticket/getOrderList', param)

//我的关注页面
export const followUserList = (param) => post('/api/user/followUserList', param)

//我的粉丝页面 
export const fansUserList = (param) => post('/api/user/fansUserList', param)

//取消关注
export const unfollowUser = (param) => post('/api/user/unfollowUser', param)

//关注接口
export const followUser = (param) => post('/api/user/followUser', param)

//用户是否关注盟主接口
export const getUserSnsInfo = (param) => post('/api/userSnsInfo/getUserSnsInfo', param)

//我是盟主页面信息
export const findProductByUserID = (param) => post('/api/product/findProductByUserID', param)

//验票
export const checkTicket = (param) => post('/api/ticket/checkTicket', param)

//收入页面接口
export const getUserAmountInfo = (param) => post('/api/userAmount/getUserAmountInfo', param)

//已提现
export const getUserPaymemt = (param) => post('/api/payment/getUserPaymemt', param)

//查询银行信息接口
export const getPaymentAccount = (param) => post('/api/payment/getPaymentAccount', param)

//提现订单生成
export const withdrawVerify = (param) => post('/api/user/withdrawVerify', param)

//添加银行卡（收款账户）
export const addAccount = (param) => post('/api/payment/addAccount', param)

//我的票券(查看订单详情)
// export const viewOrdDetail = (param) => post('/api/order/viewOrdDetail', param)

//退票（取消报名）
export const returnTicket = (param) => post('/api/refund/returnTicket', param)

//活动列表
export const getProductList = (param) => post('/api/product/getProductList', param)

//创建部落 sjf
export const createTribe = (param) => post('/api/tribe/createTribe', param)

//部落列表 sjf
export const getTribeList = (param) => post('/api/tribe/getTribeList', param)

//盟主主页-dr
export const indexPage = (param) => post('/api/allian/indexPage', param)

//活动相册 sjf
export const getProductPhoto = (param) => post('/api/product/getProductPhoto', param)

//活动相册传入图片 sjf
export const uploadProductPhoto = (param) => post('/api/product/uploadProductPhoto', param)

//部落主页-dr
export const pageIndex = (param) => post('/api/tribeInfo/pageIndex', param)