<template>
  <div class="flex flex-col relative h-full">
    <!-- Output Container -->
    <div class="control-bar">
      <RadioButtonGroup v-model:model-value="standard" :options="standardOptions" />
      <br/>
      <RadioButtonGroup v-model:model-value="dataType" :options="dataTypeOptions" />
    </div>
    <!-- <ViewDashboardProxy
            :standard="standard"
            :data-type="dataType"
            :data="inputText"
          /> -->
  </div>
</template>

<script setup lang="ts">
/**
 * OutputPanel Component
 * Renders the LLM API data visualization using ViewDashboardProxy.
 */
import { computed, ref } from 'vue';
import ViewDashboardProxy from './llm/ViewDashboardProxy.vue';
import { dataTypeOptions, standardOptions, type ApiStandard, type DataType } from '../types/llm';
import RadioButtonGroup from './common/RadioButtonGroup.vue';
const standard = ref('openai' as ApiStandard);
const dataType = ref('response' as DataType);


/**
 * Component props
 */
interface Props {
  /** Raw JSON string input */
  inputText?: string;
}

const props = defineProps<Props>();

</script>

<style scoped>
div::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 99px;
}

div::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style>
