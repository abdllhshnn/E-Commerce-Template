import { Address } from '../models/address.model';

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 1,
    title: 'Ev',
    fullName: 'Admin Admin',
    phone: '05559876543',
    city: 'İstanbul',
    district: 'Kadıköy',
    addressLine: 'Atatürk Mah. Cumhuriyet Cad. No:42 D:5',
    zipCode: '34710',
    isDefault: true,
  },
  {
    id: 2,
    title: 'İş',
    fullName: 'Admin Admin',
    phone: '05559876543',
    city: 'İstanbul',
    district: 'Şişli',
    addressLine: 'Levent Mah. Büyükdere Cad. No:185 K:12',
    zipCode: '34394',
    isDefault: false,
  },
];
