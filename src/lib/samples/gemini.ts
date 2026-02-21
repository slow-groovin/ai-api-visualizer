export default {
  request: {
    "generationConfig": {
      "thinkingConfig": {
        "thinkingBudget": 0,
        "includeThoughts": false
      }
    },
    "contents": [
      {
        "role": "user",
        "parts": [
          {
            "text": "hello? who are you?"
          }
        ]
      },
      {
        "role": "model",
        "parts": [
          {
            "text": "I am a large language model, trained by Google."
          }
        ]
      },
      {
        "role": "user",
        "parts": [
          {
            "text": "what's this: https://example.com/?  use fetch to examine it."
          }
        ]
      },
      {
        "role": "model",
        "parts": [
          {
            "functionCall": {
              "name": "mcp__CherryFetch__fetchHtml",
              "args": {
                "url": "https://example.com/"
              }
            }
          }
        ]
      },
      {
        "role": "user",
        "parts": [
          {
            "functionResponse": {
              "name": "mcp__CherryFetch__fetchHtml",
              "response": {
                "name": "mcp__CherryFetch__fetchHtml",
                "content": {
                  "content": [
                    {
                      "type": "text",
                      "text": "<!doctype html><html lang=\"en\"><head><title>Example Domain</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><style>body{background:#eee;width:60vw;margin:15vh auto;font-family:system-ui,sans-serif}h1{font-size:1.5em}div{opacity:0.8}a:link,a:visited{color:#348}</style></head><body><div><h1>Example Domain</h1><p>This domain is for use in documentation examples without needing permission. Avoid use in operations.</p><p><a href=\"https://iana.org/domains/example\">Learn more</a></p></div></body></html>\n"
                    }
                  ],
                  "isError": false
                }
              }
            }
          }
        ]
      }
    ],
    "tools": [
      {
        "functionDeclarations": [
          {
            "name": "mcp__CherryFetch__fetchHtml",
            "description": "Fetch a website and return the content as HTML",
            "parameters": {
              "required": [
                "url"
              ],
              "type": "object",
              "properties": {
                "url": {
                  "description": "URL of the website to fetch",
                  "type": "string"
                }
              }
            }
          },
          {
            "name": "mcp__CherryFetch__fetchMarkdown",
            "description": "Fetch a website and return the content as Markdown",
            "parameters": {
              "required": [
                "url"
              ],
              "type": "object",
              "properties": {
                "url": {
                  "description": "URL of the website to fetch",
                  "type": "string"
                }
              }
            }
          },
          {
            "name": "mcp__CherryFetch__fetchTxt",
            "description": "Fetch a website, return the content as plain text (no HTML)",
            "parameters": {
              "required": [
                "url"
              ],
              "type": "object",
              "properties": {
                "url": {
                  "description": "URL of the website to fetch",
                  "type": "string"
                }
              }
            }
          },
          {
            "name": "mcp__CherryFetch__fetchJson",
            "description": "Fetch a JSON file from a URL",
            "parameters": {
              "required": [
                "url"
              ],
              "type": "object",
              "properties": {
                "url": {
                  "description": "URL of the JSON to fetch",
                  "type": "string"
                }
              }
            }
          }
        ]
      }
    ],
    "toolConfig": {
      "functionCallingConfig": {
        "mode": "AUTO"
      }
    }
  },
  response: {
    "candidates": [
      {
        "content": {
          "parts": [
            {
              "text": "This URL points to a simple webpage. The content is a basic HTML document with the title \"Example Domain\". The body contains a heading \"Example Domain\" and a paragraph that states: \"This domain is for use in documentation examples without needing permission. Avoid use in operations.\" There is also a link to learn more at `https://iana.org/domains/example`."
            }
          ],
          "role": "model"
        },
        "finishReason": "STOP",
        "index": 0
      }
    ],
    "usageMetadata": {
      "promptTokenCount": 523,
      "candidatesTokenCount": 75,
      "totalTokenCount": 598,
      "promptTokensDetails": [
        {
          "modality": "TEXT",
          "tokenCount": 523
        }
      ]
    },
    "modelVersion": "gemini-2.5-flash-lite-preview-09-2025",
    "responseId": "Gx2Zae6hJu66qtsPoraE-Qg"
  },
  sse: `data: {"nonce": "02851a67b0fb34", "candidates": [{"content": {"parts": [{"text": "## Crafting A Test Response \\nI'm currently structuring a test response, aiming for a robust example. It'll feature a tool call, any type is fine, alongside written content. My focus is on ensuring multiple candidates are included, mirroring standard Gemini output, even if only one is ultimately selected. This response will serve as a good example for assessing the process.\\n\\n","thought": true}],"role": "model"},"index": 0}],"usageMetadata": {"promptTokenCount": 1250,"totalTokenCount": 1250,"promptTokensDetails": [{"modality": "TEXT","tokenCount": 1250}]},"modelVersion": "gemini-3-flash-preview","responseId": "RR6ZaaHEKYGhz7IP1Oym2Q0"}

data: {"nonce": "087085664dc0", "candidates": [{"content": {"parts": [{"text": "**Simulating Multiple Options**\\n\\nI've realized the need to mimic a multi-candidate response, even though I, as a single AI assistant, produce just one. I'm structuring a response with text to make it appear like multiple options. I'll include a \`fetchHtml\` tool call with a status update, plus two text sections representing different \\"candidates\\", each with the tool call, like I would expect. The key is in the formatting, so the user sees a good example.\\n\\n\\n","thought": true}],"role": "model"},"index": 0}],"usageMetadata": {"promptTokenCount": 1250,"totalTokenCount": 1250,"promptTokensDetails": [{"modality": "TEXT","tokenCount": 1250}]},"modelVersion": "gemini-3-flash-preview","responseId": "RR6ZaaHEKYGhz7IP1Oym2Q0"}

data: {"nonce": "46", "candidates": [{"content": {"parts": [{"functionCall": {"name": "mcp__CherryFetch__fetchTxt","args": {"url": "https://example.com"}},"thoughtSignature": "0="}],"role": "model"},"index": 0}],"usageMetadata": {"promptTokenCount": 1250,"candidatesTokenCount": 25,"totalTokenCount": 1891,"promptTokensDetails": [{"modality": "TEXT","tokenCount": 1250}],"thoughtsTokenCount": 616},"modelVersion": "gemini-3-flash-preview","responseId": "RR6ZaaHEKYGhz7IP1Oym2Q0"}

data: {"nonce": "8881c8", "candidates": [{"content": {"parts": [{"text": "another text"}],"role": "model"},"finishReason": "STOP","index": 0}],"usageMetadata": {"promptTokenCount": 1250,"candidatesTokenCount": 25,"totalTokenCount": 1891,"promptTokensDetails": [{"modality": "TEXT","tokenCount": 1250}],"thoughtsTokenCount": 616},"modelVersion": "gemini-3-flash-preview","responseId": "RR6ZaaHEKYGhz7IP1Oym2Q0"}


`
}
