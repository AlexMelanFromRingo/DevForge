import { Component, inject, output } from '@angular/core';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'df-toolbar',
  imports: [],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  toggleSidebar = output<void>();
  theme = inject(ThemeService);
}
