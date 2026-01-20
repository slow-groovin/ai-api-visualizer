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

            <!-- Restore Section -->
            <div class="mt-8 grid grid-cols-2 gap-8">
                <!-- Left Column: Restore Input -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-xl font-semibold mb-4">
                        AI Model Output (for Restore)
                    </h2>
                    <textarea
                        v-model="restoreInputText"
                        class="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none"
                        placeholder="Paste AI model response content here..."
                    ></textarea>

                    <div class="mt-4">
                        <button
                            @click="doRestore"
                            class="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
                        >
                            Do Restore
                        </button>
                    </div>
                </div>

                <!-- Right Column: Restore Output -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-xl font-semibold mb-4">Restored Content</h2>
                    <div
                        class="h-64 p-4 border border-gray-300 rounded-lg overflow-auto whitespace-pre-wrap"
                        v-html="restoreOutputText"
                    ></div>
                </div>
            </div>

            <!-- Mock AI Output Section -->
            <div class="mt-8 grid grid-cols-2 gap-8">
                <!-- Left Column: Mock Generator -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-xl font-semibold mb-4">
                        Mock AI Output Generator
                    </h2>
                    <div class="mb-4 space-y-2">
                        <div class="grid grid-cols-2 gap-2">
                            <button
                                @click="generateMockChinese"
                                class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Generate Chinese Mock
                            </button>
                            <button
                                @click="generateMockEnglish"
                                class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                            >
                                Generate English Mock
                            </button>
                        </div>
                        <button
                            @click="initDatabaseTables"
                            class="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
                        >
                            Initialize Database Tables
                        </button>
                    </div>
                    <textarea
                        v-model="mockOutputText"
                        readonly
                        class="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none bg-gray-50"
                        placeholder="Generated mock output will appear here..."
                    ></textarea>
                </div>

                <!-- Right Column: Current Task Information -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-xl font-semibold mb-4">
                        Current Task Information
                    </h2>
                    <div class="mb-4">
                        <strong>Task ID:</strong>
                        {{ currentTaskId || "No task yet" }}
                    </div>
                    <div>
                        <strong>Replacement History:</strong>
                        <div
                            v-if="currentHistory.length === 0"
                            class="text-gray-500 italic mt-2"
                        >
                            No replacements performed yet.
                        </div>
                        <div
                            v-else
                            class="mt-2 space-y-2 max-h-64 overflow-auto"
                        >
                            <div
                                v-for="(entry, index) in currentHistory"
                                :key="index"
                                class="p-2 border border-gray-200 rounded text-sm"
                            >
                                <div>
                                    <strong>Rule ID:</strong> {{ entry.ruleId }}
                                </div>
                                <div>
                                    <strong>Original:</strong>
                                    <code>{{ entry.originalMatch }}</code> ({{
                                        entry.originalMatchType
                                    }})
                                </div>
                                <div>
                                    <strong>Replaced:</strong>
                                    <code>{{ entry.replacedWith }}</code> ({{
                                        entry.replacedWithType
                                    }})
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Configuration Section -->
            <details class="mt-8 bg-white rounded-lg shadow p-6">
                <summary class="cursor-pointer text-xl font-semibold mb-4">
                    Replace Rules Configuration
                </summary>

                <div class="mb-6 space-y-4">
                    <div>
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
    type ReplaceResult,
    loadRules,
    saveRules,
    getNextRuleId,
    restoreDefaultRules,
} from "../../utils/replace";
import { escapeRegExp } from "../../utils/replace";
import { initDatabase, runMigrations, getDatabase } from "../../database/index";
import { debugReplaceHistory } from "../../database/schema";
import { eq } from "drizzle-orm";

// 加载规则
const rules = ref<ReplaceRule[]>(loadRules());

const inputText = ref("");
const outputText = ref("");
const currentTaskId = ref<string>("");
const currentHistory = ref<any[]>([]);
const restoreInputText = ref("");
const restoreOutputText = ref("");
const mockOutputText = ref("");

const newRule = ref({
    match: { type: "fixed" as "fixed" | "regex", value: "" },
    target: { type: "fixed" as "fixed", value: "" },
});

