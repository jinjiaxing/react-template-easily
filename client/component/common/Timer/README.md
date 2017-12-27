Timer
===

### 描述：
>**Timer** 是一个计数器，支持正序，逆序计数，可接受秒数或者hh:mm:ss类型的数据，可配置超过24小时出现天数，可配置截至时间，到达截至时间会触发回调函数,其中id和initvalue为必传项。

## Timer Properties

Name | Type | Default | Description
---  |  --- | --- | ---  
initValue | string | 0 |初始时间| 
className | string | |附加类名|
order | string | asce | asce正序计时，desc逆序计时 |
type | string | : |分隔符，支持':' '/' 'time(时分秒)'| 
timeup | string | 0 | 截至时间(格式需和initValue一致)|
newDay | bool | false |满二十四小时是否加一天| 
id | string | |定时器的唯一标识|

