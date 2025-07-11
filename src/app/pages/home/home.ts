import { Component, inject, OnInit } from '@angular/core';
import { StackItemButton } from './stack-item-button/stack-item-button';
import { techStack } from '../../constants/tech-stack';
import { githubContact } from '../../constants/contacts/github';
import { linkedinContact } from '../../constants/contacts/linkedin';
import { emailContact } from '../../constants/contacts/email';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ContactInfo } from '../../types/contact-info';

type ContactItem = {
  contact: ContactInfo;
  action: () => void; 
}

@Component({
  selector: 'app-home',
  imports: [StackItemButton, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  private readonly translateService = inject(TranslateService);

  readonly techStack = techStack;

  readonly contacts: ContactItem[] = [
    { contact: emailContact, action: () => this.onClickEmail(emailContact.subject) },
    { contact: githubContact, action: () => window.open(githubContact.url, '_blank') },
    { contact: linkedinContact, action: () => window.open(linkedinContact.url, '_blank') },
  ];

  private async onClickEmail(email: string) {
    try {
      await navigator.clipboard.writeText(email);
      alert(`\n${email}\n\n${this.translateService.instant('MISC.EMAIL_COPIED_SUCCESS')}`);
    } catch (error) {
      alert(`\n\n${email}`);
    }
  }

}
