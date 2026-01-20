<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Replace Tool</h1>

      <div class="grid grid-cols-2 gap-8">
        <!-- Left Column: Input -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Input Text</h2>
          <textarea
            v-model="inputText"
            class="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none"
            placeholder="Enter text to replace..."
          ></textarea>

          <div class="mt-4 space-y-2">
            <button
              @click="doReplace"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Do Replace
            </button>

            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="i in 10"
                :key="i"
                @click="loadTestInput(i)"
                class="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Test {{ i }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Output -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Replaced Text</h2>
          <div
            class="h-64 p-4 border border-gray-300 rounded-lg overflow-auto whitespace-pre-wrap"
            v-html="outputText"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { applyReplace, type ReplaceRule } from '../../utils/replace'

// 定义规则
const rules: ReplaceRule[] = [
  { id: 1, match: { type: 'fixed', value: 'hello' }, target: { type: 'fixed', value: 'hi' } },
  { id: 2, match: { type: 'regex', value: '\\bworld\\b' }, target: { type: 'fixed', value: 'earth' } },
  { id: 3, match: { type: 'fixed', value: 'test' }, target: { type: 'fixed', value: 'example' } },
  // 添加更多规则根据需要
]

const inputText = ref('')
const outputText = ref('')

const doReplace = () => {
  outputText.value = applyReplace(inputText.value, rules)
}

const testInputs = [
  'hello world',
  'This is a test string.',
  'hello test world',
  'Replace hello and test.',
  'world test hello',
  'Multiple hello world test instances.',
  `var x = 5;\nlet y = 10;\nfunction foo() {\n  var z = x + y;\n  return react.component;\n}\nvar react = require('react');`,
  'import from /src/utils.js; const file = "/src/index.js";',
  '你好，世界！这是我的世界的你好。世界很大，的的的。',
  'The quick brown fox jumps over the lazy dog. The dog is lazy, and the fox is quick. The the the.'
]

const loadTestInput = (index: number) => {
  inputText.value = testInputs[index - 1] || ''
  doReplace()
}

// 初始显示
doReplace()
</script>