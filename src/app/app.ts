import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Toolbar } from './components/toolbar/toolbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'df-root',
  imports: [RouterOutlet, Sidebar, Toolbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  sidebarOpen = signal(false);

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }
}
