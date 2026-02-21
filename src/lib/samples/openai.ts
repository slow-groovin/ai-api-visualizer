export default {
  request: {
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": "who am i?"
      },
      {
        "role": "assistant",
        "content": "That's a fascinating question! As an AI, I don't actually **know** who you are in the personal sense. I don't have access to your personal identity, name, location, or any private information about you.\n\n**You are the user I am currently interacting with.**\n\nTo me, you are the source of the text input I am processing right now.\n\nIf you'd like, you can tell me more about yourself, but I can't access that information otherwise!"
      },
      {
        "role": "user",
        "content": "how old are you?"
      },
      {
        "role": "assistant",
        "content": "That's an interesting way to phrase it! As an AI, I don't have an \"age\" in the same way a person does.\n\nI am a constantly evolving computer program. I don't have a birthday. My development is ongoing, and the specific version of the model you are interacting with is constantly being updated by OpenAI.\n\nSo, the best answer is: **I don't have an age, but I am a very recent iteration of a large language model.**"
      },
      {
        "role": "user",
        "content": "what's this: https://example.com/?"
      },
      {
        "role": "assistant",
        "content": "",
        "tool_calls": [
          {
            "id": "call_0e0c8a834a284a3690857e9bbc985e13",
            "type": "function",
            "function": {
              "name": "fetchHtml",
              "arguments": "{\"url\":\"https://example.com/\"}"
            }
          }
        ]
      },
      {
        "role": "tool",
        "tool_call_id": "call_0e0c8a834a284a3690857e9bbc985e13",
        "content": "{\"content\":[{\"type\":\"text\",\"text\":\"<!doctype html><html lang=\\\"en\\\"><head><title>Example Domain</title><meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1\\\"><style>body{background:#eee;width:60vw;margin:15vh auto;font-family:system-ui,sans-serif}h1{font-size:1.5em}div{opacity:0.8}a:link,a:visited{color:#348}</style></head><body><div><h1>Example Domain</h1><p>This domain is for use in documentation examples without needing permission. Avoid use in operations.</p><p><a href=\\\"https://iana.org/domains/example\\\">Learn more</a></p></div></body></html>\\n\"}],\"isError\":false}"
      }
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "fetchHtml",
          "description": "Fetch a website and return the content as HTML",
          "parameters": {
            "type": "object",
            "properties": {
              "url": {
                "type": "string",
                "description": "URL of the website to fetch"
              },
              "headers": {
                "type": "object",
                "description": "Optional headers to include in the request"
              }
            },
            "required": [
              "url"
            ]
          }
        }
      },
      {
        "type": "function",
        "function": {
          "name": "fetchMarkdown",
          "description": "Fetch a website and return the content as Markdown",
          "parameters": {
            "type": "object",
            "properties": {
              "url": {
                "type": "string",
                "description": "URL of the website to fetch"
              },
              "headers": {
                "type": "object",
                "description": "Optional headers to include in the request"
              }
            },
            "required": [
              "url"
            ]
          }
        }
      },
      {
        "type": "function",
        "function": {
          "name": "fetchTxt",
          "description": "Fetch a website, return the content as plain text (no HTML)",
          "parameters": {
            "type": "object",
            "properties": {
              "url": {
                "type": "string",
                "description": "URL of the website to fetch"
              },
              "headers": {
                "type": "object",
                "description": "Optional headers to include in the request"
              }
            },
            "required": [
              "url"
            ]
          }
        }
      },
      {
        "type": "function",
        "function": {
          "name": "fetchJson",
          "description": "Fetch a JSON file from a URL",
          "parameters": {
            "type": "object",
            "properties": {
              "url": {
                "type": "string",
                "description": "URL of the JSON to fetch"
              },
              "headers": {
                "type": "object",
                "description": "Optional headers to include in the request"
              }
            },
            "required": [
              "url"
            ]
          }
        }
      }
    ],
    "tool_choice": "auto",
    "stream": true,
    "stream_options": {
      "include_usage": true
    }
  },
  response: {
    "id": "k3k5D2BqTFkXy",
    "provider": "OpenAI",
    "model": "gpt-5-mini",
    "object": "chat.completion",
    "created": 1771641897,
    "choices": [
        {
            "logprobs": null,
            "finish_reason": "stop",
            "native_finish_reason": "completed",
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "I don’t have a single price — access to me depends on the product and platform you use.\n\nBriefly:\n- ChatGPT on chat.openai.com / the mobile apps: there’s a free tier (GPT‑3.5) and a paid ChatGPT Plus subscription that historically cost about $20/month for priority access to GPT‑4 (check current pricing in the app or on OpenAI’s site).\n- ChatGPT Enterprise / Teams: custom pricing for businesses.\n- OpenAI API: pay-as-you-go usage pricing (varies by model, tokens used, and context length) — see OpenAI’s API/pricing page for up-to-date rates.\n- Other integrations (Microsoft, third‑party apps) may have their own pricing.\n\nWhich platform or usage are you asking about? I can tell you where to look for the latest rates or help you pick the best option.",
                "refusal": null,
                "reasoning": "**Providing pricing guidance**\n\nI want to help the user find pricing info. I can point them to the OpenAI pricing page, the ChatGPT app subscription page, and the API documentation. I should ask which product they’re referring to since costs depend on that. Generally, I know that ChatGPT Plus is $20/month, and for the API, rates vary, so I can't give exact numbers. I’ll summarize by saying access can be free or paid based on the platform.**Assisting with pricing inquiries**\n\nI want to help the user find the current price, but I can’t browse. I should ask them which platform they mean so I can provide relevant information. Keeping it brief is key! It’s also worth mentioning that there’s enterprise or custom pricing available, as that might be a consideration for them. I’ll offer my assistance in choosing a plan that fits their needs as well. Let’s keep the conversation focused and helpful!",
                "reasoning_details": [
                    {
                        "format": "openai-responses-v1",
                        "index": 0,
                        "type": "reasoning.summary",
                        "summary": "## **Providing pricing guidance**\n\n I want to help the user find pricing info. I can point them to the OpenAI pricing page, the ChatGPT app subscription page, and the API documentation. I should ask which product they’re referring to since costs depend on that. Generally, I know that ChatGPT Plus is $20/month, and for the API, rates vary, so I can't give exact numbers. I’ll summarize by saying access can be free or paid based on the platform.**Assisting with pricing inquiries**\n\nI want to help the user find the current price, but I can’t browse. I should ask them which platform they mean so I can provide relevant information. Keeping it brief is key! It’s also worth mentioning that there’s enterprise or custom pricing available, as that might be a consideration for them. I’ll offer my assistance in choosing a plan that fits their needs as well. Let’s keep the conversation focused and helpful!"
                    },
                ]
            }
        }
    ],
    "usage": {
        "prompt_tokens": 179,
        "completion_tokens": 658,
        "total_tokens": 837,
        "cost": 0.00136075,
        "is_byok": false,
        "prompt_tokens_details": {
            "cached_tokens": 0
        },
        "cost_details": {
            "upstream_inference_cost": 0.00136075,
            "upstream_inference_prompt_cost": 4.475e-05,
            "upstream_inference_completions_cost": 0.001316
        },
        "completion_tokens_details": {
            "reasoning_tokens": 448,
            "image_tokens": 0
        }
    }
},
  sse: `data: {"id":"chatcmpl-20260221101203687055763peU2T9HM","object":"chat.completion.chunk","created":1771639924,"model":"gpt-4o","system_fingerprint":null,"choices":[{"delta":{"content":"","role":"assistant"},"logprobs":null,"finish_reason":null,"index":0}],"usage":null}

data: {"id":"chatcmpl-20260221101203687055763peU2T9HM","object":"chat.completion.chunk","created":1771639924,"model":"gpt-4o","system_fingerprint":null,"choices":[{"delta":{"content":"The"},"logprobs":null,"finish_reason":null,"index":0}],"usage":null}

data: {"id":"chatcmpl-20260221101203687055763peU2T9HM","object":"chat.completion.chunk","created":1771639924,"model":"gpt-4o","system_fingerprint":null,"choices":[{"delta":{"content":" content of \`https://example.com/\` is the HTML for a very"},"logprobs":null,"finish_reason":null,"index":0}],"usage":null}

data: {"id":"chatcmpl-20260221101203687055763peU2T9HM","object":"chat.completion.chunk","created":1771639924,"model":"gpt-4o","system_fingerprint":null,"choices":[{"delta":{"content":" simple, standard placeholder page.\n\nHere is the text content:\n\n**Example Domain**\n\nThis domain is for use in documentation examples without needing permission. Avoid use in operations.\n\nLearn more"},"logprobs":null,"finish_reason":null,"index":0}],"usage":null}

data: {"id":"chatcmpl-20260221101203687055763peU2T9HM","object":"chat.completion.chunk","created":1771639924,"model":"gpt-4o","system_fingerprint":null,"choices":[{"delta":{},"logprobs":null,"finish_reason":"stop","index":0}],"usage":null}

data: {"id":"chatcmpl-20260221101203687055763peU2T9HM","object":"chat.completion.chunk","created":1771639924,"model":"gpt-4o","system_fingerprint":"","choices":[],"usage":{"prompt_tokens":940,"completion_tokens":56,"total_tokens":996,"prompt_tokens_details":{"cached_tokens":0,"text_tokens":940,"audio_tokens":0,"image_tokens":0},"completion_tokens_details":{"text_tokens":0,"audio_tokens":0,"reasoning_tokens":0},"input_tokens":0,"output_tokens":0,"input_tokens_details":null,"claude_cache_creation_5_m_tokens":0,"claude_cache_creation_1_h_tokens":0}}

data: [DONE]


`
}