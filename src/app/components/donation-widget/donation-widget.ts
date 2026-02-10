import { Component, signal } from '@angular/core';
import { CopyButton } from '../copy-button/copy-button';
import { CRYPTO_ADDRESSES } from '../../models/crypto-address';

@Component({
  selector: 'df-donation-widget',
  imports: [CopyButton],
  templateUrl: './donation-widget.html',
  styleUrl: './donation-widget.css',
})
export class DonationWidget {
  addresses = CRYPTO_ADDRESSES;
  expanded = signal(false);
}
