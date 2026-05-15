import { User } from '../models/auth.model';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    firstName: 'Ayşe',
    lastName: 'Yılmaz',
    email: 'ayse@example.com',
    phone: '05551234567',
    password: '123456',
  },
  {
    id: 2,
    firstName: 'Mehmet',
    lastName: 'Demir',
    email: 'admin@example.com',
    phone: '05559876543',
    password: '123456',
  },
];
