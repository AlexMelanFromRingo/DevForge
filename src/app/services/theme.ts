import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = signal(true);

  constructor() {
    const saved = localStorage.getItem('df-theme');
    if (saved !== null) this.isDark.set(saved === 'dark');

    effect(() => {
      const dark = this.isDark();
      document.documentElement.classList.toggle('dark', dark);
      document.documentElement.classList.toggle('light', !dark);
    });
  }

  toggle() {
    this.isDark.update(v => !v);
    localStorage.setItem('df-theme', this.isDark() ? 'dark' : 'light');
  }
}
