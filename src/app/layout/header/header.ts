import { Component, inject, OnInit, signal } from '@angular/core';
import { ContactInfo } from '../../types/contact-info';
import { emailContact } from '../../constants/contacts/email';
import { githubContact } from '../../constants/contacts/github';
import { linkedinContact } from '../../constants/contacts/linkedin';
import { languages } from '../../language/constants/languages';
import { LanguageService } from '../../language/language.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Select, SelectOption } from '../../components/select/select';

type ContactBadge = {
  contact: ContactInfo;
  link?: string;
  action?: () => void;
  tooltip?: string;
}

@Component({
  selector: 'app-header',
  imports: [FormsModule, AsyncPipe, Select],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  readonly contacts: ContactBadge[] = [
    { contact: emailContact, action: () => this.onClickEmail(emailContact.subject) },
    { contact: githubContact, link: githubContact.url },
    { contact: linkedinContact, link: linkedinContact.url },
  ];

  readonly languages: SelectOption[] = languages.map((language) => ({
    label: `${language.flag} ${language.name}`,
    value: language.lang,
  }));
  
  private readonly languageService = inject(LanguageService);
  private readonly translateService = inject(TranslateService);
  
  readonly currentLang$ = this.languageService.currentLang$;

  private async onClickEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email);
      alert(`\n${email}\n\n${this.translateService.instant('MISC.EMAIL_COPIED_SUCCESS')}`);
    } catch (error) {
      alert(`\n\n${email}`);
    }
  }

  onSelectLanguage(lang: string) {
    this.languageService.updateLang(lang);
  }

}
