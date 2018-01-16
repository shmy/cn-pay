## 提示
> 微信相关还未完成，敬请关注  

[![npm](https://img.shields.io/npm/v/cn-pay.svg?style=flat-square)](https://www.npmjs.com/package/cn-pay)
[![npm](https://img.shields.io/npm/dt/cn-pay.svg?style=flat-square)](https://www.npmjs.com/package/cn-pay)
[![taonpm](https://npm.taobao.org/badge/v/cn-pay.svg)](https://npm.taobao.org/package/cn-pay)
[![license](https://img.shields.io/github/license/shmy/cn-pay.svg?style=flat-square)](https://github.com/shmy/cn-pay/blob/master/LICENSE.md)
[![GitHub stars](https://img.shields.io/github/stars/shmy/cn-pay.svg?style=social&label=Star)](https://github.com/shmy/cn-pay)  

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
+ 对服务器数据验签 -ok

-----------------

### 微信
+ 公众号网页支付 -ok
+ 手机网页(h5)支付 -ok
+ 手机App支付 -ok
+ 小程序支付 
+ 刷卡支付 -ok
+ 扫码支付 -ok
+ 账户转账
+ 交易查询 -ok
+ 交易撤销 -ok
+ 交易关闭 -ok
+ 交易退款 -ok
+ 对服务器数据验签 -ok

-------------------

## 安装
```bash
npm install cn-pay --save # or yarn add cn-pay
```

-------------------

## 通用异常类型

| 名称 |     说明 |
| :-------- | :------ |
| GatewayException | 表示支付宝服务器返回的数据非正常结果，例如，参数错误等。可通过读取错误对象的`raw`属性获取真实的返回数据 |
| InvalidSignException | 表示验签失败。 |

## 使用
🔥[支付宝支付](alipay.md)  

⛄[微信支付](wechat.md)