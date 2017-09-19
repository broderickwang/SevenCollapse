# SevenCollapse

## 仿bootstrap的上下折叠的面板，该面板支持左右折叠。

![](https://github.com/broderickwang/SevenCollapse/blob/master/shot/2017-09-19%2017.16.00.gif)

### 使用方法

#### 引入JS

`<script src="jquery.sevencollapse.js"></script>`

需要jQuery和bootstrap的支持。

#### 配置

```javascript
$("#pd").sevencollapse({clickClose:true,side:"right"});
```

##### 配置项说明：

> ```
> clickClose 如果设置为true，那么点击面板以为的内容关闭面板
> onOpen 面板关闭或者打开结束后的回调
> side 支持'left'和'right'，分别为左侧和右侧收缩
> ```