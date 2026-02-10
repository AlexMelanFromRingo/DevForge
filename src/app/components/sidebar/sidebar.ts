import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DonationWidget } from '../donation-widget/donation-widget';
import { TOOL_CATEGORIES } from '../../models/tool';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'df-sidebar',
  imports: [RouterLink, RouterLinkActive, DonationWidget, SafeHtmlPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isOpen = input(false);
  closeSidebar = output<void>();
  categories = TOOL_CATEGORIES;
}
