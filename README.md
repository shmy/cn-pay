## 提示
> 微信相关还未完成，敬请关注  

## 进度
### 支付宝
+ 电脑网页支付 -ok
+ 手机网页支付 -ok
+ 手机App支付 -ok
+ 刷卡支付 -ok
+ 扫码支付 -ok
+ 账户转账 -ok
+ 交易查询 -ok
+ 交易撤销 -ok
+ 交易关闭 -ok
+ 交易退款 -ok
+ 对服务器数据验签 --ok

-----------------

### 微信
+ 公众号网页支付 --ok
+ 手机网页支付
+ 手机App支付 --ok
+ 刷卡支付
+ 扫码支付
+ 账户转账
+ 小程序支付
+ 普通红包
+ 裂变红包
+ 交易查询
+ 交易撤销
+ 交易关闭
+ 交易退款
+ 对服务器数据验签

-------------------

## 通用异常类型

| 名称 |     说明 |
| :-------- | :------ |
| GatewayException | 表示支付宝服务器返回的数据非正常结果，例如，参数错误等。可通过读取错误对象的`raw`属性获取真实的返回数据 |
| InvalidSignException | 表示验签失败。 |

## 支付宝
### 初始化实例
```javascript
const Pay = require('cn-pay')
const config = {
  app_id: 'app_id', // appid
  private_key: 'private_key', // 商户私钥
  public_key: 'public_key', // 支付宝公钥
  notify_url: 'notify_url', // 通知地址
  return_url: 'return_url', // 跳转地址
  dev: false // 设置为true 将启用开发环境的支付宝网关
}
const alipay = Pay.alipay(config)
```
### 支付订单
#### 一、电脑支付
##### 例子
```javascript
const order = {
  out_trade_no: '00000001',
  total_amount: 0.01, // 单位 元
  subject: '测试支付'
}
const result = await alipay.web(order) // 此方法返回Promise
// result => 返回构建好的FORM表单的HTML代码字符串
```
##### 订单配置参数  
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`product_code` 等参数。**  
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://docs.open.alipay.com/270/alipay.trade.page.pay)，查看「请求参数」一栏。

------------------

#### 二、手机网页支付
##### 例子
```javascript
const order = {
  out_trade_no: '00000001',
  total_amount: 0.01, // 单位 元
  subject: '测试支付'
}
const result = await alipay.wap(order) // 此方法返回Promise
// result => 返回构建好的FORM表单的HTML代码字符串
```
##### 订单配置参数  
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`product_code` 等参数。**  
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://docs.open.alipay.com/203/107090/)，查看「请求参数」一栏。

------------------

#### 三、App支付
##### 例子
```javascript
const order = {
  out_trade_no: '00000001',
  total_amount: 0.01, // 单位 元
  subject: '测试支付'
}
const result = await alipay.app(order) // 此方法返回Promise
// result => 返回包含签名的参数字符串
```
##### 订单配置参数  
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`product_code` 等参数。**  
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://docs.open.alipay.com/204/105465/)，查看「请求参数」一栏。

------------------

#### 四、刷卡支付
##### 例子
```javascript
const order = {
  out_trade_no: '00000001',
  total_amount: 0.01, // 单位 元
  subject: '测试支付',
  auth_code: '289756915257123456'
}
const result = await alipay.pos(order) // 此方法返回Promise
// result 为响应内容
```
##### 订单配置参数  
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`product_code` 等参数。**  
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://docs.open.alipay.com/api_1/alipay.trade.pay)，查看「请求参数」一栏。

------------------

#### 五、扫码支付
##### 例子
```javascript
const order = {
  out_trade_no: '00000001',
  total_amount: 0.01, // 单位 元
  subject: '测试支付'
}
const result = await alipay.scan(order) // 此方法返回Promise
// 二维码内容： qr = result.qr_code 
```
##### 订单配置参数  
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`product_code` 等参数。**  
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://docs.open.alipay.com/api_1/alipay.trade.precreate)，查看「请求参数」一栏。

------------------

#### 六、账户转账
##### 例子
```javascript
const order = {
  out_biz_no: '00000001',
  payee_type: 'ALIPAY_LOGONID',
  payee_account: 'ghdhjw7124@sandbox.com',
  amount: 0.01 // 单位 元
}
const result = await alipay.transfer(order) // 此方法返回Promise

```
##### 订单配置参数  
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`product_code` 等参数。**  
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://docs.open.alipay.com/api_28/alipay.fund.trans.toaccount.transfer)，查看「请求参数」一栏。

------------------
### 订单退款
#### 例子
```javascript
const order = {
  out_trade_no: '1514027114',
  refund_amount: '0.01'
}

const result = await alipay.refund(order) // 此方法返回Promise
// 
```
#### 订单配置参数
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://docs.open.alipay.com/api_1/alipay.trade.refund)，查看「请求参数」一栏。

-------------------

### 查询订单
#### 例子
```javascript
const order = {
  out_trade_no: '1514027114'
}
// 或者直接传递字符串
// const order = '1514027114'

const result = await alipay.find(order) // 此方法返回Promise
// 
```
#### 订单配置参数
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://docs.open.alipay.com/api_1/alipay.trade.query/)，查看「请求参数」一栏。

-------------------

### 取消订单
#### 例子
```javascript
const order = {
  out_trade_no: '1514027114'
}
// 或者直接传递字符串
// const order = '1514027114'

const result = await alipay.cancel(order) // 此方法返回Promise
// 
```
#### 订单配置参数
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://docs.open.alipay.com/api_1/alipay.trade.cancel/)，查看「请求参数」一栏。

-------------------

### 关闭订单
#### 例子
```javascript
const order = {
  out_trade_no: '1514027114'
}
// 或者直接传递字符串
// const order = '1514027114'

const result = await alipay.close(order) // 此方法返回Promise
// 
```
#### 订单配置参数
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://docs.open.alipay.com/api_1/alipay.trade.close/)，查看「请求参数」一栏。

-------------------

### 返回地址与异步通知的验签
#### 例子
```javascript

app.get('/return', (req, res) => {
  if (alipay.verify(req.query)) { // 一句话验签，就这么简单
    res.send('支付成功！！！' + JSON.stringify(req.query))
  } else {
    res.send('支付失败！！！' + JSON.stringify(req.query))
  }
})

app.post('/notify', (req, res) => {
  if (alipay.verify(req.body)) { // 一句话验签，就这么简单
    console.log('支付宝异步验签成功：')
    res.send('SUCCESS')
  } else {
    console.log('支付宝异步验签失败：')
    res.send('ERROR')
  }
})
```

--------------------