"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PromptConfig, HistoryItem, TemplateItem } from "@/types/prompt";
import { defaultPromptConfig } from "@/types/prompt";
import { generatePrompt } from "@/lib/promptBuilder";
import { v4 as uuidv4 } from "uuid";

interface PromptStore {
  // 当前表单配置
  currentConfig: PromptConfig;
  // 历史记录列表
  historyList: HistoryItem[];
  // 模板列表
  templateList: TemplateItem[];
  // 深色主题开关
  isDark: boolean;

  // 更新表单配置
  setCurrentConfig: (partialConfig: Partial<PromptConfig>) => void;
  // 重置表单回到默认
  resetCurrentConfig: () => void;
  // 生成prompt并新增一条历史记录，返回 {positive,negative}
  generateAndSavePrompt: () => { positive: string; negative: string };

  // 历史记录操作
  deleteHistoryItem: (id: string) => void;
  clearAllHistory: () => void;
  loadHistoryToForm: (item: HistoryItem) => void;

  // 模板操作
  saveAsTemplate: (templateName: string) => void;
  deleteTemplate: (id: string) => void;
  renameTemplate: (id: string, newName: string) => void;
  loadTemplateToForm: (item: TemplateItem) => void;

  // 主题切换
  toggleTheme: () => void;

  // 新增：填充Mock模拟数据
  fillMockData: () => void;
}

export const usePromptStore = create<PromptStore>()(
  persist(
    (set, get) => ({
      currentConfig: structuredClone(defaultPromptConfig),
      historyList: [],
      templateList: [],
      isDark: false,

      setCurrentConfig: (partialConfig) => {
        set((state) => ({
          currentConfig: {
            ...state.currentConfig,
            ...partialConfig,
          },
        }));
      },

      resetCurrentConfig: () => {
        set({ currentConfig: structuredClone(defaultPromptConfig) });
      },

      generateAndSavePrompt: () => {
        const { currentConfig, historyList } = get();
        // 调用工具函数拼接prompt
        const { positive, negative } = generatePrompt(currentConfig);

        const newHistoryItem: HistoryItem = {
          id: uuidv4(),
          createTime: Date.now(),
          config: structuredClone(currentConfig),
          finalPrompt: positive,
          negativePrompt: negative,
        };

        // 新记录插入最前面
        set({ historyList: [newHistoryItem, ...historyList] });
        return { positive, negative };
      },

      // 历史
      deleteHistoryItem: (id) => {
        const { historyList } = get();
        set({ historyList: historyList.filter((h) => h.id !== id) });
      },
      clearAllHistory: () => {
        set({ historyList: [] });
      },
      loadHistoryToForm: (item) => {
        set({ currentConfig: structuredClone(item.config) });
      },

      // 模板
      saveAsTemplate: (templateName) => {
        const { currentConfig, templateList } = get();
        const newTemplate: TemplateItem = {
          id: uuidv4(),
          name: templateName,
          config: structuredClone(currentConfig),
        };
        set({ templateList: [newTemplate, ...templateList] });
      },
      deleteTemplate: (id) => {
        const { templateList } = get();
        set({ templateList: templateList.filter((t) => t.id !== id) });
      },
      renameTemplate: (id, newName) => {
        const { templateList } = get();
        set({
          templateList: templateList.map((t) =>
            t.id === id ? { ...t, name: newName } : t,
          ),
        });
      },
      loadTemplateToForm: (item) => {
        set({ currentConfig: structuredClone(item.config) });
      },

      toggleTheme: () => {
        set((state) => ({ isDark: !state.isDark }));
      },
      fillMockData: () => {
        const mockHistory: HistoryItem[] = [
          {
            id: uuidv4(),
            createTime: Date.now() - 1000 * 60 * 3, //3分钟前
            config: {
              style: "shinkai makoto",
              character: {
                gender: "少女",
                age: "青少年",
                hair: "长发",
                eye: "蓝瞳",
                expression: "微笑",
                clothes: "连衣裙",
                customText: "风吹起长发，花瓣飘落",
              },
              scene: { composition: "半身像", light: "黄昏" },
              extraQuality: ["masterpiece", "best quality"],
              useNegative: true,
              negativeText: defaultPromptConfig.negativeText,
            },
            finalPrompt:
              "shinkai makoto, 少女, 青少年, 长发, 蓝瞳, 微笑, 连衣裙, 风吹起长发，花瓣飘落, 半身像, 黄昏, masterpiece, best quality",
            negativePrompt: defaultPromptConfig.negativeText,
          },
          {
            id: uuidv4(),
            createTime: Date.now() - 1000 * 60 * 20, //20分钟前
            config: {
              style: "ghibli style",
              character: {
                gender: "少年",
                age: "青年",
                hair: "短发",
                eye: "黑瞳",
                expression: "平静",
                clothes: "风衣",
                customText: "站在草原上，远处云朵",
              },
              scene: { composition: "全身像", light: "柔光" },
              extraQuality: ["masterpiece"],
              useNegative: true,
              negativeText: defaultPromptConfig.negativeText,
            },
            finalPrompt:
              "ghibli style, 少年, 青年, 短发, 黑瞳, 平静, 风衣, 站在草原上，远处云朵, 全身像, 柔光, masterpiece",
            negativePrompt: defaultPromptConfig.negativeText,
          },
        ];

        const mockTemplates: TemplateItem[] = [
          {
            id: uuidv4(),
            name: "新海诚少女半身模板",
            config: {
              style: "shinkai makoto",
              character: {
                gender: "少女",
                age: "青少年",
                hair: "长发",
                eye: "蓝瞳",
                expression: "微笑",
                clothes: "连衣裙",
                customText: "",
              },
              scene: { composition: "半身像", light: "黄昏" },
              extraQuality: ["masterpiece", "best quality"],
              useNegative: true,
              negativeText: defaultPromptConfig.negativeText,
            },
          },
          {
            id: uuidv4(),
            name: "吉卜力草原少年",
            config: {
              style: "ghibli style",
              character: {
                gender: "少年",
                age: "青年",
                hair: "短发",
                eye: "黑瞳",
                expression: "平静",
                clothes: "风衣",
                customText: "",
              },
              scene: { composition: "全身像", light: "柔光" },
              extraQuality: ["masterpiece"],
              useNegative: true,
              negativeText: defaultPromptConfig.negativeText,
            },
          },
        ];

        set({
          historyList: mockHistory,
          templateList: mockTemplates,
        });
      },
    }),
    {
      name: "anime-prompt-storage", // localStorage key
    },
  ),
);
