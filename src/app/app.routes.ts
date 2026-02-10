import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'DevForge — Free Online Developer Tools',
  },
  {
    path: 'json-formatter',
    loadComponent: () => import('./pages/json-formatter/json-formatter').then(m => m.JsonFormatter),
    title: 'JSON Formatter & Validator — DevForge',
  },
  {
    path: 'base64',
    loadComponent: () => import('./pages/base64/base64').then(m => m.Base64Tool),
    title: 'Base64 Encoder/Decoder — DevForge',
  },
  {
    path: 'hash-generator',
    loadComponent: () => import('./pages/hash-generator/hash-generator').then(m => m.HashGenerator),
    title: 'Hash Generator — DevForge',
  },
  {
    path: 'color-converter',
    loadComponent: () => import('./pages/color-converter/color-converter').then(m => m.ColorConverter),
    title: 'Color Converter — DevForge',
  },
  {
    path: 'lorem-ipsum',
    loadComponent: () => import('./pages/lorem-ipsum/lorem-ipsum').then(m => m.LoremIpsum),
    title: 'Lorem Ipsum Generator — DevForge',
  },
  {
    path: 'uuid-generator',
    loadComponent: () => import('./pages/uuid-generator/uuid-generator').then(m => m.UuidGenerator),
    title: 'UUID Generator — DevForge',
  },
  {
    path: 'regex-tester',
    loadComponent: () => import('./pages/regex-tester/regex-tester').then(m => m.RegexTester),
    title: 'Regex Tester — DevForge',
  },
  {
    path: 'text-diff',
    loadComponent: () => import('./pages/text-diff/text-diff').then(m => m.TextDiff),
    title: 'Text Diff Checker — DevForge',
  },
  { path: '**', redirectTo: '' },
];
