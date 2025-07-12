import { Component, inject } from '@angular/core';
import { LayoutContainer } from './layout/layout-container/layout-container';
import { LanguageService } from './language/language.service';
import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [LayoutContainer],
  providers: [LanguageService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly languageService = inject(LanguageService);
  private readonly themeService = inject(ThemeService);

  constructor() {
    this.languageService.applyUserLang();
    this.themeService.applyUserTheme();
  }
}
