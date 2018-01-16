## 微信

### 初始化实例
```javascript
const Pay = require('cn-pay')
const config = {
  app_id: 'app_id', // 公众号appid
  appid: 'appid', // app的appid
  miniapp_id: 'miniapp_id', // 小程序的appid
  mch_id: 'mch_id', // 商户Id
  key: 'key', // 商户密钥
  notify_url: 'notify_url', // 通知地址
  return_url: 'return_url', // 跳转地址
  pfx: fs.readFileSync('<location-of-your-apiclient-cert.p12>') // 可选, 退款等情况时需要用到
}
const wechat = Pay.wechat(config)
```

### 支付订单
#### 一、公众号网页支付
##### 例子
```javascript
const order = {
  out_trade_no: '0000001',
  body: 'subject-测试',
  total_fee: 1, // 直接以元为单位
  openid: 'onkVf1FjWS5SBxxxxxxxx', // openid
  spbill_create_ip: 'spbill_create_ip' // 客户端ip
}

const result = await wechat.mp(order) // 此方法返回Promise
```
##### 成功返回
成功后`result`的值为类似以下结果：
```javascript
{
  appId: 'wx1c198f2cad228bee',
  package: 'prepay_id=wx20180115094744ab552e649c0025010603',
  timeStamp: '1515980861',
  nonceStr: 'sqax2vmws3',
  signType: 'MD5',
  paySign: 'D79BD1F0E4B12D1DFBA010E5DAE77DFE'
}
```
##### 订单配置参数
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`trade_type`, `appid`, `sign` 等参数。**
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1)，查看「请求参数」一栏。

-------------------------

#### 二、手机网页(h5)支付
##### 例子
```javascript
const order = {
  out_trade_no: '0000001',
  body: 'subject-测试',
  total_fee: 1, // 直接以元为单位
  spbill_create_ip: 'spbill_create_ip' // 客户端ip
}

const result = await wechat.wap(order) // 此方法返回Promise
```
##### 成功返回
成功后`result`的值为类似以下结果：
```javascript
{
  return_code: 'SUCCESS',
  return_msg: 'OK',
  appid: 'wx2421b1c4370ec43b',
  mch_id: '10000100',
  nonce_str: 'IITRi8Iabbblz1Jc',
  sign: '7921E432F65EB8ED0CE9755F0E86D72F',
  result_code: 'SUCCESS',
  prepay_id: 'wx201411101639507cbf6ffd8b0779950874',
  trade_type: 'MWEB',
  mweb_url: 'https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=wx2016121516420242444321ca0631331346&package=1405458241&redirect_url=return_url'
}
```
##### 订单配置参数
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`trade_type`, `appid`, `sign` 等参数。**
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=9_20&index=1)，查看「请求参数」一栏。

--------------------

#### 三、App支付
##### 例子
```javascript
const order = {
  out_trade_no: '0000001',
  body: 'subject-测试',
  total_fee: 1, // 直接以元为单位
  spbill_create_ip: 'spbill_create_ip' // 客户端ip
}

const result = await wechat.app(order) // 此方法返回Promise
```
##### 成功返回
成功后`result`的值为类似以下结果：
```javascript
{
  appid: 'wx1c198g4ad228bee',
  partnerid: '1460444802',
  prepayid: 'wx20180115100912c407d7dbf70493145721',
  package: 'Sign=WXPay',
  noncestr: 'kuo1z1qmy3m',
  timestamp: '1515982149',
  sign: '5C6BE57C28EE8B3BA950BF6E799A443F'
}
```
##### 订单配置参数
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`trade_type`, `appid`, `sign` 等参数。**
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1)，查看「请求参数」一栏。

--------------------

#### 四、小程序支付（未实现）
##### 例子
```javascript
const order = {
  out_trade_no: '0000001',
  body: 'subject-测试',
  total_fee: 1, // 直接以元为单位
  openid: 'onkVf1FjWS5SBxxxxxxxx', // openid
  spbill_create_ip: 'spbill_create_ip' // 客户端ip
}

const result = await wechat.miniapp(order) // 此方法返回Promise
```
##### 成功返回
成功后`result`的值为类似以下结果：
```javascript
// 未实现
```
##### 订单配置参数
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`trade_type`, `appid`, `sign` 等参数。**
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1)，查看「请求参数」一栏。

--------------------

