"use client";
export default function HomePage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">动漫Prompt生成器</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
          <h3 className="font-medium mb-3">配置面板</h3>
          <p className="text-slate-500">待开发表单</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
          <h3 className="font-medium mb-3">Prompt预览</h3>
          <p className="text-slate-500">待开发预览面板</p>
        </div>
      </div>
    </div>
  );
}
