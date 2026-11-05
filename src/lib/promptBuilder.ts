import type { PromptConfig } from "@/types/prompt";

/**
 * 根据配置拼接正向prompt
 */
export function buildPositivePrompt(config: PromptConfig): string {
  const parts: string[] = [];

  // 画风
  if (config.style) parts.push(config.style);

  // 角色信息
  const char = config.character;
  const charParts: string[] = [];
  if (char.gender) charParts.push(char.gender);
  if (char.age) charParts.push(char.age);
  if (char.hair) charParts.push(char.hair);
  if (char.eye) charParts.push(char.eye);
  if (char.expression) charParts.push(char.expression);
  if (char.clothes) charParts.push(char.clothes);
  if (char.customText) charParts.push(char.customText);
  if (charParts.length > 0) parts.push(charParts.join(", "));

  // 画面构图、光影
  const scene = config.scene;
  if (scene.composition) parts.push(scene.composition);
  if (scene.light) parts.push(scene.light);

  // 画质关键词数组
  if (config.extraQuality.length > 0) {
    parts.push(config.extraQuality.join(", "));
  }

  return parts.filter(Boolean).join(", ");
}

/**
 * 获取负面prompt，如果关闭则返回空字符串
 */
export function buildNegativePrompt(config: PromptConfig): string {
  if (!config.useNegative) return "";
  return config.negativeText;
}

/**
 * 一次性生成正负prompt，返回对象
 */
export function generatePrompt(config: PromptConfig) {
  const positive = buildPositivePrompt(config);
  const negative = buildNegativePrompt(config);
  return {
    positive,
    negative,
  };
}
