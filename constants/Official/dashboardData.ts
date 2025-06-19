// data.ts

export interface OfficialContact {
  name: string;
  email: string;
  phone?: string;
}

export interface Prize {
  prizeTitle: string;
  weightCategory?: string;
}

export interface EventItem {
  title: string;
  description: string;
  venue: string;
  date: string;
  weightCategories: string[];
  competitionType: 'Male' | 'Female' | 'Open';
  prizes: Prize[];
  coordinator?: OfficialContact;
  otherOfficial?: OfficialContact;
  organizerPhoneNumber?: string;
  eventImage?: string;
  createdby?: string;
}

export const tabs = ['Events', 'Announcements'];

export const events: EventItem[] = [
  {
    title: 'Regional Powerlifting Championship',
    description: 'An intense 3-day regional level competition featuring top athletes.',
    venue: 'National Sports Complex, Kathmandu',
    date: '2025-07-20T10:00:00.000Z',
    weightCategories: ['56kg', '67kg', '75kg', '85kg+'],
    competitionType: 'Open',
    prizes: [
      { prizeTitle: 'Gold Medal', weightCategory: '56kg' },
      { prizeTitle: 'Silver Medal', weightCategory: '67kg' },
      { prizeTitle: 'Bronze Medal', weightCategory: '75kg' },
    ],
    coordinator: {
      name: 'Ram Prasad Yadav',
      email: 'ram@example.com',
      phone: '+9779812345678',
    },
    otherOfficial: {
      name: 'Sita Kumari',
      email: 'sita@example.com',
    },
    organizerPhoneNumber: '+9779800001111',
    eventImage: 'https://example.com/event-image.jpg',
    createdby: '665af03c1a97d24cb13b5432',
  },
  {
    title: 'State Qualifier – Deadlift Challenge',
    description: 'Qualify for the state-level powerlifting tournament in this deadlift-focused event.',
    venue: 'Butwal Stadium, Butwal',
    date: '2025-07-10T09:00:00.000Z',
    weightCategories: ['67kg', '75kg', '90kg'],
    competitionType: 'Male',
    prizes: [{ prizeTitle: 'Champion Trophy' }],
    organizerPhoneNumber: '+9779800012345',
    createdby: '665af03c1a97d24cb13b9999',
  },
];
