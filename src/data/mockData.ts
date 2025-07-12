import { Truck, Document, DocumentType, DashboardStats, Country } from '@/types';

// Mock Document Types
export const documentTypes: DocumentType[] = [
  {
    id: 1,
    name: "Texnik passport",
    category: "mandatory",
    priority: "critical",
    validityPeriodMonths: 60,
    reminderDays: [90, 30, 15, 7, 3, 1],
    colorCode: "#ef4444",
    description: "Yuk mashinasining texnik pasporti",
    isActive: true
  },
  {
    id: 2,
    name: "Ro'yxatdan o'tish guvohnomasi",
    category: "mandatory",
    priority: "critical",
    validityPeriodMonths: 12,
    reminderDays: [30, 15, 7, 3, 1],
    colorCode: "#dc2626",
    description: "Davlat ro'yxatidan o'tish guvohnomasi",
    isActive: true
  },
  {
    id: 3,
    name: "Sug'urta polisi",
    category: "mandatory",
    priority: "high",
    validityPeriodMonths: 12,
    reminderDays: [30, 15, 7, 3, 1],
    colorCode: "#f59e0b",
    description: "Majburiy avtosug'urta polisi",
    isActive: true
  },
  {
    id: 4,
    name: "Texnik ko'rik guvohnomasi",
    category: "mandatory",
    priority: "high",
    validityPeriodMonths: 12,
    reminderDays: [30, 15, 7, 3, 1],
    colorCode: "#f59e0b",
    description: "Texnik holat ko'rik guvohnomasi",
    isActive: true
  },
  {
    id: 5,
    name: "CMR shartnomasi",
    category: "international",
    priority: "critical",
    validityPeriodMonths: 12,
    reminderDays: [60, 30, 15, 7, 3, 1],
    colorCode: "#ef4444",
    description: "Xalqaro yuk tashish shartnomasi",
    isActive: true
  },
  {
    id: 6,
    name: "TIR Carnet",
    category: "international",
    priority: "critical",
    validityPeriodMonths: 12,
    reminderDays: [60, 30, 15, 7, 3, 1],
    colorCode: "#ef4444",
    description: "Tranzit rejimi hujjati",
    isActive: true
  },
  {
    id: 7,
    name: "Xalqaro haydovchilik guvohnomasi",
    category: "international",
    priority: "high",
    validityPeriodMonths: 60,
    reminderDays: [90, 30, 15, 7, 3, 1],
    colorCode: "#f59e0b",
    description: "Xalqaro haydovchilik ruxsatnomasi",
    isActive: true
  },
  {
    id: 8,
    name: "Green Card",
    category: "international",
    priority: "high",
    validityPeriodMonths: 12,
    reminderDays: [30, 15, 7, 3, 1],
    colorCode: "#f59e0b",
    description: "Xalqaro sug'urta polisi",
    isActive: true
  },
  {
    id: 9,
    name: "ATP guvohnomasi",
    category: "international",
    priority: "medium",
    validityPeriodMonths: 36,
    reminderDays: [60, 30, 15, 7],
    colorCode: "#6366f1",
    description: "Tez buziladigan mahsulotlar uchun",
    isActive: true
  },
  {
    id: 10,
    name: "ADR guvohnomasi",
    category: "international",
    priority: "medium",
    validityPeriodMonths: 60,
    reminderDays: [90, 30, 15, 7],
    colorCode: "#6366f1",
    description: "Xavfli yuklar tashish uchun",
    isActive: true
  }
];

