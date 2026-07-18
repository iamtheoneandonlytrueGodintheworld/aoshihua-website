import { contentApi } from "@/services/contentApi";
import { useContent } from "@/hooks/useContent";

export interface CompanyInfo {
  name: string;
  slogan: string;
  description: string;
  footerDescription: string;
  phone: string;
  email: string;
  address: string;
  foundedYear: number;
  values: { title: string; desc: string }[];
  milestones: { year: string; title: string; desc: string }[];
  honors: { title: string; desc: string }[];
  stats: { value: number; suffix: string; label: string }[];
  wechatId: string;
  wechatQr: string;
  mapLat: number;
  mapLng: number;
}

export const companyApi = {
  get: () => contentApi.getCompany(),
};

export function useCompany() {
  return useContent(companyApi.get);
}
