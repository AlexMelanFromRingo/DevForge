import { Component } from '@angular/core';

@Component({
  selector: 'df-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  year = new Date().getFullYear();
}
