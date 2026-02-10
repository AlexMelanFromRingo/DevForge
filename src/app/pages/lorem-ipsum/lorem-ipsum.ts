import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { CopyButton } from '../../components/copy-button/copy-button';
import { LoremService } from '../../services/lorem';

@Component({
  selector: 'df-lorem-ipsum',
  imports: [FormsModule, ToolLayout, CopyButton],
  templateUrl: './lorem-ipsum.html',
  styleUrl: './lorem-ipsum.css',
})
export class LoremIpsum {
  private lorem = inject(LoremService);

  count = signal(3);
  unit = signal<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  startWithLorem = signal(true);
  output = signal('');

  constructor() {
    this.generate();
  }

  generate() {
    this.output.set(this.lorem.generate(this.count(), this.unit(), this.startWithLorem()));
  }

  wordCount = computed(() => {
    const text = this.output();
    return text ? text.split(/\s+/).filter(w => w).length : 0;
  });

  charCount = computed(() => this.output().length);
}
