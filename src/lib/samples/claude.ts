export default {
  request: {
  "model": "claude-haiku-4-5-20251001",
  "max_tokens": 32000,
  "stream": true,
  "metadata": {
    "user_id": "user_generic_12345",
    "session_id": "session_generic_abcde"
  },
  "system": [
    {
      "type": "text",
      "text": "You are Claude Code, Anthropic's official CLI for Claude. You are a file search specialist. \n\n<env>\nWorking directory: /home/user/projects/vue-app\nIs directory a git repo: Yes\nPlatform: linux\nDate: 2026-02-21\n</env>\n\nCRITICAL: This is a READ-ONLY task. You CANNOT edit, write, or create files."
    }
  ],
  "messages": [
    {
      "role": "user",
      "content": "Explore the structure of this Vue project. I am specifically interested in:\n1. The implementation of debug pages (src/pages/debug/)\n2. API routing and request handling\n3. How Flow IDs are retrieved and used\n4. Server-Sent Events (SSE) related code\n\nPlease read relevant files and provide key information."
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "I'll help you explore the Vue project structure, specifically looking for debug pages, API routing, Flow IDs, and SSE implementation. I'll start by listing the files in the source directory to understand the layout."
        },
        {
          "type": "tool_use",
          "id": "toolu_01a2b3c4d5e6",
          "name": "Bash",
          "input": {
            "command": "find /home/user/projects/vue-app/src -type f -name \"*.vue\" -o -name \"*.ts\" | head -20",
            "description": "List Vue and TypeScript files to identify relevant components and logic"
          }
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "tool_result",
          "tool_use_id": "toolu_01a2b3c4d5e6",
          "is_error": false,
          "content": "/home/user/projects/vue-app/src/main.ts\n/home/user/projects/vue-app/src/App.vue\n/home/user/projects/vue-app/src/lib/pipeline.ts\n/home/user/projects/vue-app/src/lib/sse-handler.ts\n/home/user/projects/vue-app/src/pages/debug/DebugHome.vue\n/home/user/projects/vue-app/src/pages/debug/NetworkLog.vue\n/home/user/projects/vue-app/src/api/routes.ts\n/home/user/projects/vue-app/src/types/flow.ts"
        }
      ]
    }
  ],
  "tools": [
    {
      "name": "Bash",
      "description": "Executes a given bash command. IMPORTANT: This tool is for terminal operations like git, npm, docker. DO NOT use it for file operations (reading, writing, editing).",
      "input_schema": {
        "type": "object",
        "properties": {
          "command": { "type": "string", "description": "The command to execute" },
          "description": { "type": "string", "description": "Description of what the command does" }
        },
        "required": ["command"]
      }
    },
    {
      "name": "Read",
      "description": "Reads a file from the local filesystem.",
      "input_schema": {
        "type": "object",
        "properties": {
          "file_path": { "type": "string", "description": "The absolute path to the file to read" }
        },
        "required": ["file_path"]
      }
    },
    {
      "name": "Glob",
      "description": "Fast file pattern matching tool.",
      "input_schema": {
        "type": "object",
        "properties": {
          "pattern": { "type": "string", "description": "The glob pattern to match files against" }
        },
        "required": ["pattern"]
      }
    }
  ]
},
  response: {
  "id": "msg_assistant_response_002",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Now, let me examine the other relevant debug page components and App.vue."
    },
    {
      "type": "tool_use",
      "id": "toolu_read_app_vue",
      "name": "Read",
      "input": {
        "file_path": "/home/user/projects/vue-app/src/App.vue"
      }
    },
    {
      "type": "tool_use",
      "id": "toolu_read_injector_test",
      "name": "Read",
      "input": {
        "file_path": "/home/user/projects/vue-app/src/pages/debug/PageInjectorTest.vue"
      }
    },
    {
      "type": "tool_use",
      "id": "toolu_read_dashboard",
      "name": "Read",
      "input": {
        "file_path": "/home/user/projects/vue-app/src/components/Dashboard.vue"
      }
    }
  ],
  "model": "claude-3-5-sonnet-20241022",
  "stop_reason": "tool_use",
  "stop_sequence": null,
  "usage": {
    "input_tokens": 4803,
    "output_tokens": 132,
    "cache_read_input_tokens": 16184
  }
},
  sse: `event: message_start
data: {"type":"message_start","message":{"type":"message","id":"62150746ecad3042139","role":"assistant","content":[],"model":"claude-3-5-sonnet-20241022","stop_reason":null,"stop_sequence":null,"usage":{"input_tokens":4803,"output_tokens":1,"cache_read_input_tokens":16184}}}

event: content_block_start
data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Now, let me examine the other relevant debug page components and App.vue."}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"\\n\\n"}}

event: content_block_stop
data: {"type": "content_block_stop", "index": 0}

event: content_block_start
data: {"type":"content_block_start","index":1,"content_block":{"type":"tool_use","id":"call_9pj9dwhddm2iqzwcxq1tgwp9","name":"Read","input":{}}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"{\\"file_path\\": \\"/"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"home"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"/user"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"/code/"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"mit"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"m"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"proxy"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"-"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"ll"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"m"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"-b"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"etter"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"-view"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"/src"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"/App"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":".vue"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"\\""}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"}"}}

event: content_block_stop
data: {"type": "content_block_stop", "index": 1}

event: content_block_start
data: {"type":"content_block_start","index":2,"content_block":{"type":"tool_use","id":"call_zyd8p4zxkyxit1payh9mnpe9","name":"Read","input":{}}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"{\\"file_path\\": \\"/"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"home"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"/user"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"/code/"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"mit"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"m"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"proxy"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"-"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"ll"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"m"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"-b"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"etter"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"-view"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"/src"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"/pages"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"/"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"debug"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"/"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"Page"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"Inject"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"or"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"Test"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":".vue"}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"\\""}}

event: content_block_delta
data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"}"}}

event: content_block_stop
data: {"type": "content_block_stop", "index": 2}

event: content_block_start
data: {"type":"content_block_start","index":3,"content_block":{"type":"tool_use","id":"call_671t0d5o9su1p0rd0ltffxb1","name":"Read","input":{}}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"{\\"file_path\\": \\"/"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"home"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"/user"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"/code/"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"mit"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"m"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"proxy"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"-"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"ll"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"m"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"-b"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"etter"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"-view"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"/src"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"/components"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"/D"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"ashboard"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":".vue"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"\\""}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"input_json_delta","partial_json":"}"}}

event: content_block_stop
data: {"type": "content_block_stop", "index": 3}

event: message_delta
data: {"type":"message_delta","delta":{"stop_reason":"tool_use","stop_sequence":null},"usage":{"output_tokens":132}}

event: message_stop
data: {"type":"message_stop"}
`
}
