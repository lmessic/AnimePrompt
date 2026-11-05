// 提示词配置项
export interface PromptConfig {
  style: string;
  character: {
    gender: string;
    age: string;
    hair: string;
    eye: string;
    expression: string;
    clothes: string;
    customText: string;
  };
  scene: {
    composition: string;
    light: string;
  };
  extraQuality: string[];
  useNegative: boolean;
  negativeText: string;
}

// 历史记录条目
export interface HistoryItem {
  id: string;
  createTime: number;
  config: PromptConfig;
  finalPrompt: string;
  negativePrompt: string;
}

// 收藏模板
export interface TemplateItem {
  id: string;
  name: string;
  config: PromptConfig;
}

export const defaultPromptConfig: PromptConfig = {
  style: "",
  character: {
    gender: "",
    age: "",
    hair: "",
    eye: "",
    expression: "",
    clothes: "",
    customText: "",
  },
  scene: {
    composition: "",
    light: "",
  },
  extraQuality: [],
  useNegative: true,
  negativeText:
    "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
};
