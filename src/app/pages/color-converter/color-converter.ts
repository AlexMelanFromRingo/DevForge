import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolLayout } from '../../components/tool-layout/tool-layout';
import { CopyButton } from '../../components/copy-button/copy-button';
import { ColorService, RgbColor, HslColor } from '../../services/color';

@Component({
  selector: 'df-color-converter',
  imports: [FormsModule, ToolLayout, CopyButton],
  templateUrl: './color-converter.html',
  styleUrl: './color-converter.css',
})
export class ColorConverter {
  private colorService = inject(ColorService);

  hexInput = signal('#6366f1');

  rgb = computed<RgbColor>(() => {
    const hex = this.hexInput();
    if (!this.colorService.isValidHex(hex)) {
      return { r: 0, g: 0, b: 0 };
    }
    return this.colorService.hexToRgb(hex);
  });

  hsl = computed<HslColor>(() => {
    const hex = this.hexInput();
    if (!this.colorService.isValidHex(hex)) {
      return { h: 0, s: 0, l: 0 };
    }
    return this.colorService.hexToHsl(hex);
  });

  hexDisplay = computed(() => {
    const hex = this.hexInput();
    if (!this.colorService.isValidHex(hex)) return hex;
    // Normalize to 6-digit hex with #
    const rgb = this.colorService.hexToRgb(hex);
    return this.colorService.rgbToHex(rgb);
  });

  rgbString = computed(() => {
    const { r, g, b } = this.rgb();
    return `rgb(${r}, ${g}, ${b})`;
  });

  hslString = computed(() => {
    const { h, s, l } = this.hsl();
    return `hsl(${h}, ${s}%, ${l}%)`;
  });

  isValid = computed(() => this.colorService.isValidHex(this.hexInput()));

  onHexChange(value: string) {
    this.hexInput.set(value);
  }

  onColorPickerChange(value: string) {
    this.hexInput.set(value);
  }

  onRgbChange(channel: 'r' | 'g' | 'b', value: number) {
    const current = this.rgb();
    const updated: RgbColor = { ...current, [channel]: Math.max(0, Math.min(255, value || 0)) };
    this.hexInput.set(this.colorService.rgbToHex(updated));
  }

  onHslChange(channel: 'h' | 's' | 'l', value: number) {
    const current = this.hsl();
    const maxVal = channel === 'h' ? 360 : 100;
    const updated: HslColor = { ...current, [channel]: Math.max(0, Math.min(maxVal, value || 0)) };
    this.hexInput.set(this.colorService.hslToHex(updated));
  }
}
