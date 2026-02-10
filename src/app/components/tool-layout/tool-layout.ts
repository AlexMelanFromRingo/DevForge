import { Component, input } from '@angular/core';

@Component({
  selector: 'df-tool-layout',
  template: `
    <div class="mx-auto max-w-5xl animate-fade-in">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-white md:text-3xl">{{ title() }}</h1>
        @if (description()) {
          <p class="mt-2 text-gray-400 text-sm md:text-base">{{ description() }}</p>
        }
      </div>
      <div class="space-y-6">
        <ng-content />
      </div>
    </div>
  `,
  styles: [],
})
export class ToolLayout {
  title = input.required<string>();
  description = input<string>('');
}
