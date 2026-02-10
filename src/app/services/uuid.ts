import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UuidService {
  /**
   * Generates a single RFC 4122 version 4 UUID.
   * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
   * Uses crypto.getRandomValues for cryptographically strong randomness.
   */
  generateV4(): string {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    // Set version bits (4) in byte 6: 0100xxxx
    bytes[6] = (bytes[6] & 0x0f) | 0x40;

    // Set variant bits (10) in byte 8: 10xxxxxx
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    return [
      hex.substring(0, 8),
      hex.substring(8, 12),
      hex.substring(12, 16),
      hex.substring(16, 20),
      hex.substring(20, 32),
    ].join('-');
  }

  /**
   * Generates an array of version 4 UUIDs.
   *
   * @param count The number of UUIDs to generate.
   * @returns An array of UUID strings.
   */
  generateBulk(count: number): string[] {
    const safeCount = Math.max(0, Math.round(count));
    return Array.from({ length: safeCount }, () => this.generateV4());
  }
}
