import { AuthUser } from '../types';

export interface RegisteredAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  city: string;
  role: 'patron' | 'guest';
  treeAllocated?: string;
  plotNumber?: string;
  certificateNumber?: string;
  joinedDate: string;
}

export const INITIAL_REGISTERED_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'usr-sm-88',
    name: 'Siddharth Mehta',
    email: 'siddharth.mehta@connoisseur.in',
    phone: '9820045210',
    password: 'password123',
    city: 'Mumbai',
    role: 'patron',
    treeAllocated: 'KESHAR-1936 · TREE-088',
    plotNumber: 'ESTATE PLOT #09',
    certificateNumber: 'AZ-2025-KSH088-012',
    joinedDate: 'Season 2024',
  },
  {
    id: 'usr-ar-104',
    name: 'Dr. Ananya Roy',
    email: 'ananya.roy@health.org',
    phone: '9845012345',
    password: 'password123',
    city: 'Bengaluru',
    role: 'patron',
    treeAllocated: 'KESHAR-1948 · TREE-104',
    plotNumber: 'ESTATE PLOT #14',
    certificateNumber: 'AZ-2025-KSH104-089',
    joinedDate: 'Season 2024',
  },
  {
    id: 'usr-ri-142',
    name: 'Rituja Ingle',
    email: 'rituja.ingle28@gmail.com',
    phone: '9811122334',
    password: 'password123',
    city: 'Mumbai',
    role: 'patron',
    treeAllocated: 'KESHAR-1925 · TREE-142',
    plotNumber: 'ESTATE PLOT #22',
    certificateNumber: 'AZ-2025-KSH142-031',
    joinedDate: 'Season 2025',
  },
];

const USER_DB_KEY = 'aapla_zhad_registered_users_v2';

export function getRegisteredUsers(): RegisteredAccount[] {
  try {
    const raw = localStorage.getItem(USER_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return INITIAL_REGISTERED_ACCOUNTS;
}

export function saveRegisteredUsers(users: RegisteredAccount[]): void {
  try {
    localStorage.setItem(USER_DB_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

export function cleanPhone(phone: string): string {
  return phone.replace(/[^0-9]/g, '').slice(-10);
}

export function findUserByIdentifier(identifier: string): RegisteredAccount | undefined {
  const users = getRegisteredUsers();
  const trimmed = identifier.trim().toLowerCase();
  const cleanedInputPhone = cleanPhone(trimmed);

  return users.find((u) => {
    const emailMatch = u.email.toLowerCase() === trimmed;
    const phoneMatch = cleanedInputPhone.length >= 10 && cleanPhone(u.phone) === cleanedInputPhone;
    return emailMatch || phoneMatch;
  });
}

export function toAuthUser(acc: RegisteredAccount): AuthUser {
  return {
    id: acc.id,
    name: acc.name,
    email: acc.email,
    phone: acc.phone,
    city: acc.city,
    role: acc.role,
    treeAllocated: acc.treeAllocated,
    plotNumber: acc.plotNumber,
    certificateNumber: acc.certificateNumber,
    joinedDate: acc.joinedDate,
  };
}
