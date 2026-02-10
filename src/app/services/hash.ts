import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HashService {
  async sha1(input: string): Promise<string> {
    return this.webCryptoHash('SHA-1', input);
  }

  async sha256(input: string): Promise<string> {
    return this.webCryptoHash('SHA-256', input);
  }

  async sha384(input: string): Promise<string> {
    return this.webCryptoHash('SHA-384', input);
  }

  async sha512(input: string): Promise<string> {
    return this.webCryptoHash('SHA-512', input);
  }

  md5(input: string): string {
    return this.md5Impl(input);
  }

  crc32(input: string): string {
    return this.crc32Impl(input);
  }

  async hmacSha256(input: string, key: string): Promise<string> {
    const enc = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
      'raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(input));
    return this.hex(sig);
  }

  async hmacSha512(input: string, key: string): Promise<string> {
    const enc = new TextEncoder();
    const cryptoKey = await crypto.subtle.importKey(
      'raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-512' }, false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(input));
    return this.hex(sig);
  }

  private async webCryptoHash(algo: string, input: string): Promise<string> {
    const data = new TextEncoder().encode(input);
    const buf = await crypto.subtle.digest(algo, data);
    return this.hex(buf);
  }

  private hex(buf: ArrayBuffer): string {
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private crc32Impl(str: string): string {
    const table = this.crc32Table();
    const bytes = new TextEncoder().encode(str);
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ bytes[i]) & 0xFF];
    }
    return ((crc ^ 0xFFFFFFFF) >>> 0).toString(16).padStart(8, '0');
  }

  private _crc32Table: number[] | null = null;
  private crc32Table(): number[] {
    if (this._crc32Table) return this._crc32Table;
    const table: number[] = [];
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[i] = c;
    }
    this._crc32Table = table;
    return table;
  }

  // Pure JS MD5 (RFC 1321)
  private md5Impl(str: string): string {
    const utf8 = unescape(encodeURIComponent(str));
    const words: number[] = [];
    for (let i = 0; i < utf8.length * 8; i += 8)
      words[i >> 5] |= (utf8.charCodeAt(i / 8) & 0xff) << (i % 32);

    const len = utf8.length * 8;
    words[len >> 5] |= 0x80 << (len % 32);
    words[((len + 64 >>> 9) << 4) + 14] = len;

    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;

    for (let i = 0; i < words.length; i += 16) {
      const oa = a, ob = b, oc = c, od = d;
      a = this.ff(a, b, c, d, words[i], 7, -680876936);
      d = this.ff(d, a, b, c, words[i + 1], 12, -389564586);
      c = this.ff(c, d, a, b, words[i + 2], 17, 606105819);
      b = this.ff(b, c, d, a, words[i + 3], 22, -1044525330);
      a = this.ff(a, b, c, d, words[i + 4], 7, -176418897);
      d = this.ff(d, a, b, c, words[i + 5], 12, 1200080426);
      c = this.ff(c, d, a, b, words[i + 6], 17, -1473231341);
      b = this.ff(b, c, d, a, words[i + 7], 22, -45705983);
      a = this.ff(a, b, c, d, words[i + 8], 7, 1770035416);
      d = this.ff(d, a, b, c, words[i + 9], 12, -1958414417);
      c = this.ff(c, d, a, b, words[i + 10], 17, -42063);
      b = this.ff(b, c, d, a, words[i + 11], 22, -1990404162);
      a = this.ff(a, b, c, d, words[i + 12], 7, 1804603682);
      d = this.ff(d, a, b, c, words[i + 13], 12, -40341101);
      c = this.ff(c, d, a, b, words[i + 14], 17, -1502002290);
      b = this.ff(b, c, d, a, words[i + 15], 22, 1236535329);
      a = this.gg(a, b, c, d, words[i + 1], 5, -165796510);
      d = this.gg(d, a, b, c, words[i + 6], 9, -1069501632);
      c = this.gg(c, d, a, b, words[i + 11], 14, 643717713);
      b = this.gg(b, c, d, a, words[i], 20, -373897302);
      a = this.gg(a, b, c, d, words[i + 5], 5, -701558691);
      d = this.gg(d, a, b, c, words[i + 10], 9, 38016083);
      c = this.gg(c, d, a, b, words[i + 15], 14, -660478335);
      b = this.gg(b, c, d, a, words[i + 4], 20, -405537848);
      a = this.gg(a, b, c, d, words[i + 9], 5, 568446438);
      d = this.gg(d, a, b, c, words[i + 14], 9, -1019803690);
      c = this.gg(c, d, a, b, words[i + 3], 14, -187363961);
      b = this.gg(b, c, d, a, words[i + 8], 20, 1163531501);
      a = this.gg(a, b, c, d, words[i + 13], 5, -1444681467);
      d = this.gg(d, a, b, c, words[i + 2], 9, -51403784);
      c = this.gg(c, d, a, b, words[i + 7], 14, 1735328473);
      b = this.gg(b, c, d, a, words[i + 12], 20, -1926607734);
      a = this.hh(a, b, c, d, words[i + 5], 4, -378558);
      d = this.hh(d, a, b, c, words[i + 8], 11, -2022574463);
      c = this.hh(c, d, a, b, words[i + 11], 16, 1839030562);
      b = this.hh(b, c, d, a, words[i + 14], 23, -35309556);
      a = this.hh(a, b, c, d, words[i + 1], 4, -1530992060);
      d = this.hh(d, a, b, c, words[i + 4], 11, 1272893353);
      c = this.hh(c, d, a, b, words[i + 7], 16, -155497632);
      b = this.hh(b, c, d, a, words[i + 10], 23, -1094730640);
      a = this.hh(a, b, c, d, words[i + 13], 4, 681279174);
      d = this.hh(d, a, b, c, words[i], 11, -358537222);
      c = this.hh(c, d, a, b, words[i + 3], 16, -722521979);
      b = this.hh(b, c, d, a, words[i + 6], 23, 76029189);
      a = this.hh(a, b, c, d, words[i + 9], 4, -640364487);
      d = this.hh(d, a, b, c, words[i + 12], 11, -421815835);
      c = this.hh(c, d, a, b, words[i + 15], 16, 530742520);
      b = this.hh(b, c, d, a, words[i + 2], 23, -995338651);
      a = this.ii(a, b, c, d, words[i], 6, -198630844);
      d = this.ii(d, a, b, c, words[i + 7], 10, 1126891415);
      c = this.ii(c, d, a, b, words[i + 14], 15, -1416354905);
      b = this.ii(b, c, d, a, words[i + 5], 21, -57434055);
      a = this.ii(a, b, c, d, words[i + 12], 6, 1700485571);
      d = this.ii(d, a, b, c, words[i + 3], 10, -1894986606);
      c = this.ii(c, d, a, b, words[i + 10], 15, -1051523);
      b = this.ii(b, c, d, a, words[i + 1], 21, -2054922799);
      a = this.ii(a, b, c, d, words[i + 8], 6, 1873313359);
      d = this.ii(d, a, b, c, words[i + 15], 10, -30611744);
      c = this.ii(c, d, a, b, words[i + 6], 15, -1560198380);
      b = this.ii(b, c, d, a, words[i + 13], 21, 1309151649);
      a = this.ii(a, b, c, d, words[i + 4], 6, -145523070);
      d = this.ii(d, a, b, c, words[i + 11], 10, -1120210379);
      c = this.ii(c, d, a, b, words[i + 2], 15, 718787259);
      b = this.ii(b, c, d, a, words[i + 9], 21, -343485551);
      a = this.add(a, oa); b = this.add(b, ob); c = this.add(c, oc); d = this.add(d, od);
    }

    return this.toHex(a) + this.toHex(b) + this.toHex(c) + this.toHex(d);
  }

  private add(a: number, b: number) { return (a + b) & 0xffffffff; }
  private rol(n: number, c: number) { return (n << c) | (n >>> (32 - c)); }
  private cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    return this.add(this.rol(this.add(this.add(a, q), this.add(x | 0, t)), s), b);
  }
  private ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return this.cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }
  private gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return this.cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }
  private hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return this.cmn(b ^ c ^ d, a, b, x, s, t);
  }
  private ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return this.cmn(c ^ (b | (~d)), a, b, x, s, t);
  }
  private toHex(n: number): string {
    let s = '';
    for (let i = 0; i < 4; i++) s += ('0' + ((n >> (i * 8)) & 0xff).toString(16)).slice(-2);
    return s;
  }
}