#### 五、刷卡/条码支付
##### 例子
```javascript
const order = {
  out_trade_no: '0000001',
  body: 'subject-测试',
  total_fee: 1, // 直接以元为单位
  auth_code: '1354804793001231564897',
  spbill_create_ip: 'spbill_create_ip' // 客户端ip
}

const result = await wechat.pos(order) // 此方法返回Promise
```
##### 成功返回
成功后`result`的值为类似以下结果：
请根据`err_code` = `USERPAYING`，做定时查询，以确保真正支付成功
```javascript
{
  return_code: 'SUCCESS',
  return_msg: 'OK',
  appid: 'wx1c298f2cfg928bee',
  mch_id: '1483272902',
  nonce_str: 'F05AC0JnYL9QYX50',
  sign: 'F0B7082E9E57BFB590D58CE7C0B3E25A',
  result_code: 'FAIL',
  err_code: 'USERPAYING',
  err_code_des: '需要用户输入支付密码'
}
```
##### 订单配置参数
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`trade_type`, `appid`, `sign` 等参数。**
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_10&index=1)，查看「请求参数」一栏。

--------------------

#### 六、扫码支付
##### 例子
```javascript
const order = {
  out_trade_no: '0000001',
  body: 'subject-测试',
  total_fee: 1, // 直接以元为单位
  spbill_create_ip: 'spbill_create_ip' // 客户端ip
}

const result = await wechat.scan(order) // 此方法返回Promise
```
##### 成功返回
成功后`result`的值为类似以下结果：
```javascript
{
  return_code: 'SUCCESS',
  return_msg: 'OK',
  appid: 'wx1c298f2cfg928bee',
  mch_id: '1483272902',
  nonce_str: 'zqdbp8QhMA7lSpfP',
  result_code: 'SUCCESS',
  prepay_id: 'wx20180116101212517d3471fa0624769084',
  trade_type: 'NATIVE',
  code_url: 'weixin://wxpay/bizpayurl?pr=JxsXSLO'
}
```
##### 订单配置参数
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`trade_type`, `appid`, `sign` 等参数。**
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1)，查看「请求参数」一栏。

--------------------

#### 七、账户转账/企业付款（未实现）
##### 例子
```javascript
const order = {
  partner_trade_no: '0000001', // 商户订单号
  openid: 'openid', // 收款人openid
  check_name: 'NO_CHECK', // NO_CHECK：不校验真实姓名\FORCE_CHECK：强校验真实姓名
  amount: 1, // 直接以元为单位
  desc: '账户提现', // 付款说明
  spbill_create_ip: 'spbill_create_ip' // 客户端ip
}

const result = await wechat.transfer(order) // 此方法返回Promise
```
##### 成功返回
成功后`result`的值为类似以下结果：
```javascript
// 未实现
```
##### 订单配置参数
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`trade_type`, `appid`, `sign` 等参数。**
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2)，查看「请求参数」一栏。

--------------------

### 订单退款（未实现）
#### 例子
```javascript
const order = {
  out_trade_no: '1514027114',
  out_refund_no: '1516000270202',
  total_fee: 1, // 单位元
  refund_fee: 1, // 单位元
  refund_desc: '退款测试'
}
const result = await wechat.refund(order) // 此方法返回Promise

// APP/小程序退款
// 如果您需要退款 APP/小程序 的订单，请传入第二个字符串参数APP 或 MINIAPP
const result = await wechat.refund(order, 'APP') // APP订单 此方法返回Promise
const result = await wechat.refund(order, 'MINIAPP') // 小程序订单 此方法返回Promise
```
#### 订单配置参数
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_4)，查看「请求参数」一栏。

----------------

### 查询订单
#### 例子
```javascript
const order = {
  out_trade_no: '1514027114'
}
// 或者直接传递字符串
// const order = '1514027114'
const result = await wechat.find(order) // 此方法返回Promise

// APP/小程序查询
// 如果您需要查询 APP/小程序 的订单，请传入第二个字符串参数APP 或 MINIAPP
const result = await wechat.find(order, 'APP') // APP订单 此方法返回Promise
const result = await wechat.find(order, 'MINIAPP') // 小程序订单 此方法返回Promise
```
#### 订单配置参数
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_2)，查看「请求参数」一栏。

-------------------

### 取消订单
**微信官方无此 `API`，请调用 `close` 关闭订单。**

### 关闭订单
#### 例子
```javascript
const order = {
  out_trade_no: '1514027114'
}
// 或者直接传递字符串
// const order = '1514027114'
const result = await wechat.close(order) // 此方法返回Promise

// APP/小程序关闭
// 如果您需要关闭 APP/小程序 的订单，请传入第二个字符串参数APP 或 MINIAPP
const result = await wechat.close(order, 'APP') // APP订单 此方法返回Promise
const result = await wechat.close(order, 'MINIAPP') // 小程序订单 此方法返回Promise
```
#### 订单配置参数
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_3)，查看「请求参数」一栏。

--------------------

### 异步通知的验签
#### 例子
```javascript
app.post('/notify', (req, res) => {
  if (wechat.verify(req.body)) { // 一句话验签，就这么简单
    console.log('微信支付异步验签成功：')
    // 业务逻辑
    res.send(wechat.success()) // 可以调用success或fail方法 返回结果
  } else {
    console.log('微信支付异步验签失败：')
    res.send(wechat.fail('验签失败'))
  }
})
```

--------------------
