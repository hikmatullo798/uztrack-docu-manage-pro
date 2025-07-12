// UZTRUCK Types
export interface Truck {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  capacityTons: number;
  engineVolume: number;
  status: 'active' | 'maintenance' | 'sold' | 'inactive';
  documentsCount: number;
  expiredDocuments: number;
  criticalDocuments: number;
  warningDocuments: number;
  safeDocuments: number;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentType {
  id: number;
  name: string;
  category: 'mandatory' | 'international' | 'optional';
  priority: 'critical' | 'high' | 'medium' | 'low';
  validityPeriodMonths: number;
  reminderDays: number[];
  colorCode: string;
  description: string;
  isActive: boolean;
}

export interface Document {
  id: number;
  truckId: number;
  documentTypeId: number;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  filePath?: string;
  fileSize?: number;
  fileType?: string;
  status: 'valid' | 'expired' | 'expiring_soon' | 'missing';
  daysUntilExpiry: number;
  alertLevel: 'safe' | 'warning' | 'critical' | 'expired';
  lastRemindedAt?: string;
  createdAt: string;
  updatedAt: string;
  truck?: Truck;
  documentType?: DocumentType;
}

export interface DocumentAlert {
  id: number;
  documentId: number;
  alertType: 'email' | 'sms' | 'telegram' | 'push';
  alertLevel: 'warning' | 'critical' | 'expired';
  recipient: string;
  message: string;
  sentAt: string;
  isSuccessful: boolean;
  errorMessage?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  telegramChatId?: string;
  role: 'admin' | 'manager' | 'operator' | 'viewer';
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export interface Country {
  code: string;
  name: string;
  nameUz: string;
  requirements: string[];
  transitDays: number;
  visaRequired: boolean;
  additionalInfo?: string;
}

export interface RouteRequirement {
  type: string;
  country: string;
  description: string;
  validityPeriod: number;
  cost: number;
  processingTime: number;
  documents: string[];
}

export interface Route {
  id: number;
  origin: string;
  destination: string;
  transitCountries: Country[];
  requirements: RouteRequirement[];
  estimatedCosts: number;
  estimatedDays: number;
  distance: number;
}

export interface DashboardStats {
  totalTrucks: number;
  totalDocuments: number;
  criticalAlerts: number;
  warningAlerts: number;
  expiredDocuments: number;
  safeDocuments: number;
  activeTrucks: number;
  maintenanceTrucks: number;
}

export interface AlertCounts {
  critical: number;
  warning: number;
  expired: number;
  safe: number;
}

export type AlertLevel = 'safe' | 'warning' | 'critical' | 'expired';
export type TruckStatus = 'active' | 'maintenance' | 'sold' | 'inactive';
export type DocumentStatus = 'valid' | 'expired' | 'expiring_soon' | 'missing';