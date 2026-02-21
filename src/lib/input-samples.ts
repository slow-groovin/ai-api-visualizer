import type { ApiStandard, DataType } from "@/types/llm";
//TODO: 这是各个standard的各个dataType的输入示例， 在no data时, `Waitingforinput` 下方展示提供点击连接(query param, 如?sample=openai-sse), 用户点击后, 直接对inutText设置为对应示例, 注意:
//1. 同时展示所有示例的连接, 而不是只展示当前standard和dataType的示例
//2. 采用连接的方式是方便seo, 保证复制连接访问时, 展示的是相同内容(页面初始化后通过query param 应用实例,和两个option的选择)
//3. 职责分离, 相关逻辑不要放在Home.vue中, 这可能需要改造OutputPanel.vue, 将选择的option也pinia store化(和inputText放在一个store中即可)
//4. 异步加载示例数据, 示例数据可能会很大, 因此尽可能采用vite支持的动态import
// 不要删除此注释
const inputSamples: Record<ApiStandard, Record<DataType, string>> = {
  openai: {
    request: `{
  "model": "gpt-3.5-turbo",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is the capital of France?"}
  ],
  "temperature": 0.7,
  "max_tokens": 100
}`,
    response: `{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-3.5-turbo",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The capital of France is Paris."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 7,
    "total_tokens": 16
  }
}`,
    sse: ``
  },
  claude: {
    request: `{
  "input": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is the capital of France?"}
  ],
  "model": "claude-2",
  "temperature": 0.7,
  "max_tokens": 100
}`,
    response: `{
  "id": "cmpl-123",
  "object": "completion",
  "created": 1677652288,
  "model": "claude-2",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The capital of France is Paris."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "input_tokens": 9,
    "output_tokens": 7,
    "total_tokens": 16      
  } }`,
    sse: ``

  },
  gemini: {
    request: `{
  "input": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is the capital of France?"}
  ],
  "model": "claude-2",
  "temperature": 0.7,
  "max_tokens": 100
}`,
    response: `{
  "id": "cmpl-123",
  "object": "completion",
  "created": 1677652288,
  "model": "claude-2",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The capital of France is Paris."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "input_tokens": 9,
    "output_tokens": 7,
    "total_tokens": 16      
  } }`,
    sse: ``

  },

}