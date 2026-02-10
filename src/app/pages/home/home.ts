import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TOOLS } from '../../models/tool';

@Component({
  selector: 'df-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  tools = TOOLS;
}
