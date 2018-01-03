InputFiled
===

### 描述：
>**InputFiled** 是一个输入框组件，可传入需要展示的数据，是否禁用，默认展示的文本，自定义回调函数。

## InputFiled Properties

Name | Type | Default | Description
---  |  --- | --- | ---  
type | string |text | 文本框类型 | 
text | string | ' ' |文本内容| 
handler | func |  | 状态改变回调函数|
className | string |  | 自定义样式 |
placeHolder | string | 请输入内容 |自定义初始内容| 
iconDisable | bool | true |是否展示清除图标|
isDisable | bool | false |是否禁用输入框|
autoFocus | bool | false | 是否自动获取焦点|
onChangeHandler | func | | 当输入内容有变化时的回调函数|onChangeHandler | func | | 当输入内容有变化时的回调函数|
onBlur | func | | 当输入框失去焦点时的回调函数|
formatText | func | | 格式化输入内容 |
maxLength | number | | 输入框接受字符的最大长度 |
maxLength | number | | 输入框接受字符的最大长度 |
defaultValue | string | | 输入框默认展示的内容 |
clearCallback | func | | 清空内容时的回调函数 |