const doReplace = async () => {
    // Generate new task ID for this replacement session
    currentTaskId.value = `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const replaceResult: ReplaceResult = applyReplace(
        inputText.value,
        rules.value,
    );
    outputText.value = replaceResult.result;
    currentHistory.value = replaceResult.history;

    // Save replacement history to database
    if (replaceResult.history.length > 0) {
        try {
            const db = await getDatabase();
            if (!db) {
                console.error("Database not initialized");
                return;
            }
            const historyEntries = replaceResult.history.map((entry) => ({
                taskId: currentTaskId.value,
                originalMatch: entry.originalMatch,
                originalMatchType: entry.originalMatchType,
                replacedWith: entry.replacedWith,
                replacedWithType: entry.replacedWithType,
                ruleId: entry.ruleId,
                createdAt: new Date().toISOString(),
            }));
            await db.insert(debugReplaceHistory).values(historyEntries);
        } catch (error) {
            console.error("Failed to save replacement history:", error);
        }
    }
};

const doRestore = async () => {
    if (!currentTaskId.value || !restoreInputText.value) {
        restoreOutputText.value =
            "No replacement history or input text available.";
        return;
    }

    const taskId = currentTaskId.value;
    try {
        const db = await getDatabase();
        if (!db) {
            restoreOutputText.value = "Database not initialized.";
            return;
        }
        const historyRecords = await db
            .select()
            .from(debugReplaceHistory)
            .where(eq(debugReplaceHistory.taskId, taskId));

        if (historyRecords.length === 0) {
            restoreOutputText.value =
                "No replacement history found for current task.";
            return;
        }

        let result = restoreInputText.value;

        // Reverse the replacements: replacedWith -> originalMatch
        historyRecords.forEach((record) => {
            let regex: RegExp;
            if (record.replacedWithType === "regex") {
                regex = new RegExp(record.replacedWith, "g");
            } else {
                regex = new RegExp(escapeRegExp(record.replacedWith), "g");
            }
            result = result.replace(regex, record.originalMatch);
        });

        restoreOutputText.value = result;
    } catch (error) {
        console.error("Failed to restore content:", error);
        restoreOutputText.value =
            "Error occurred during restore. Check console for details.";
    }
};

// Mock generators
const generateMockChinese = async () => {
    if (!currentTaskId.value) {
        mockOutputText.value =
            "No replacement history available. Please perform a replace first.";
        return;
    }

    try {
        const db = await getDatabase();
        if (!db) {
            mockOutputText.value = "Database not initialized.";
            return;
        }
        const historyRecords = await db
            .select()
            .from(debugReplaceHistory)
            .where(
                eq(debugReplaceHistory.taskId, currentTaskId.value as string),
            );

        if (historyRecords.length === 0) {
            mockOutputText.value = "No replacement history found.";
            return;
        }

        const baseChars = ["一", "二", "三", "四"];
        const replacedWords = [
            ...new Set(historyRecords.map((r) => r.replacedWith)),
        ];
        const allWords = [...replacedWords, ...baseChars];
        const sentenceLength =
            replacedWords.length * (Math.floor(Math.random() * 5) + 1);
        const words: string[] = [];

        // Ensure each replaced word appears at least once
        words.push(...replacedWords);

        // Add additional random words to reach the desired length
        while (words.length < sentenceLength) {
            const randomIndex = Math.floor(Math.random() * allWords.length);
            words.push(allWords[randomIndex]!);
        }

        // Shuffle the words
        for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            if (!words[i] || !words[j]) {
                continue;
            }
            [words[i], words[j]] = [words[j]!, words[i]!];
        }

        mockOutputText.value = words.join("");
    } catch (error) {
        console.error("Failed to generate mock Chinese:", error);
        mockOutputText.value = "Error generating mock output.";
    }
};

const generateMockEnglish = async () => {
    if (!currentTaskId.value) {
        mockOutputText.value =
            "No replacement history available. Please perform a replace first.";
        return;
    }

    try {
        const db = await getDatabase();
        if (!db) {
            mockOutputText.value = "Database not initialized.";
            return;
        }
        const historyRecords = await db
            .select()
            .from(debugReplaceHistory)
            .where(
                eq(debugReplaceHistory.taskId, currentTaskId.value as string),
            );

        if (historyRecords.length === 0) {
            mockOutputText.value = "No replacement history found.";
            return;
        }

        const baseWords = ["my", "you", "this", "what", "can", "do"];
        const replacedWords = [
            ...new Set(historyRecords.map((r) => r.replacedWith)),
        ];
        const allWords = [...replacedWords, ...baseWords];
        const sentenceLength =
            replacedWords.length * (Math.floor(Math.random() * 5) + 1);
        const words: string[] = [];

        // Ensure each replaced word appears at least once
        words.push(...replacedWords);

        // Add additional random words to reach the desired length
        while (words.length < sentenceLength) {
            const randomIndex = Math.floor(Math.random() * allWords.length);
            words.push(allWords[randomIndex]!);
        }

        // Shuffle the words
        for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [words[i], words[j]] = [words[j]!, words[i]!];
        }

        mockOutputText.value = words.join(" ");
    } catch (error) {
        console.error("Failed to generate mock English:", error);
        mockOutputText.value = "Error generating mock output.";
    }
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

const initDatabaseTables = async () => {
    try {
        await initDatabase();
        await runMigrations();
        alert("Database tables initialized successfully!");
    } catch (error) {
        console.error("Failed to initialize database:", error);
        alert("Failed to initialize database. Check console for details.");
    }
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
