import { Component, signal, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { CopyButton } from '../../components/copy-button/copy-button';
import { HashService } from '../../services/hash';

@Component({
  selector: 'df-hash-generator',
  imports: [FormsModule, ToolLayout, CopyButton],
  templateUrl: './hash-generator.html',
  styleUrl: './hash-generator.css',
})
export class HashGenerator {
  private hash = inject(HashService);

  input = signal('');
  md5Result = signal('');
  sha1Result = signal('');
  sha256Result = signal('');
  sha512Result = signal('');
  uppercase = signal(false);

  constructor() {
    effect(() => {
      const val = this.input();
      if (!val) {
        this.md5Result.set('');
        this.sha1Result.set('');
        this.sha256Result.set('');
        this.sha512Result.set('');
        return;
      }
      this.md5Result.set(this.hash.md5(val));
      this.hash.sha1(val).then(h => this.sha1Result.set(h));
      this.hash.sha256(val).then(h => this.sha256Result.set(h));
      this.hash.sha512(val).then(h => this.sha512Result.set(h));
    });
  }

  display(hash: string): string {
    return this.uppercase() ? hash.toUpperCase() : hash;
  }
}
