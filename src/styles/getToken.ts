import tokens from "./tokens.json";

type Mode = "light" | "dark" | "general";

export function getToken(key: string, mode: Mode = "general"): string {
  const group = tokens[mode] as Record<string, string>;

  if (group && group[key]) {
    return group[key];
  }

  console.warn(`Token "${key}" no encontrado en modo "${mode}".`);
  return "";
}
