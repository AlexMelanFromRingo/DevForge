import { Injectable } from '@angular/core';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  /**
   * Validates whether a string is a valid hex color (3 or 6 digit, with or without #).
   */
  isValidHex(hex: string): boolean {
    return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex.trim());
  }

  /**
   * Converts a hex color string to an RgbColor.
   * Accepts 3-digit or 6-digit hex, with or without leading #.
   */
  hexToRgb(hex: string): RgbColor {
    let sanitized = hex.trim().replace(/^#/, '');

    if (sanitized.length === 3) {
      sanitized = sanitized
        .split('')
        .map((ch) => ch + ch)
        .join('');
    }

    const num = parseInt(sanitized, 16);
    return {
      r: (num >> 16) & 0xff,
      g: (num >> 8) & 0xff,
      b: num & 0xff,
    };
  }

  /**
   * Converts an RgbColor to a 6-digit hex string with leading #.
   */
  rgbToHex(rgb: RgbColor): string {
    const toHex = (n: number): string => {
      const clamped = Math.max(0, Math.min(255, Math.round(n)));
      return clamped.toString(16).padStart(2, '0');
    };
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  }

  /**
   * Converts an RgbColor (0-255 per channel) to an HslColor.
   * Returned h is in [0, 360), s and l are in [0, 100].
   */
  rgbToHsl(rgb: RgbColor): HslColor {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / delta + 2) / 6;
          break;
        case b:
          h = ((r - g) / delta + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  /**
   * Converts an HslColor to an RgbColor.
   * Expects h in [0, 360], s and l in [0, 100].
   */
  hslToRgb(hsl: HslColor): RgbColor {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    if (s === 0) {
      const val = Math.round(l * 255);
      return { r: val, g: val, b: val };
    }

    const hueToRgb = (p: number, q: number, t: number): number => {
      let tc = t;
      if (tc < 0) tc += 1;
      if (tc > 1) tc -= 1;
      if (tc < 1 / 6) return p + (q - p) * 6 * tc;
      if (tc < 1 / 2) return q;
      if (tc < 2 / 3) return p + (q - p) * (2 / 3 - tc) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return {
      r: Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
      g: Math.round(hueToRgb(p, q, h) * 255),
      b: Math.round(hueToRgb(p, q, h - 1 / 3) * 255),
    };
  }

  /**
   * Converts a hex color string directly to an HslColor.
   */
  hexToHsl(hex: string): HslColor {
    return this.rgbToHsl(this.hexToRgb(hex));
  }

  /**
   * Converts an HslColor directly to a hex string.
   */
  hslToHex(hsl: HslColor): string {
    return this.rgbToHex(this.hslToRgb(hsl));
  }
}
