export default {
  request: `{
  "contents": [
    {
      "parts": [
        {
          "text": "What is the capital of France?"
        }
      ],
      "role": "user"
    }
  ],
  "generationConfig": {
    "temperature": 0.7,
    "maxOutputTokens": 100
  }
}`,
  response: `{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "The capital of France is Paris."
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "index": 0
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 5,
    "candidatesTokenCount": 7,
    "totalTokenCount": 12
  }
}`,
  sse: `data: {"candidates":[{"content":{"parts":[{"text":"The"}],"role":"model"}}]}

data: {"candidates":[{"content":{"parts":[{"text":" capital"}],"role":"model"}}]}

data: {"candidates":[{"content":{"parts":[{"text":" of"}],"role":"model"}}]}

data: {"candidates":[{"content":{"parts":[{"text":" France"}],"role":"model"}}]}

data: {"candidates":[{"content":{"parts":[{"text":" is"}],"role":"model"}}]}

data: {"candidates":[{"content":{"parts":[{"text":" Paris"}],"role":"model"}}]}

data: {"candidates":[{"content":{"parts":[{"text":"."}],"role":"model"},"finishReason":"STOP"}]}
`
}
