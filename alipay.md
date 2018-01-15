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

```
##### 返回
成功时`result`返回类似以下数据：
```html 
<form id="alipaysubmit" name="alipaysubmit" action="https://openapi.alipay.com/gateway.do" method="POST" accept-charset="utf-8"
  onsubmit="document.charset='utf-8'">
  <input type="hidden" name="app_id" va lue='2016080200151484' />
  <input type="hidden" name="notify_url" value='http://xxx.com/notify' />
  <input type="hidden" name="return_url" value='http://xxx.com/return' />
  <input type="hidden" name="charset" value='utf-8' />
  <input type="hidden" name="sign_type" value='RSA2' />
  <input type="hidden" name="version" value='1.0' />
  <input type="hidden" name="format" value='JSON' />
  <input type="hidden" name="method" value='alipay.trade.page.pay' />
  <input type="hidden" name="biz_content" value='{"out_trade_no":"1515983394615","total_amount":10,"subject":"测试支付","product_code":"FAST_INSTANT_TRADE_PAY"}'
  />
  <input type="hidden" name="timestamp" value='2018-01-15 10:29:54' />
  <input type="hidden" name="sign" value='ZqRHomRvP735DQqj4DhaLwwmzn5xOMdgc3kK0cMDlu8eSfP8LCeYkb3mCCP3VVBTJpUOaahaOBOZOfNhDOgBOpUPvw0XfoAmhRNmuTrkwBpNlbhnWxcRvc2S0tgACrH1fTvlmVVM0kDKUhjjTWtxYNh4mJJga6nhgWWEVdMYYF/qQ1fDOzVP+PKP4Wcv0oP7pHROyHl5M8xK04Z0kACkxYLzeAFZSS3Q2ds/C5JmtaRSXV1/m2AXD31VMVZyAGEhE63Ho8czZFgrWQ2xE/ZNTQS9TY6UXt5ZSFOJJzTDIoxb20dOla/LuRzOigcU5jibQj2tMmTMNZcFhSK+Q3M+jw=='
  />
  <input type="submit" value="ok" style="display: none;">
</form>
<script>document.forms["alipaysubmit"].submit();</script>
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

```
##### 返回
成功时`result`返回类似以下数据：
```html 
<form id="alipaysubmit" name="alipaysubmit" action="https://openapi.alipay.com/gateway.do" method="POST" accept-charset="utf-8"
  onsubmit="document.charset='utf-8'">
  <input type="hidden" name="app_id" va lue='2016080200151484' />
  <input type="hidden" name="notify_url" value='http://xxx.com/notify' />
  <input type="hidden" name="return_url" value='http://xxx.com/return' />
  <input type="hidden" name="charset" value='utf-8' />
  <input type="hidden" name="sign_type" value='RSA2' />
  <input type="hidden" name="version" value='1.0' />
  <input type="hidden" name="format" value='JSON' />
  <input type="hidden" name="method" value='alipay.trade.wap.pay' />
  <input type="hidden" name="biz_content" value='{"out_trade_no":"1515983129030","total_amount":10,"subject":"测试支付","product_code":"QUICK_WAP_WAY"}'
  />
  <input type="hidden" name="timestamp" value='2018-01-15 10:25:29' />
  <input type="hidden" name="sign" value='Bod177NhPNopJ2McfkXrPMXGXApYIQqszPrJzdT7S8H45sN3N1yhdep/aYGq/1bACwyKpx7mnQsGUekx1kyvq+/Rm4cgM3vqkuOJdyBU34iyQqTOtW1de4R9XyPxdN8cQtiz65AVlZSxWjW+2YsNJtLCRspIjUOvwy5C908FZQMYxAfBs8Wx2UteGRj8FgHdy2VzSpTnn6e7q/+HVwKGcmnWOyLYYM/Ego9r8wgJFqTAbVOVbkJBwV/3i55z12DJk3teU0IPk21INxKkd8Tby0RdyQYuC38KEli4+blR7GJzlM0zdbrwMHOLQ+fzLwxkIIxGtrH/Q1gT8yM2MsSypA=='
  />
  <input type="submit" value="ok" style="display: none;">
</form>
<script>document.forms["alipaysubmit"].submit();</script>
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
```json
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