export interface ReplaceRule {
  id: number;
  match: {
    type: 'regex' | 'fixed';
    value: string;
  };
  target: {
    type: 'fixed';
    value: string;
  };
}

export function applyReplace(input: string, rules: ReplaceRule[]): string {
  let result = input;
  const placeholders: { id: string; target: string; ruleId: number }[] = [];

  rules.forEach((rule, index) => {
    const { match, target } = rule;
    let regex: RegExp;
    if (match.type === 'regex') {
      regex = new RegExp(match.value, 'g');
    } else {
      regex = new RegExp(escapeRegExp(match.value), 'g');
    }
    // 使用占位符先替换
    const placeholder = `__REPLACE_${index}__`;
    result = result.replace(regex, () => {
      const uniqueId = `${placeholder}_${placeholders.length}`;
      placeholders.push({ id: uniqueId, target: target.value, ruleId: rule.id });
      return uniqueId;
    });
  });

  // 现在替换占位符为高亮HTML
  placeholders.forEach(({ id, target, ruleId }) => {
    const hue = (ruleId * 49) % 360;
    const bgColor = `hsl(${hue}, 70%, 90%)`;
    const highlighted = `<span style="background-color: ${bgColor};">${escapeHtml(target)}</span>`;
    result = result.replace(new RegExp(escapeRegExp(id), 'g'), highlighted);
  });

  return result;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

