## NOTES
- 使用 `npm run tsc`验证代码是否正确编译
- 然后才能使用 `npm run build:dev`验证代码是否正确运行


要求:
- 追求极致的代码质量,代码整洁程度,  单一职责原则
- 生成的代码应该有清晰适当的注释


## 功能

./mitmproxy-llm-better-view 是本项目进行参考的油猴脚本项目, 其中提供的:

- mitmproxy-llm-better-view/src/components/llm/openai/OpenaiRequestView.vue
- mitmproxy-llm-better-view/src/components/llm/openai/OpenaiResponseView.vue
- mitmproxy-llm-better-view/src/components/llm/gemini/GeminiRequestView.vue
- mitmproxy-llm-better-view/src/components/llm/gemini/GeminiResponseView.vue
- mitmproxy-llm-better-view/src/components/llm/claude/ClaudeRequestView.vue
- mitmproxy-llm-better-view/src/components/llm/claude/ClaudeResponseView.vue

是已经投入使用的, 没有错误的api data渲染组件, 本项目必须利用这些组件进行可视化而不是重新造新的

- mitmproxy-llm-better-view/src/pages/Dashboard.vue 是api data 的渲染入口

## 任务
### 任务1
移动相关页面组件和依赖子组件和style到当前项目中合适位置
### 任务2
实现右侧区域, 达到接受prop, 渲染可视化
### 任务3
实现左侧区域, 在用户输入时, parse json为合理的object