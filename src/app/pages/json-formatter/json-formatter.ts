import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { CopyButton } from '../../components/copy-button/copy-button';

type Mode = 'format' | 'minify' | 'validate';

@Component({
  selector: 'df-json-formatter',
  imports: [FormsModule, ToolLayout, CopyButton],
  templateUrl: './json-formatter.html',
  styleUrl: './json-formatter.css',
})
export class JsonFormatter {
  input = signal('');
  mode = signal<Mode>('format');
  indentSize = signal(2);

  error = computed(() => {
    const raw = this.input().trim();
    if (!raw) return '';
    try {
      JSON.parse(raw);
      return '';
    } catch (e: any) {
      return e.message ?? 'Invalid JSON';
    }
  });

  output = computed(() => {
    const raw = this.input().trim();
    if (!raw) return '';

    try {
      const parsed = JSON.parse(raw);
      switch (this.mode()) {
        case 'format':
          return JSON.stringify(parsed, null, this.indentSize());
        case 'minify':
          return JSON.stringify(parsed);
        case 'validate':
          return 'Valid JSON';
      }
    } catch {
      if (this.mode() === 'validate') {
        return this.error();
      }
      return '';
    }
  });

  setMode(mode: Mode) {
    this.mode.set(mode);
  }

  setIndentSize(size: number) {
    this.indentSize.set(size);
  }

  onInput(value: string) {
    this.input.set(value);
  }
}
