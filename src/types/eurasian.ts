// Eurasian Module Types
export interface DocumentType {
  id: number;
  name: string;
  category: string;
}

export interface EurasianDocument {
  id: number;
  truckId: number;
  countryCode: string;
  documentType: DocumentType;
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
  isUploaded: boolean;
  uploadDate?: string;
  ocrText?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CountryDocumentRequirement {
  id: number;
  countryCode: string;
  documentType: string;
  displayName: string;
  description: string;
  isMandatory: boolean;
  validityPeriodMonths: number;
  reminderDaysBefore: number[];
  category: 'vehicle' | 'driver' | 'cargo' | 'transit' | 'insurance' | 'special';
  priority: 'critical' | 'high' | 'medium' | 'low';
  processingTimeHours: number;
  estimatedCost: number;
  currency: string;
  issuingAuthority: string;
  alternativeDocuments?: string[];
  additionalInfo?: string;
  requiredFields: string[];
  fileFormats: string[];
  maxFileSizeMB: number;
}

export interface RouteDocumentCheck {
  routeId: string;
  truckId: number;
  countries: string[];
  requiredDocuments: CountryDocumentRequirement[];
  userDocuments: EurasianDocument[];
  missingDocuments: CountryDocumentRequirement[];
  expiringDocuments: EurasianDocument[];
  validDocuments: EurasianDocument[];
  deficiencyCount: number;
  completionPercentage: number;
  estimatedCompletionTime: number;
  totalEstimatedCost: number;
  lastChecked: string;
}

export interface DocumentUploadProgress {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedBytes: number;
  progress: number;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  errorMessage?: string;
  ocrProgress?: number;
  validationStatus?: 'validating' | 'valid' | 'invalid';
  validationErrors?: string[];
}

export interface DocumentValidationRule {
  field: string;
  type: 'required' | 'date' | 'format' | 'length' | 'pattern';
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  message: string;
  severity: 'error' | 'warning';
}

export interface DocumentValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  confidence: number;
  extractedData: Record<string, any>;
  suggestions: string[];
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  suggestion?: string;
}

export interface EurasianRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  countries: string[];
  distance: number;
  estimatedDuration: number;
  estimatedCost: number;
  difficulty: 'easy' | 'medium' | 'hard';
  popularity: number;
  seasonal: boolean;
  restrictions: string[];
  borderCrossings: BorderCrossing[];
  tolls: TollInfo[];
  fuelStations: FuelStation[];
  requiredDocumentCount: number;
  averageProcessingTime: number;
  lastUpdated: string;
}

export interface BorderCrossing {
  id: string;
  name: string;
  fromCountry: string;
  toCountry: string;
  location: {
    latitude: number;
    longitude: number;
  };
  operatingHours: string;
  averageWaitTime: number;
  facilities: string[];
  restrictions: string[];
  contacts: {
    phone?: string;
    email?: string;
  };
}

export interface TollInfo {
  id: string;
  countryCode: string;
  name: string;
  cost: number;
  currency: string;
  vehicleTypes: string[];
  paymentMethods: string[];
  location: string;
}

export interface FuelStation {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  address: string;
  fuelTypes: string[];
  facilities: string[];
  operatingHours: string;
  rating: number;
}

export interface DocumentNotification {
  id: string;
  type: 'expiring' | 'expired' | 'missing' | 'invalid' | 'uploaded';
  documentId?: number;
  truckId: number;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  isRead: boolean;
  actionRequired: boolean;
  actionUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface DocumentExportOptions {
  format: 'pdf' | 'excel' | 'csv' | 'json';
  includeExpired: boolean;
  includeValid: boolean;
  countries: string[];
  truckIds: number[];
  dateRange: {
    start: string;
    end: string;
  };
  groupBy: 'truck' | 'country' | 'document_type' | 'status';
  sortBy: 'expiry_date' | 'created_date' | 'status' | 'truck';
  includeFiles: boolean;
}

export interface DocumentAuditLog {
  id: string;
  documentId: number;
  action: 'created' | 'updated' | 'deleted' | 'uploaded' | 'viewed' | 'validated';
  userId: number;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

export interface EurasianModuleSettings {
  autoValidation: boolean;
  ocrEnabled: boolean;
  notificationChannels: string[];
  reminderDaysBefore: number[];
  maxFileSize: number;
  allowedFileTypes: string[];
  requireDigitalSignature: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  archiveAfterMonths: number;
  encryptionLevel: 'standard' | 'high' | 'maximum';
}