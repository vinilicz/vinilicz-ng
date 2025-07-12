import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkTheme = new BehaviorSubject(true);
  readonly isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() { }

  applyUserTheme() {
    const theme = this.getLocalStorageTheme();
    if (!theme) return;
    if (theme.dark) return; // default
    this.setLightMode();
  }

  private getLocalStorageTheme(): { dark: boolean } | undefined {
    try {
      const rawTheme = localStorage.getItem('vl:theme');
      if (!rawTheme) return;
      const parsedTheme = JSON.parse(rawTheme);
      if (typeof parsedTheme.dark !== 'boolean') return;
      return { dark: parsedTheme.dark };
    } catch (error) {
      console.error(error);
    }
    return;
  }

  private setLocalStorageTheme(theme: { dark: boolean }) {
    localStorage.setItem('vl:theme', JSON.stringify(theme));
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
