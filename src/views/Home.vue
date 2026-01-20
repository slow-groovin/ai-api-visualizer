<template>
  <div class="min-h-screen bg-gray-100 py-4">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Context Protector</h1>

      <!-- Rule Configuration Section -->
      <RuleConfig />

      <!-- Main Functionality Area -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="grid grid-cols-2 gap-8 h-[600px]">
          <!-- Left Column: Input -->
          <div class="flex flex-col">
            <div class="flex items-center mb-4">
              <button
                @click="doReplace"
                class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mr-4"
                :disabled="!inputText.trim()"
              >
                Replace
              </button>
              <!-- Space for future buttons -->
              <div class="flex-1"></div>
            </div>
            <textarea
              v-model="inputText"
              ref="inputTextarea"
              class="flex-1 p-4 border border-gray-300 rounded-lg resize-none"
              placeholder="粘贴内容到这里..."
              @paste="handlePaste"
            ></textarea>
          </div>

          <!-- Right Column: Output -->
          <div class="flex flex-col">
            <div class="flex items-center mb-4">
              <button
                @click="copyToClipboard"
                class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 mr-4"
                :disabled="!outputText"
              >
                复制
              </button>
              <label class="flex items-center">
                <input
                  v-model="autoCopy"
                  type="checkbox"
                  class="mr-2"
                />
                自动复制
              </label>
            </div>
            <div
              class="flex-1 p-4 border border-gray-300 rounded-lg overflow-auto whitespace-pre-wrap"
              v-html="outputText"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRulesStore } from '../stores/rules'
import { initDatabase, runMigrations, getDatabase } from '../database/index'
import RuleConfig from '../components/RuleConfig.vue'
import { applyReplace, type ReplaceResult } from '../utils/replace'

const rulesStore = useRulesStore()

const inputText = ref('')
const outputText = ref('')
const inputTextarea = ref<HTMLTextAreaElement>()
const autoCopy = ref(false)

// Convert new rule format to old format for applyReplace function
const convertRulesForApply = (rules: any[]) => {
  return rules.map(rule => ({
    id: rule.id,
    match: {
      type: rule.matchType,
      value: rule.matchValue
    },
    target: {
      type: 'fixed' as const,
      value: rule.targetValue
    }
  }))
}

const doReplace = async () => {
  if (!inputText.value.trim()) return

  const rules = convertRulesForApply(rulesStore.rules)
  const result: ReplaceResult = applyReplace(inputText.value, rules)
  outputText.value = result.result

  if (autoCopy.value) {
    await copyToClipboard()
  }
}

const handlePaste = () => {
  // Auto trigger replace on paste
  setTimeout(() => {
    doReplace()
  }, 100)
}

const copyToClipboard = async () => {
  if (!outputText.value) return

  try {
    // Remove HTML tags and decode entities for clipboard
    const plainText = outputText.value
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, '&')

    await navigator.clipboard.writeText(plainText)
    // Could add a toast notification here
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
  }
}

// Initialize database and load rules
onMounted(async () => {
  try {
    await initDatabase()
    await runMigrations()

    await rulesStore.loadRules()

    // Initialize default rules if none exist
    if (rulesStore.rules.length === 0) {
      await rulesStore.initializeDefaultRules()
    }
  } catch (error) {
    console.error('Failed to initialize:', error)
  }
})
</script>