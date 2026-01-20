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

            <!-- Configuration Section -->
            <details class="mt-8 bg-white rounded-lg shadow p-6">
                <summary class="cursor-pointer text-xl font-semibold mb-4">
                    Replace Rules Configuration
                </summary>

                <div class="mb-6">
                    <button
                        @click="restoreDefaults"
                        class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
                    >
                        Restore Default Rules
                    </button>
                    <p class="text-sm text-gray-600 mt-2">
                        This will restore the default test rules (IDs 1-10)
                        without affecting your custom rules.
                    </p>
                </div>

                <!-- Add New Rule Form -->
                <div class="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h3 class="text-lg font-medium mb-4">Add New Rule</h3>
                    <form @submit.prevent="addRule" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-1"
                                    >Match Type</label
                                >
                                <select
                                    v-model="newRule.match.type"
                                    class="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="fixed">Fixed String</option>
                                    <option value="regex">
                                        Regular Expression
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1"
                                    >Match Value</label
                                >
                                <input
                                    v-model="newRule.match.value"
                                    type="text"
                                    required
                                    class="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Value to match"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1"
                                    >Replace With</label
                                >
                                <input
                                    v-model="newRule.target.value"
                                    type="text"
                                    required
                                    class="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Replacement text"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                        >
                            Add Rule
                        </button>
                    </form>
                </div>

                <!-- Rules List -->
                <div class="space-y-4">
                    <h3 class="text-lg font-medium">Current Rules</h3>
                    <div v-if="rules.length === 0" class="text-gray-500 italic">
                        No rules configured yet.
                    </div>
                    <div
                        v-for="rule in rules"
                        :key="rule.id"
                        class="p-4 border border-gray-200 rounded-lg"
                    >
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <div
                                    class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm"
                                >
                                    <div>
                                        <strong>Type:</strong>
                                        {{ rule.match.type }}
                                    </div>
                                    <div>
                                        <strong>Match:</strong>
                                        <code>{{ rule.match.value }}</code>
                                    </div>
                                    <div>
                                        <strong>Replace:</strong>
                                        <code>{{ rule.target.value }}</code>
                                    </div>
                                </div>
                            </div>
                            <div class="flex space-x-2 ml-4">
                                <button
                                    @click="editRule(rule)"
                                    class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    @click="deleteRule(rule.id)"
                                    class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
    applyReplace,
    type ReplaceRule,
    loadRules,
    saveRules,
    getNextRuleId,
    restoreDefaultRules,
} from "../../utils/replace";

// 加载规则
const rules = ref<ReplaceRule[]>(loadRules());

const inputText = ref("");
const outputText = ref("");

const newRule = ref({
    match: { type: "fixed" as "fixed" | "regex", value: "" },
    target: { type: "fixed" as "fixed", value: "" },
});

const doReplace = () => {
    outputText.value = applyReplace(inputText.value, rules.value);
};

const testInputs = [
    "hello world",
    "This is a test string.",
    "hello test world",
    "Replace hello and test.",
    "world test hello",
    "Multiple hello world test instances.",
    `var x = 5;\nlet y = 10;\nfunction foo() {\n  var z = x + y;\n  return react.component;\n}\nvar react = require('react');`,
    'import from /src/utils.js; const file = "/src/index.js";',
    "你好，世界！这是我的世界的你好。世界很大，的的的。",
    "The quick brown fox jumps over the lazy dog. The dog is lazy, and the fox is quick. The the the.",
];

const loadTestInput = (index: number) => {
    inputText.value = testInputs[index - 1] || "";
    doReplace();
};

const restoreDefaults = () => {
    rules.value = restoreDefaultRules();
    doReplace();
};

const addRule = () => {
    const rule: ReplaceRule = {
        id: getNextRuleId(),
        match: { ...newRule.value.match },
        target: { ...newRule.value.target },
    };
    rules.value.push(rule);
    saveRules(rules.value);
    newRule.value = {
        match: { type: "fixed", value: "" },
        target: { type: "fixed", value: "" },
    };
    doReplace();
};

const deleteRule = (id: number) => {
    rules.value = rules.value.filter((r) => r.id !== id);
    saveRules(rules.value);
    doReplace();
};

const editRule = (rule: ReplaceRule) => {
    // For simplicity, we'll just populate the form with the rule data
    newRule.value.match = { ...rule.match };
    newRule.value.target = { ...rule.target };
    deleteRule(rule.id); // Remove the old one, user can re-add
};

// 初始显示
doReplace();
</script>
