import { contentApi } from "@/services/contentApi";
import { useContent } from "@/hooks/useContent";

export interface ChatKnowledgeItem {
  keywords: string[];
  response: string;
}

export interface ChatKnowledgeData {
  welcomeMessage: string;
  fallbackMessage: string;
  humanHandoffMessage: string;
  knowledge: ChatKnowledgeItem[];
}

export const chatKnowledgeApi = {
  get: () => contentApi.getChatKnowledge(),
};

export function useChatKnowledge() {
  return useContent(chatKnowledgeApi.get);
}

export function findResponse(
  knowledge: ChatKnowledgeItem[],
  input: string
): string | null {
  const normalized = input.toLowerCase();
  for (const item of knowledge) {
    if (item.keywords.some((kw) => normalized.includes(kw))) {
      return item.response;
    }
  }
  return null;
}
