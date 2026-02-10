import { Component, signal, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { CopyButton } from '../../components/copy-button/copy-button';
import { HashService } from '../../services/hash';

@Component({
  selector: 'df-hash-generator',
  imports: [FormsModule, ToolLayout, CopyButton],
  templateUrl: './hash-generator.html',
  styleUrl: './hash-generator.css',
})
export class HashGenerator {
  private hash = inject(HashService);

  input = signal('');
  hmacKey = signal('');
  showHmac = signal(false);
  uppercase = signal(false);

  md5Result = signal('');
  crc32Result = signal('');
  sha1Result = signal('');
  sha256Result = signal('');
  sha384Result = signal('');
  sha512Result = signal('');
  hmacSha256Result = signal('');
  hmacSha512Result = signal('');

  constructor() {
    effect(() => {
      const val = this.input();
      if (!val) {
        this.md5Result.set('');
        this.crc32Result.set('');
        this.sha1Result.set('');
        this.sha256Result.set('');
        this.sha384Result.set('');
        this.sha512Result.set('');
        this.hmacSha256Result.set('');
        this.hmacSha512Result.set('');
        return;
      }
      this.md5Result.set(this.hash.md5(val));
      this.crc32Result.set(this.hash.crc32(val));
      this.hash.sha1(val).then(h => this.sha1Result.set(h));
      this.hash.sha256(val).then(h => this.sha256Result.set(h));
      this.hash.sha384(val).then(h => this.sha384Result.set(h));
      this.hash.sha512(val).then(h => this.sha512Result.set(h));

      const key = this.hmacKey();
      if (key) {
        this.hash.hmacSha256(val, key).then(h => this.hmacSha256Result.set(h));
        this.hash.hmacSha512(val, key).then(h => this.hmacSha512Result.set(h));
      } else {
        this.hmacSha256Result.set('');
        this.hmacSha512Result.set('');
      }
    });
  }

  display(hash: string): string {
    return this.uppercase() ? hash.toUpperCase() : hash;
  }

  hashes() {
    const list: { label: string; value: string; color: string }[] = [];
    if (this.crc32Result()) list.push({ label: 'CRC32', value: this.crc32Result(), color: 'text-rose-400' });
    if (this.md5Result()) list.push({ label: 'MD5', value: this.md5Result(), color: 'text-primary-400' });
    if (this.sha1Result()) list.push({ label: 'SHA-1', value: this.sha1Result(), color: 'text-accent-400' });
    if (this.sha256Result()) list.push({ label: 'SHA-256', value: this.sha256Result(), color: 'text-emerald-400' });
    if (this.sha384Result()) list.push({ label: 'SHA-384', value: this.sha384Result(), color: 'text-violet-400' });
    if (this.sha512Result()) list.push({ label: 'SHA-512', value: this.sha512Result(), color: 'text-amber-400' });
    if (this.hmacSha256Result()) list.push({ label: 'HMAC-SHA256', value: this.hmacSha256Result(), color: 'text-sky-400' });
    if (this.hmacSha512Result()) list.push({ label: 'HMAC-SHA512', value: this.hmacSha512Result(), color: 'text-pink-400' });
    return list;
  }
}
