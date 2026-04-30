export type Priority = 'HIGH' | 'STANDARD' | 'LOWER';
export type LeadStatus = 'New' | 'Contacted' | 'Interested' | 'Not Interested';

export interface Patient {
  id: string;
  name: string;
  address: string;
  phone?: string;
  locationLabel?: string;
}

export interface RouteStop {
  id: string;
  stopNumber: string;
  patientName: string;
  address: string;
  timeSlot: string;
  careType: string;
  priority: Priority;
}

export interface Lead {
  id: string;
  initials: string;
  name: string;
  leadId: string;
  phone: string;
  location: string;
  lastActivity: string;
  status: LeadStatus;
}

export interface Appointment {
  id: string;
  patientName: string;
  type: string;
  time: string;
  date: string;
  status: 'Scheduled' | 'In 2h' | 'Missed';
}

export interface RegistrationEvent {
  id: string;
  patientName: string;
  initials: string;
  mrn: string;
  time: string;
  facility: string;
  status: 'Validated' | 'Pending' | 'Critical Review';
}

export type Tab = 'Routes' | 'Leads' | 'Log Visit' | 'Schedule' | 'Reports';
export type ReportTab = 'Summary' | 'Daily' | 'Performance' | 'Exports';
