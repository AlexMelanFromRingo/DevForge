export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  category: ToolCategory;
}

export type ToolCategory = 'formatters' | 'encoders' | 'generators' | 'utilities';

export interface ToolCategoryGroup {
  id: ToolCategory;
  label: string;
  icon: string;
  tools: Tool[];
}

export const TOOLS: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, minify, and validate JSON data',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/></svg>`,
    route: '/json-formatter',
    category: 'formatters',
  },
  {
    id: 'base64',
    name: 'Base64',
    description: 'Encode and decode Base64 strings',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>`,
    route: '/base64',
    category: 'encoders',
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'CRC32, MD5, SHA-1/256/384/512, HMAC',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"/></svg>`,
    route: '/hash-generator',
    category: 'encoders',
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert between HEX, RGB, and HSL',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125V11.25a2.999 2.999 0 0 1-.879 2.121L6.75 16.25"/></svg>`,
    route: '/color-converter',
    category: 'utilities',
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum',
    description: 'Generate placeholder text for designs',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"/></svg>`,
    route: '/lorem-ipsum',
    category: 'generators',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate v4 UUIDs with bulk support',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"/></svg>`,
    route: '/uuid-generator',
    category: 'generators',
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions with highlighting',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>`,
    route: '/regex-tester',
    category: 'utilities',
  },
  {
    id: 'text-diff',
    name: 'Text Diff',
    description: 'Compare two texts and see differences',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/></svg>`,
    route: '/text-diff',
    category: 'utilities',
  },
];

export const TOOL_CATEGORIES: ToolCategoryGroup[] = [
  { id: 'formatters', label: 'Formatters', icon: 'code', tools: TOOLS.filter(t => t.category === 'formatters') },
  { id: 'encoders', label: 'Encoders & Hash', icon: 'shield', tools: TOOLS.filter(t => t.category === 'encoders') },
  { id: 'generators', label: 'Generators', icon: 'sparkles', tools: TOOLS.filter(t => t.category === 'generators') },
  { id: 'utilities', label: 'Utilities', icon: 'wrench', tools: TOOLS.filter(t => t.category === 'utilities') },
];
