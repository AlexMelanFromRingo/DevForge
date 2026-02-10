import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal(true);

  constructor() {
    const saved = localStorage.getItem('df-theme');
    if (saved !== null) this.isDark.set(saved === 'dark');
  }

  toggle() {
    this.isDark.update(v => !v);
    localStorage.setItem('df-theme', this.isDark() ? 'dark' : 'light');
  }
}