// Mock Trucks
export const trucks: Truck[] = [
  {
    id: 1,
    licensePlate: "01A123BC",
    brand: "Mercedes-Benz",
    model: "Actros 1845",
    year: 2020,
    capacityTons: 18.5,
    engineVolume: 12.8,
    status: "active",
    documentsCount: 8,
    expiredDocuments: 1,
    criticalDocuments: 2,
    warningDocuments: 2,
    safeDocuments: 3,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    licensePlate: "01B456DE",
    brand: "Volvo",
    model: "FH16",
    year: 2019,
    capacityTons: 20.0,
    engineVolume: 16.1,
    status: "active",
    documentsCount: 7,
    expiredDocuments: 0,
    criticalDocuments: 1,
    warningDocuments: 3,
    safeDocuments: 3,
    createdAt: "2023-02-20T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 3,
    licensePlate: "01C789FG",
    brand: "Scania",
    model: "R500",
    year: 2021,
    capacityTons: 19.0,
    engineVolume: 13.0,
    status: "maintenance",
    documentsCount: 6,
    expiredDocuments: 2,
    criticalDocuments: 1,
    warningDocuments: 1,
    safeDocuments: 2,
    createdAt: "2023-03-10T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 4,
    licensePlate: "01D012HI",
    brand: "MAN",
    model: "TGX 18.440",
    year: 2018,
    capacityTons: 18.0,
    engineVolume: 12.4,
    status: "active",
    documentsCount: 9,
    expiredDocuments: 0,
    criticalDocuments: 0,
    warningDocuments: 1,
    safeDocuments: 8,
    createdAt: "2023-04-05T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 5,
    licensePlate: "01E345JK",
    brand: "DAF",
    model: "XF 106",
    year: 2022,
    capacityTons: 19.5,
    engineVolume: 12.9,
    status: "inactive",
    documentsCount: 5,
    expiredDocuments: 3,
    criticalDocuments: 2,
    warningDocuments: 0,
    safeDocuments: 0,
    createdAt: "2023-05-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  }
];

// Mock Documents
export const documents: Document[] = [
  {
    id: 1,
    truckId: 1,
    documentTypeId: 1,
    documentNumber: "TP-123456",
    issueDate: "2022-01-15",
    expiryDate: "2025-01-15",
    issuingAuthority: "O'zbekiston Respublikasi Transport vazirligi",
    status: "valid",
    daysUntilExpiry: 245,
    alertLevel: "safe",
    createdAt: "2022-01-15T10:00:00Z",
    updatedAt: "2022-01-15T10:00:00Z"
  },
  {
    id: 2,
    truckId: 1,
    documentTypeId: 2,
    documentNumber: "RG-789012",
    issueDate: "2024-01-01",
    expiryDate: "2024-12-31",
    issuingAuthority: "GAI",
    status: "expiring_soon",
    daysUntilExpiry: 25,
    alertLevel: "warning",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z"
  },
  {
    id: 3,
    truckId: 1,
    documentTypeId: 3,
    documentNumber: "INS-345678",
    issueDate: "2024-02-01",
    expiryDate: "2024-02-28",
    issuingAuthority: "Kafolat sug'urta",
    status: "expired",
    daysUntilExpiry: -15,
    alertLevel: "expired",
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z"
  },
  {
    id: 4,
    truckId: 1,
    documentTypeId: 5,
    documentNumber: "CMR-901234",
    issueDate: "2023-06-01",
    expiryDate: "2024-06-01",
    issuingAuthority: "Transport-Logistika Uyushmasi",
    status: "expiring_soon",
    daysUntilExpiry: 5,
    alertLevel: "critical",
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2023-06-01T10:00:00Z"
  },
  {
    id: 5,
    truckId: 2,
    documentTypeId: 1,
    documentNumber: "TP-567890",
    issueDate: "2021-08-15",
    expiryDate: "2026-08-15",
    issuingAuthority: "O'zbekiston Respublikasi Transport vazirligi",
    status: "valid",
    daysUntilExpiry: 650,
    alertLevel: "safe",
    createdAt: "2021-08-15T10:00:00Z",
    updatedAt: "2021-08-15T10:00:00Z"
  },
  {
    id: 6,
    truckId: 2,
    documentTypeId: 6,
    documentNumber: "TIR-123789",
    issueDate: "2023-09-01",
    expiryDate: "2024-09-01",
    issuingAuthority: "TIR Markazi",
    status: "expiring_soon",
    daysUntilExpiry: 3,
    alertLevel: "critical",
    createdAt: "2023-09-01T10:00:00Z",
    updatedAt: "2023-09-01T10:00:00Z"
  }
];

// Mock Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalTrucks: 5,
  totalDocuments: 35,
  criticalAlerts: 6,
  warningAlerts: 7,
  expiredDocuments: 6,
  safeDocuments: 16,
  activeTrucks: 3,
  maintenanceTrucks: 1
};

// Mock Countries
export const countries: Country[] = [
  {
    code: 'UZ',
    name: 'Uzbekistan',
    nameUz: 'O\'zbekiston',
    requirements: [],
    transitDays: 0,
    visaRequired: false,
    additionalInfo: 'Bosh davlat'
  },
  {
    code: 'KZ',
    name: 'Kazakhstan',
    nameUz: 'Qozog\'iston',
    requirements: ['transit_permit', 'insurance'],
    transitDays: 3,
    visaRequired: false,
    additionalInfo: 'Tranzit ruxsat va sug\'urta talab qilinadi'
  },
  {
    code: 'RU',
    name: 'Russia',
    nameUz: 'Rossiya',
    requirements: ['visa', 'cmr', 'international_license'],
    transitDays: 7,
    visaRequired: true,
    additionalInfo: 'Viza, CMR va xalqaro litsenziya majburiy'
  },
  {
    code: 'BY',
    name: 'Belarus',
    nameUz: 'Belarus',
    requirements: ['transit_permit', 'insurance'],
    transitDays: 2,
    visaRequired: false,
    additionalInfo: 'Tranzit ruxsat talab qilinadi'
  },
  {
    code: 'PL',
    name: 'Poland',
    nameUz: 'Polsha',
    requirements: ['eu_license', 'euro_standard'],
    transitDays: 5,
    visaRequired: false,
    additionalInfo: 'Yevropa Ittifoqi talablari'
  },
  {
    code: 'DE',
    name: 'Germany',
    nameUz: 'Germaniya',
    requirements: ['eu_license', 'euro_standard', 'toll_device'],
    transitDays: 3,
    visaRequired: false,
    additionalInfo: 'To\'lov qurilmasi majburiy'
  }
];

// Utility functions
export const getAlertLevelColor = (level: string): string => {
  switch (level) {
    case 'critical':
      return 'bg-red-600 text-white';
    case 'warning':
      return 'bg-yellow-500 text-black';
    case 'expired':
      return 'bg-black text-white';
    case 'safe':
      return 'bg-green-600 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-green-600 text-white';
    case 'maintenance':
      return 'bg-yellow-500 text-black';
    case 'sold':
      return 'bg-gray-600 text-white';
    case 'inactive':
      return 'bg-red-600 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

export const calculateDaysUntilExpiry = (expiryDate: string): number => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};