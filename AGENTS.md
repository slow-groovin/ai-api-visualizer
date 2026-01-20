# orders
使用 `npm run tsc`验证代码是否正确编译


## current stages
当前是技术验证阶段
遵循指令生成框架和易读易测试的实例

易读:
1. 文件名, 目录结构合理
2. 过程或者关键数据通过log/alert/toast/页面显示出来


易测试:
1. 有一个统一的DEBUG页入口, 里面包含不同测试项的跳转连接
2. 通过环境变量控制DEBUG页, 在正式打包时可以隐藏
3.

```
当前项目目录是 /home/user13500/code/repo/context-protector/context-protector-web
```

## 任务
### 任务5
实现replace页面,  左右两栏和若干按钮
左侧: input框 
右侧: 按规则replace后的内容
按钮: do replace的按钮, tests 1~6的按钮点击后输入预设的input内容

规则类型: {match:{type:'regex'|'fixed',value:string}, target:{type:'fixed',value:string}}[]

规则类型定义和替换函数放在单独的.ts文件中
替换函数需要有详细的测试

替换逻辑:
遍历规则,  对输入内容按照match全局匹配, 匹配到的替换为target(高亮)

高亮逻辑:
加上半透明背景色, 背景色取决于规则id的hash

### 任务6
#### 实现restore功能, 在replace的页面内
增加一行左右两栏, 
左侧: input框, 输入大模型响应的内容
右侧: 按历史restore后的内容

#### pre functions:
为replace功能加料, 将匹配的记录保存下来, 如 "世界"(fixed) -> "world"(fixed) 或 "123-45-6789"(^\d{3}-\d{2}-\d{4}$) -> "555-55-5555" 实际出发了替换, 那么记录倒插key-value键值对

#### restore逻辑:
将大模型输出内容中, 将内容替换会原来的内容 ,比如 "555-55-5555"->"123-45-6789"

#### 匹配历史记录 存储和查询:
使用sqlite-drizzle数据库进行CRUD, 表名需要有debug-开头
每次"DO Replace"会创建一个任务(仅在内存中持久存储id,刷新即消失), 替换历史属于该任务

#### 初始化表:
给出单独的"初始化表"按钮执行具体初始化过程

#### mock大模型输出内容功能:
> 单独一个框
根据当前任务的替换历史, 随机生成测试的大模型输出内容, 用以用户复制然后粘贴进入input框进行restore测试
两个按钮, 一个生成中文, 一个生成英文, 
中文模拟生成连续的句子,仅使用 "一"至"四"作为基础字, 比如 replace records: word->世界, 我的->你的.  mock: 一二四世界一二, 三三你的一三
英文也是, 仅使用基础词 "my" "you" "this" "what" "can" "do", 如 replace records: const->let, opencode->claude. mock: what let claude can do. you you my let this.
句子长度随机 len of replace records * (1~5), 保证每个替换记录至少存在一个
