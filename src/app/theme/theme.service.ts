import { Injectable } from '@angular/core';
import { BehaviorSubject, timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkTheme = new BehaviorSubject(true);
  readonly isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() { }

  applyUserTheme() {
    const theme = this.getLocalStorageTheme() || this.getUserPreferredTheme();
    if (!theme) return;
    if (theme.dark) return; // default
    this.setLightMode();
  }

  private getLocalStorageTheme(): { dark: boolean } | undefined {
    try {
      const rawTheme = localStorage.getItem('vl:theme');
      if (!rawTheme) return;
      
      const parsedTheme = JSON.parse(rawTheme);
      const { dark, timestamp } = parsedTheme;
      if (typeof dark !== 'boolean' || !timestamp) return;
      
      const now = new Date().getTime();
      const isExpired = now - parsedTheme.timestamp > 30 * 24 * 60 * 60 * 1000;
      if (!isExpired) return { dark };
    } catch (error) {
      console.error(error);
    }
    return;
  }

  private setLocalStorageTheme(theme: { dark: boolean }) {
    localStorage.setItem('vl:theme', JSON.stringify({ dark: theme.dark, timestamp: new Date().getTime() }));
  }

  private getUserPreferredTheme(): { dark: boolean } | undefined {
    try {
      const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return { dark }
    } catch (error) {
      console.error(error);
    }
    return;
  }

  setTheme(dark: boolean) {
    this.isDarkTheme.next(dark);
    document.documentElement.className = dark ? 'dark' : '';
    this.setLocalStorageTheme({ dark });
  }

  toggleTheme() {
    this.setTheme(!this.isDarkTheme.getValue());
  }

  setDarkMode() {
    this.setTheme(true);
  }

  setLightMode() {
    this.setTheme(false);
  }
}
