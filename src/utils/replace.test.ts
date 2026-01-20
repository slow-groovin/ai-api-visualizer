import { describe, it, expect } from 'vitest';
import { applyReplace, type ReplaceRule } from './replace';

describe('applyReplace', () => {
  it('should replace fixed string with highlighting', () => {
    const rules: ReplaceRule[] = [
      { id: 1, match: { type: 'fixed', value: 'hello' }, target: { type: 'fixed', value: 'hi' } }
    ];
    const input = 'hello world';
    const result = applyReplace(input, rules);
    expect(result).toBe('<span style="background-color: hsl(49, 70%, 90%);">hi</span> world');
  });

  it('should replace regex with highlighting', () => {
    const rules: ReplaceRule[] = [
      { id: 2, match: { type: 'regex', value: '\\b\\w+\\b' }, target: { type: 'fixed', value: 'word' } }
    ];
    const input = 'hello world';
    const result = applyReplace(input, rules);
    expect(result).toBe('<span style="background-color: hsl(98, 70%, 90%);">word</span> <span style="background-color: hsl(98, 70%, 90%);">word</span>');
  });

  it('should handle multiple rules', () => {
    const rules: ReplaceRule[] = [
      { id: 1, match: { type: 'fixed', value: 'a' }, target: { type: 'fixed', value: 'A' } },
      { id: 2, match: { type: 'fixed', value: 'b' }, target: { type: 'fixed', value: 'B' } }
    ];
    const input = 'abc';
    const result = applyReplace(input, rules);
    expect(result).toBe('<span style="background-color: hsl(49, 70%, 90%);">A</span><span style="background-color: hsl(98, 70%, 90%);">B</span>c');
  });

  it('should escape HTML in target', () => {
    const rules: ReplaceRule[] = [
      { id: 1, match: { type: 'fixed', value: 'test' }, target: { type: 'fixed', value: '<script>' } }
    ];
    const input = 'test';
    const result = applyReplace(input, rules);
    expect(result).toBe('<span style="background-color: hsl(49, 70%, 90%);">&lt;script&gt;</span>');
  });

  it('should handle no matches', () => {
    const rules: ReplaceRule[] = [
      { id: 1, match: { type: 'fixed', value: 'xyz' }, target: { type: 'fixed', value: 'abc' } }
    ];
    const input = 'hello';
    const result = applyReplace(input, rules);
    expect(result).toBe('hello');
  });

  it('should replace multiple occurrences', () => {
    const rules: ReplaceRule[] = [
      { id: 1, match: { type: 'fixed', value: 'a' }, target: { type: 'fixed', value: 'A' } }
    ];
    const input = 'a b a';
    const result = applyReplace(input, rules);
    expect(result).toBe('<span style="background-color: hsl(49, 70%, 90%);">A</span> b <span style="background-color: hsl(49, 70%, 90%);">A</span>');
  });

  // 测试预设input，但那是页面逻辑，这里只测函数
});

describe('applyReplace - complex scenarios', () => {
  it('should handle code replacement with multiple variable names', () => {
    const rules: ReplaceRule[] = [
      { id: 1, match: { type: 'fixed', value: 'var' }, target: { type: 'fixed', value: 'let' } },
      { id: 2, match: { type: 'fixed', value: 'let' }, target: { type: 'fixed', value: 'const' } },
      { id: 3, match: { type: 'fixed', value: 'react' }, target: { type: 'fixed', value: 'vue' } },
      { id: 4, match: { type: 'regex', value: '\\bfunction\\b' }, target: { type: 'fixed', value: 'arrow' } }
    ];
    const input = `
var x = 5;
let y = 10;
function foo() {
  var z = x + y;
  return react.component;
}
var react = require('react');
    `;
    const result = applyReplace(input, rules);
    // Note: replacements are applied in order, so 'var' -> 'let', then 'let' -> 'const', but since 'var' is already 'let', wait no
    // In this code, rules are applied sequentially, so first 'var' to 'let', then 'let' to 'const' on the result.
    expect(result).toContain('<span style="background-color: hsl(49, 70%, 90%);">let</span>'); // var -> let
    expect(result).toContain('<span style="background-color: hsl(98, 70%, 90%);">const</span>'); // let -> const
    expect(result).toContain('<span style="background-color: hsl(147, 70%, 90%);">vue</span>'); // react -> vue
    expect(result).toContain('<span style="background-color: hsl(196, 70%, 90%);">arrow</span>'); // function -> arrow
  });

  it('should handle path name replacements in code', () => {
    const rules: ReplaceRule[] = [
      { id: 5, match: { type: 'regex', value: '/src/' }, target: { type: 'fixed', value: '/dist/' } },
      { id: 6, match: { type: 'regex', value: '\\.js' }, target: { type: 'fixed', value: '.ts' } }
    ];
    const input = 'import from /src/utils.js; const file = "/src/index.js";';
    const result = applyReplace(input, rules);
    expect(result).toContain('<span style="background-color: hsl(245, 70%, 90%);">/dist/</span>');
    expect(result).toContain('<span style="background-color: hsl(294, 70%, 90%);">.ts</span>');
  });

  it('should handle Chinese text with multiple repeated replacements', () => {
    const rules: ReplaceRule[] = [
      { id: 7, match: { type: 'fixed', value: '你好' }, target: { type: 'fixed', value: '您好' } },
      { id: 8, match: { type: 'fixed', value: '世界' }, target: { type: 'fixed', value: '地球' } },
      { id: 9, match: { type: 'regex', value: '的' }, target: { type: 'fixed', value: '之' } }
    ];
    const input = '你好，世界！这是我的世界的你好。世界很大，的的的。';
    const result = applyReplace(input, rules);
    expect(result).toContain('<span style="background-color: hsl(343, 70%, 90%);">您好</span>');
    expect(result).toContain('<span style="background-color: hsl(32, 70%, 90%);">地球</span>');
    expect(result).toContain('<span style="background-color: hsl(81, 70%, 90%);">之</span>');
    // Count occurrences
    const countNihao = (result.match(/您好/g) || []).length;
    const countWorld = (result.match(/地球/g) || []).length;
    const countDe = (result.match(/之/g) || []).length;
    expect(countNihao).toBe(2); // 你好 appears twice
    expect(countWorld).toBe(3); // 世界 appears three times
    expect(countDe).toBe(5); // 的 appears five times
  });



  it('should handle long text with many replacements', () => {
    const rules: ReplaceRule[] = [
      { id: 12, match: { type: 'regex', value: '\\bthe\\b' }, target: { type: 'fixed', value: 'THE' } }
    ];
    const input = 'The quick brown fox jumps over the lazy dog. The dog is lazy, and the fox is quick. The the the.';
    const result = applyReplace(input, rules);
    const count = (result.match(/THE/g) || []).length;
    expect(count).toBe(4); // 4 'the'
  });
});