## 支付宝
### 初始化实例
```javascript
const Pay = require('cn-pay')
const config = {
  app_id: 'app_id', // appid
  private_key: 'private_key', // 商户私钥 注意：此处不是文件路径，一定要是文件内容
  public_key: 'public_key', // 支付宝公钥 注意：此处不是文件路径，一定要是文件内容
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
const { html, payload, endpoint } = await alipay.web(order) // 此方法返回Promise

```
##### 返回
成功时`html`返回类似以下数据：
```html
<form id="alipaysubmit" name="alipaysubmit" action="https://openapi.alipaydev.com/gateway.do" method="POST" accept-charset="utf-8"
  onsubmit="document.charset='utf-8'">
  <input type="hidden" name="app_id" value='2016084560151484' />
  <input type="hidden" name="notify_url" value='http://xxx.com/notify' />
  <input type="hidden" name="return_url" value='http://xxx.com/return' />
  <input type="hidden" name="charset" value='utf-8' />
  <input type="hidden" name="sign_type" value='RSA2' />
  <input type="hidden" name="version" value='1.0' />
  <input type="hidden" name="format" value='JSON' />
  <input type="hidden" name="method" value='alipay.trade.page.pay' />
  <input type="hidden" name="biz_content" value='{"out_trade_no":"1516098988035","total_amount":10,"subject":"测试支付","product_code":"FAST_INSTANT_TRADE_PAY"}'
  />
  <input typ e="hidden" name="timestamp" value='2018-01-16 18:36:28' />
  <input type="hidden" name="sign" value='Of16KFnZcs76flBpw/6PeD65AxUXNGuvm1ZhsW4HWY/nWVRW+OVSkW9XqrSc2Q965FXTubpOjn59nwVY7JKOeicxAqwlBpLvoz9Hp4kDBmQyfk8ljP0BcpVVfZS/D0casaR8FjhLEKaeg0d4ESvyFFd99cOG6nWDDohTic/wBTHoKgSJ4jZwKhIsIdD6+nvmP8CAzs+MyieCqwLZInbiOhx8oQkbOEsC93G9c2f/m5zo5aq6BXbSXjrkL+b+BrZC6UKbDygbuCScj4jG0qQP06x/ybrS637DyK29Z5Q991nq7vGOetinUIIK/6fMYXta+rt94bX49HqUNlEKJPKcyA=='
  />
  <input type="submit" value="ok" style="display: none;">
</form>
<script>document.forms["alipaysubmit"].submit();</script>

```
如果你不喜欢生成的`html`代码，也可以使用`payload`属性，返回如下：
```javascript
{
  app_id: '2016084560151484',
  notify_url: 'http://xxx.com/notify',
  return_url: 'http://xxx.com/return',
  charset: 'utf-8',
  sign_type: 'RSA2',
  version: '1.0',
  format: 'JSON',
  method: 'alipay.trade.page.pay',
  biz_content: '{"out_trade_no":"1516099080395","total_amount":10,"subject":"测试支付","product_code":"FAST_INSTANT_TRADE_PAY"}',
  timestamp: '2018-01-16 18:38:00',
  sign: 'Ec9no7LXl5UF6GhW4UFNIT8lG6pmtGizHVmVVQrt2NW3x4E/wmLu1VDw00exod9INjreK3OcU6/Y4PFvP5QUNALh986sGAPpqx2hr6BwmI8GeNWcCJ78Da7Fsp4fwGmusr56wYeBnKwcTaMCO0K3EV7YDIKqXAkfb4l8rxNrDJztdEOZCaN1ChkJZLzwEKZzt8q5gw4IYcKkYPCbWnHqUhapPLBbSyaL0O6RAG5N+gfpZNMxQeMbO5VwyV1iHsPtl9MZv77gSizLTHqLUTfdb5VC2phxQ08EYan46bFUtDqS6Sl6QkyzVUsyfAisuDrklBpGiYVMR4dk3vwkZ+yUXw=='
}

```
`endpoint`属性代表当前配置的网关地址，可结合`payload`自定义提交
```text
https://openapi.alipaydev.com/gateway.do
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
const { html, payload, endpoint } = await alipay.wap(order) // 此方法返回Promise

```
##### 返回
成功时`html`返回类似以下数据：
```html
<form id="alipaysubmit" name="alipaysubmit" action="https://openapi.alipaydev.com/gateway.do" method="POST" accept-charset="utf-8"
  onsubmit="document.charset='utf-8'">
  <input type="hidden" name="app_id" value='2016084560151484' />
  <input type="hidden" name="notify_url" value='http://xxx.com/notify' />
  <input type="hidden" name="return_url" value='http://xxx.com/return' />
  <input type="hidden" name="charset" value='utf-8' />
  <input type="hidden" name="sign_type" value='RSA2' />
  <input type="hidden" name="version" value='1.0' />
  <input type="hidden" name="format" value='JSON' />
  <input type="hidden" name="method" value='alipay.trade.wap.pay' />
  <input type="hidden" name="biz_content" value='{"out_trade_no":"1516098988035","total_amount":10,"subject":"测试支付","product_code":"QUICK_WAP_WAY"}'
  />
  <input typ e="hidden" name="timestamp" value='2018-01-16 18:36:28' />
  <input type="hidden" name="sign" value='Of16KFnZcs76flBpw/6PeD65AxUXNGuvm1ZhsW4HWY/nWVRW+OVSkW9XqrSc2Q965FXTubpOjn59nwVY7JKOeicxAqwlBpLvoz9Hp4kDBmQyfk8ljP0BcpVVfZS/D0casaR8FjhLEKaeg0d4ESvyFFd99cOG6nWDDohTic/wBTHoKgSJ4jZwKhIsIdD6+nvmP8CAzs+MyieCqwLZInbiOhx8oQkbOEsC93G9c2f/m5zo5aq6BXbSXjrkL+b+BrZC6UKbDygbuCScj4jG0qQP06x/ybrS637DyK29Z5Q991nq7vGOetinUIIK/6fMYXta+rt94bX49HqUNlEKJPKcyA=='
  />
  <input type="submit" value="ok" style="display: none;">
</form>
<script>document.forms["alipaysubmit"].submit();</script>

```
如果你不喜欢生成的`html`代码，也可以使用`payload`属性，返回如下：
```javascript
{
  app_id: '2016084560151484',
  notify_url: 'http://xxx.com/notify',
  return_url: 'http://xxx.com/return',
  charset: 'utf-8',
  sign_type: 'RSA2',
  version: '1.0',
  format: 'JSON',
  method: 'alipay.trade.wap.pay',
  biz_content: '{"out_trade_no":"1516099080395","total_amount":10,"subject":"测试支付","product_code":"QUICK_WAP_WAY"}',
  timestamp: '2018-01-16 18:38:00',
  sign: 'Ec9no7LXl5UF6GhW4UFNIT8lG6pmtGizHVmVVQrt2NW3x4E/wmLu1VDw00exod9INjreK3OcU6/Y4PFvP5QUNALh986sGAPpqx2hr6BwmI8GeNWcCJ78Da7Fsp4fwGmusr56wYeBnKwcTaMCO0K3EV7YDIKqXAkfb4l8rxNrDJztdEOZCaN1ChkJZLzwEKZzt8q5gw4IYcKkYPCbWnHqUhapPLBbSyaL0O6RAG5N+gfpZNMxQeMbO5VwyV1iHsPtl9MZv77gSizLTHqLUTfdb5VC2phxQ08EYan46bFUtDqS6Sl6QkyzVUsyfAisuDrklBpGiYVMR4dk3vwkZ+yUXw=='
}

```
`endpoint`属性代表当前配置的网关地址，可结合`payload`自定义提交
```text
https://openapi.alipaydev.com/gateway.do
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

```
##### 返回
成功时`result`返回类似以下数据：
```text
app_id=2016080200151484&notify_url=http%3A%2F%2Fshmy.free.ngrok.cc%2Fnotify&return_url=http%3A%2F%2Fxxx.com.cc%2Freturn&charset=utf-8&sign_type=RSA2&version=1.0&format=JSON&method=alipay.trade.app
.pay&biz_content=%7B%22out_trade_no%22%3A%221515983521858%22%2C%22total_amount%22%3A10000%2C%22subject%22%3A%22te'%5C%22%5C%22%5C%22%5C%22%5C%22%5C%22st%22%2C%22auth_code%22%3A%22289756915257123456%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&timestamp=2018-01-15%2010%3A32%3A01&sign=HRDLsB7zHCHmGQgaRmBpYnRKJencrYS%2FQ5LMOQvgc09955Ta7x34EkaPolXyrXcn9u7lV0Y1EsoCQX16TK6zQm2Bh91dt1KMjlaUZ0hK8X6rUcCrD0ijxkYxZTHfBXeGrX0OaBe33sWa7ZDrk%2FbYzFtZ5trEUSBQYgTl6AReYAw7CpyjylZWSLxkPFTnefDHODhqXJpjdtbd1ABCU61GxxC%2Fe3KBeiA7N%2FtS8JF6OC3wJa9fXxrCdQtpefUJkkdr5vYj6cbW6W8334Z%2FUgZ5smYjuYUHbHmlWggvkmC9ETnloi4iT%2Bgjyi5Q4EezLWG5HsO8VuAPumomc%2Bo4vwvEgA%3D%3D
```
##### 订单配置参数
**所有订单配置中，客观参数均不用配置，扩展包已经为大家自动处理了，比如，`product_code` 等参数。**
所有订单配置参数和官方无任何差别，兼容所有功能，所有参数请[参考这里](https://docs.open.alipay.com/204/105465/)，查看「请求参数」一栏。

------------------

#### 四、刷卡/条码支付
##### 例子
```javascript
const order = {
  out_trade_no: '00000001',
  total_amount: 0.01, // 单位 元
  subject: '测试支付',
  auth_code: '289756915257123456'
}
const result = await alipay.pos(order) // 此方法返回Promise

```
##### 返回
成功时`result`返回类似以下数据：
```javascript
{
  code: '10000',
  msg: 'Success',
  buyer_logon_id: 'rlq***@sandbox.com',
  buyer_pay_amount: '1.00',
  buyer_user_id: '2088102171352233',
  buyer_user_type: 'PRIVATE',
  fund_bill_list: [ { amount: '1.00', fund_channel: 'ALIPAYACCOUNT' } ],
  gmt_payment: '2018-01-15 13:21:24',
  invoice_amount: '1.00',
  out_trade_no: '1515993679354',
  point_amount: '0.00',
  receipt_amount: '1.00',
  total_amount: '1.00',
  trade_no: '2018011521001004230200245643'
}
```
本接口有可能返回`10003`代码，代表等待用户付款中，此时返回如下：
```javascript
{
  code: '10003',
  msg: ' order success pay inprocess',
  buyer_logon_id: 'rlq***@sandbox.com',
  buyer_pay_amount: '0.00',
  buyer_user_id: '2088102171352233',
  buyer_user_type: 'PRIVATE',
  invoice_amount: '0.00',
  out_trade_no: '1515993611620',
  point_amount: '0.00',
  receipt_amount: '0.00',
  total_amount: '10000.00',
  trade_no: '2018011521001004230200245782',
}

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

```
##### 返回
成功时`result`返回类似以下数据：
```javascript
{
  code: '10000',
  msg: 'Success',
  out_trade_no: '1515983595882',
  qr_code: 'https://qr.alipay.com/bax07154nst0cjb0ckqq004d'
}
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
