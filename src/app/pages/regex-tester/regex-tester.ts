import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolLayout } from '../../components/tool-layout/tool-layout';

interface MatchResult {
  value: string;
  index: number;
  length: number;
}

@Component({
  selector: 'df-regex-tester',
  imports: [FormsModule, ToolLayout],
  templateUrl: './regex-tester.html',
  styleUrl: './regex-tester.css',
})
export class RegexTester {
  pattern = signal('');
  flags = signal('g');
  testString = signal('');

  flagG = signal(true);
  flagI = signal(false);
  flagM = signal(false);
  flagS = signal(false);

  computedFlags = computed(() => {
    let f = '';
    if (this.flagG()) f += 'g';
    if (this.flagI()) f += 'i';
    if (this.flagM()) f += 'm';
    if (this.flagS()) f += 's';
    return f;
  });

  error = computed(() => {
    const p = this.pattern().trim();
    if (!p) return '';
    try {
      new RegExp(p, this.computedFlags());
      return '';
    } catch (e: any) {
      return e.message ?? 'Invalid regular expression';
    }
  });

  matches = computed<MatchResult[]>(() => {
    const p = this.pattern().trim();
    const text = this.testString();
    if (!p || !text) return [];

    try {
      const flags = this.computedFlags();
      const regex = new RegExp(p, flags);
      const results: MatchResult[] = [];

      if (flags.includes('g')) {
        const allMatches = text.matchAll(regex);
        for (const match of allMatches) {
          results.push({
            value: match[0],
            index: match.index!,
            length: match[0].length,
          });
          // Safety: prevent infinite loops on zero-length matches
          if (results.length > 10000) break;
        }
      } else {
        const match = regex.exec(text);
        if (match) {
          results.push({
            value: match[0],
            index: match.index,
            length: match[0].length,
          });
        }
      }

      return results;
    } catch {
      return [];
    }
  });

  highlightedHtml = computed(() => {
    const text = this.testString();
    if (!text) return '';

    const matchList = this.matches();
    if (matchList.length === 0) return this.escapeHtml(text);

    let result = '';
    let lastIndex = 0;

    for (const match of matchList) {
      // Add text before this match
      if (match.index > lastIndex) {
        result += this.escapeHtml(text.slice(lastIndex, match.index));
      }
      // Add highlighted match
      result +=
        '<mark class="bg-primary-500/30 text-white rounded px-0.5">' +
        this.escapeHtml(match.value) +
        '</mark>';
      lastIndex = match.index + match.length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      result += this.escapeHtml(text.slice(lastIndex));
    }

    return result;
  });

  matchCount = computed(() => this.matches().length);

  onPatternChange(value: string) {
    this.pattern.set(value);
  }

  onTestStringChange(value: string) {
    this.testString.set(value);
  }

  toggleFlag(flag: 'g' | 'i' | 'm' | 's') {
    switch (flag) {
      case 'g': this.flagG.update(v => !v); break;
      case 'i': this.flagI.update(v => !v); break;
      case 'm': this.flagM.update(v => !v); break;
      case 's': this.flagS.update(v => !v); break;
    }
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/\n/g, '<br>');
  }
}
