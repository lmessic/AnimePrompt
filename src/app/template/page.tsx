"use client";
import { usePromptStore } from "@/store/promptStore";
import { useToastStore } from "@/store/toastStore";
import { useState } from "react";

export default function TemplatePage() {
  const { templateList, deleteTemplate, renameTemplate, loadTemplateToForm } =
    usePromptStore();
  const { showToast } = useToastStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const startRename = (id: string, oldName: string) => {
    setEditingId(id);
    setEditName(oldName);
  };

  const submitRename = (id: string) => {
    if (!editName.trim()) return;
    renameTemplate(id, editName.trim());
    setEditingId(null);
    showToast("模板重命名成功");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">我的模板</h1>

      {templateList.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-lg">暂无保存模板</p>
          <p className="mt-2">在首页生成Prompt后保存模板</p>
        </div>
      ) : (
        <div className="space-y-4">
          {templateList.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 dark:border-slate-600 dark:bg-slate-800"
            >
              {editingId === item.id ? (
                <div className="flex gap-2">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 rounded border p-2 dark:bg-slate-700 dark:border-slate-600"
                  />
                  <button
                    onClick={() => submitRename(item.id)}
                    className="px-3 py-1.5 bg-green-500 text-white rounded text-sm"
                  >
                    确认
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1.5 bg-gray-500 text-white rounded text-sm"
                  >
                    取消
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        loadTemplateToForm(item);
                        showToast("模板配置已加载");
                      }}
                      className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      加载配置
                    </button>
                    <button
                      onClick={() => startRename(item.id, item.name)}
                      className="px-3 py-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 text-sm"
                    >
                      重命名
                    </button>
                    <button
                      onClick={() => {
                        deleteTemplate(item.id);
                        showToast("模板已删除");
                      }}
                      className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      删除
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
