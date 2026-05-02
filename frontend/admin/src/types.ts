export type PatientStatus = 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'WAITING' | 'IN_CONSULTATION' | 'DISCHARGED';

export interface Patient {
  id: string;
  name: string;
  nammaId: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  location: string;
  status: PatientStatus;
  avatar?: string;
}

export interface VisitRecord {
  id: string;
  date: string;
  diagnosis: string;
  facility: string;
  status: 'COMPLETED' | 'FOLLOW_UP';
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  avatar: string;
}
