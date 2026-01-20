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
