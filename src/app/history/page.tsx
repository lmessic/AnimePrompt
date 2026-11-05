"use client";
import { usePromptStore } from "@/store/promptStore";
import { useToastStore } from "@/store/toastStore";

export default function HistoryPage() {
  const { historyList, deleteHistoryItem, clearAllHistory, loadHistoryToForm } =
    usePromptStore();
  const { showToast } = useToastStore();

  // 格式化时间戳
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("zh-CN");
  };

  // 复制文本
  const copyPrompt = async (text: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    showToast("正向提示词已复制！");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">历史记录</h1>
        {historyList.length > 0 && (
          <button
            onClick={() => {
              if (confirm("确定清空全部历史？")) {
                clearAllHistory();
                showToast("已清空全部历史记录");
              }
            }}
            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            清空全部
          </button>
        )}
      </div>

      {historyList.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-lg">暂无历史记录</p>
          <p className="mt-2">去首页生成第一条Prompt吧</p>
        </div>
      ) : (
        <div className="space-y-4">
          {historyList.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 dark:border-slate-600 dark:bg-slate-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatTime(item.createTime)}
                  </p>
                  <p className="mt-2 line-clamp-2">{item.finalPrompt}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    loadHistoryToForm(item);
                    showToast("配置已加载到表单");
                  }}
                  className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  加载配置
                </button>
                <button
                  onClick={() => copyPrompt(item.finalPrompt)}
                  className="px-3 py-1.5 bg-emerald-500 text-white rounded hover:bg-emerald-600 text-sm"
                >
                  复制正向Prompt
                </button>
                <button
                  onClick={() => {
                    deleteHistoryItem(item.id);
                    showToast("记录已删除");
                  }}
                  className="px-3 py-1.5 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
