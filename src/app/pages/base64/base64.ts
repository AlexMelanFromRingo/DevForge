import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { CopyButton } from '../../components/copy-button/copy-button';

@Component({
  selector: 'df-base64',
  imports: [FormsModule, ToolLayout, CopyButton],
  templateUrl: './base64.html',
  styleUrl: './base64.css',
})
export class Base64Tool {
  input = signal('');
  mode = signal<'encode' | 'decode'>('encode');

  output = computed(() => {
    const val = this.input();
    if (!val) return '';
    try {
      if (this.mode() === 'encode') {
        return btoa(unescape(encodeURIComponent(val)));
      } else {
        return decodeURIComponent(escape(atob(val)));
      }
    } catch {
      return this.mode() === 'decode' ? '// Invalid Base64 input' : '// Encoding error';
    }
  });

  error = computed(() => {
    const val = this.input();
    if (!val) return '';
    try {
      if (this.mode() === 'encode') {
        btoa(unescape(encodeURIComponent(val)));
      } else {
        atob(val);
      }
      return '';
    } catch {
      return this.mode() === 'decode' ? 'Invalid Base64 string' : 'Cannot encode this input';
    }
  });

  setMode(m: 'encode' | 'decode') {
    this.mode.set(m);
  }

  swap() {
    const out = this.output();
    if (out && !this.error()) {
      this.mode.update(m => m === 'encode' ? 'decode' : 'encode');
      this.input.set(out);
    }
  }
}
