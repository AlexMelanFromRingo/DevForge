import { Component, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { CopyButton } from '../../components/copy-button/copy-button';
import { UuidService } from '../../services/uuid';

@Component({
  selector: 'df-uuid-generator',
  imports: [FormsModule, ToolLayout, CopyButton],
  templateUrl: './uuid-generator.html',
  styleUrl: './uuid-generator.css',
})
export class UuidGenerator {
  private uuidService = inject(UuidService);

  count = signal(5);
  format = signal<'lowercase' | 'uppercase' | 'nohyphens'>('lowercase');
  uuids = signal<string[]>([]);

  constructor() {
    this.generate();
  }

  generate() {
    this.uuids.set(this.uuidService.generateBulk(this.count()));
  }

  formatted = computed(() => {
    const fmt = this.format();
    return this.uuids().map(u => {
      if (fmt === 'uppercase') return u.toUpperCase();
      if (fmt === 'nohyphens') return u.replace(/-/g, '');
      return u;
    });
  });

  allText = computed(() => this.formatted().join('\n'));
}
