type BaseContactInfo = {
  name: string;
  icon: string;
  type: 'link' | 'subject';
}

export type SubjectContact = {
  type: 'subject';
  subject: string;
} & BaseContactInfo;

export type LinkContact = {
  type: 'link';
  url: string;
} & BaseContactInfo;

export type ContactInfo = SubjectContact | LinkContact;

export function isLinkContact(contact: ContactInfo): contact is LinkContact {
  return contact.type === 'link';
}

export function isSubjectContact(contact: ContactInfo): contact is SubjectContact {
  return contact.type === 'subject';
}