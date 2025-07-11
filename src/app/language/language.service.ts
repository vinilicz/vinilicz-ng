import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { defaultLangCode } from './constants/default-lang';
import { languages } from './constants/languages';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly currentLang = new BehaviorSubject(defaultLangCode);
  readonly currentLang$ = this.currentLang.asObservable();
  
  private readonly translateService = inject(TranslateService);
  
  constructor() {
    this.translateService.onLangChange.subscribe((event) => this.currentLang.next(event.lang));
    this.setupLanguage();
  }

  private setupLanguage() {
    const langCodes = languages.map((lang) => lang.lang);
    this.translateService.addLangs(langCodes);
    this.translateService.setDefaultLang(defaultLangCode);
  }

  applyUserLang() {
    const lang = this.getLocalStorageLang() || this.getBrowserLang();
    if (!lang) return;

    const useLang = this.findCompatibleLang(lang);
    if (!useLang) return;

    this.translateService.use(useLang);
  }

  private getLocalStorageLang() {
    try {
      const rawStorageLang = localStorage.getItem('vl:lang');
      if (!rawStorageLang) return;

      const parsedStorageLang = JSON.parse(rawStorageLang);
      const { lang, timestamp } = parsedStorageLang;
      if (!lang || typeof lang !== 'string' || !timestamp ) return;

      const now = new Date().getTime();
      const isExpired = now - timestamp > 91 * 24 * 60 * 60 * 1000;
      if (!isExpired) return lang;
    } catch (error) {
      console.error(error);
    }
    return;
  }

  private getBrowserLang() {
    return navigator.language || navigator.languages?.[0] || this.translateService.getBrowserLang();
  }

  private findCompatibleLang(lang: string): string | undefined {
    const availableLangs = this.translateService.getLangs();
    if (availableLangs.includes(lang)) return lang;
    return availableLangs.find((aLang) => lang.startsWith(aLang));
  }

  private setLocalStorageLang(lang: string) {
    localStorage.setItem(
      'vl:lang',
      JSON.stringify({ lang, timestamp: new Date().getTime() })
    );
  }

  getCurrentLang() {
    return this.currentLang.getValue();
  }

  updateLang(langCode: string) {
    this.translateService.use(langCode);
    this.setLocalStorageLang(langCode);
  }
}
