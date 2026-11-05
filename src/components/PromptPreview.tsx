"use client";
import { useState } from "react";
import { usePromptStore } from "@/store/promptStore";
import { useToastStore } from "@/store/toastStore";

export default function PromptPreview() {
  const { generateAndSavePrompt, saveAsTemplate } = usePromptStore();
  const { showToast } = useToastStore();
  const [result, setResult] = useState({ positive: "", negative: "" });
  const [templateName, setTemplateName] = useState("");
  const [showTemplateInput, setShowTemplateInput] = useState(false);

  // 生成prompt
  const handleGenerate = () => {
    const data = generateAndSavePrompt();
    setResult(data);
    showToast("生成成功，已保存到历史记录");
  };

  const copyText = async (text: string, label: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    showToast(`${label}已复制`);
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) return;
    saveAsTemplate(templateName.trim());
    setTemplateName("");
    setShowTemplateInput(false);
    showToast("模板保存成功");
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium"
      >
        ✨ 生成 Prompt
      </button>

      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-medium">正向提示词</h3>
          <button
            onClick={() => copyText(result.positive, "正向提示词")}
            className="text-blue-600 hover:underline text-sm dark:text-blue-400"
          >
            复制
          </button>
        </div>
        <textarea
          readOnly
          value={result.positive}
          placeholder="点击上方生成按钮"
          rows={6}
          className="mt-1 w-full rounded-lg border p-2 dark:bg-slate-700 dark:border-slate-600"
        />
      </div>

      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-medium">负面提示词</h3>
          <button
            onClick={() => copyText(result.negative, "负面提示词")}
            className="text-blue-600 hover:underline text-sm dark:text-blue-400"
          >
            复制
          </button>
        </div>
        <textarea
          readOnly
          value={result.negative}
          placeholder="启用负面词才会生成"
          rows={4}
          className="mt-1 w-full rounded-lg border p-2 dark:bg-slate-700 dark:border-slate-600"
        />
      </div>

      <div className="border-t pt-4">
        {!showTemplateInput ? (
          <button
            onClick={() => setShowTemplateInput(true)}
            className="w-full py-2 border rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 dark:border-slate-600"
          >
            将当前配置保存为模板
          </button>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="输入模板名称"
              className="w-full rounded-lg border p-2 dark:bg-slate-700 dark:border-slate-600"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveTemplate}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                确认保存
              </button>
              <button
                onClick={() => setShowTemplateInput(false)}
                className="flex-1 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 dark:bg-slate-600 dark:hover:bg-slate-500"
              >
                取消
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
