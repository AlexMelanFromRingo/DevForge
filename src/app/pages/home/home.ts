import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TOOLS } from '../../models/tool';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'df-home',
  imports: [RouterLink, SafeHtmlPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  tools = TOOLS;
}
