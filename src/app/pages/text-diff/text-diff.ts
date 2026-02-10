import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { DiffService, DiffLine } from '../../services/diff';

@Component({
  selector: 'df-text-diff',
  imports: [FormsModule, ToolLayout],
  templateUrl: './text-diff.html',
  styleUrl: './text-diff.css',
})
export class TextDiff {
  private diffService = inject(DiffService);

  textA = signal('');
  textB = signal('');

  diffResult = computed<DiffLine[]>(() => {
    const a = this.textA();
    const b = this.textB();
    if (!a && !b) return [];
    return this.diffService.computeDiff(a, b);
  });

  stats = computed(() => {
    const diff = this.diffResult();
    return {
      added: diff.filter(l => l.type === 'added').length,
      removed: diff.filter(l => l.type === 'removed').length,
      unchanged: diff.filter(l => l.type === 'unchanged').length,
    };
  });

  hasDiff = computed(() => this.diffResult().length > 0);

  onTextAChange(value: string) {
    this.textA.set(value);
  }

  onTextBChange(value: string) {
    this.textB.set(value);
  }
}
