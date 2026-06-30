import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSiteName(site: string): string {
  if (!site) return '';
  if (site.startsWith('sc-domain:')) {
    return `${site.replace('sc-domain:', '')} (Domain)`;
  }
  return site.replace('https://', '').replace('http://', '');
}

export function preprocessMarkdown(text: string): string {
  if (!text) return '';
  // Fix GSC AI malformed single-line tables (double pipes) by replacing with proper row newlines
  return text.replace(/\|\s*\|/g, '|\n|');
} 