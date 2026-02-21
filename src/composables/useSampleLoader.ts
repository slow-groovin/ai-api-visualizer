import { useRouter, useRoute } from 'vue-router';
import { useLLMStore } from '@/stores/llm';
import { sampleInfoList, loadSampleById } from '@/lib/input-samples';

export function useSampleLoader() {
  const router = useRouter();
  const route = useRoute();
  const llmStore = useLLMStore();

  const handleSampleClick = async (sampleId: string) => {
    const sample = await loadSampleById(sampleId);
    if (sample) {
      llmStore.inputText = sample.content;
      llmStore.standard = sample.standard;
      llmStore.dataType = sample.dataType;
      router.replace({ query: { sample: sampleId } });
    }
  };

  const initSampleFromUrl = async () => {
    const sampleId = route.query.sample as string;
    if (sampleId) {
      const sample = await loadSampleById(sampleId);
      if (sample) {
        llmStore.inputText = sample.content;
        llmStore.standard = sample.standard;
        llmStore.dataType = sample.dataType;
      }
    }
  };

  return {
    sampleInfoList,
    handleSampleClick,
    initSampleFromUrl,
  };
}
