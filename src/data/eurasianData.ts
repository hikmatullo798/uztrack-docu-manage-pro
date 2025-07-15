import { 
  CountryDocumentRequirement, 
  EurasianRoute, 
  BorderCrossing, 
  TollInfo,
  DocumentValidationRule
} from '@/types/eurasian';

// Russia Document Requirements
export const russiaDocuments: CountryDocumentRequirement[] = [
  {
    id: 1,
    countryCode: 'RU',
    documentType: 'glonass_license',
    displayName: 'GLONASS/GPS Litsenziya',
    description: 'GLONASS/GPS tizimi uchun litsenziya',
    isMandatory: true,
    validityPeriodMonths: 12,
    reminderDaysBefore: [90, 30, 15, 7, 3, 1],
    category: 'vehicle',
    priority: 'critical',
    processingTimeHours: 168,
    estimatedCost: 25000,
    currency: 'RUB',
    issuingAuthority: 'Rossiya Transport vazirligi',
    requiredFields: ['vehicle_vin', 'registration_number', 'device_serial'],
    fileFormats: ['pdf', 'jpg', 'png'],
    maxFileSizeMB: 10
  },
  {
    id: 2,
    countryCode: 'RU',
    documentType: 'freight_license',
    displayName: 'Yuk tashish litsenziyasi',
    description: 'Rossiyada yuk tashish uchun litsenziya',
    isMandatory: true,
    validityPeriodMonths: 60,
    reminderDaysBefore: [180, 90, 30, 15, 7],
    category: 'vehicle',
    priority: 'critical',
    processingTimeHours: 720,
    estimatedCost: 75000,
    currency: 'RUB',
    issuingAuthority: 'Transport litsenziyalash markazi',
    requiredFields: ['company_name', 'vehicle_count', 'insurance_policy'],
    fileFormats: ['pdf'],
    maxFileSizeMB: 15
  },
  {
    id: 3,
    countryCode: 'RU',
    documentType: 'euro_certificate',
    displayName: 'EURO standart sertifikati',
    description: 'Ekologik standart EURO-4/5 sertifikati',
    isMandatory: true,
    validityPeriodMonths: 60,
    reminderDaysBefore: [180, 90, 30, 15],
    category: 'vehicle',
    priority: 'high',
    processingTimeHours: 240,
    estimatedCost: 15000,
    currency: 'RUB',
    issuingAuthority: 'Ekologiya vazirligi',
    requiredFields: ['engine_number', 'emission_standard', 'test_date'],
    fileFormats: ['pdf', 'jpg'],
    maxFileSizeMB: 8
  },
  {
    id: 4,
    countryCode: 'RU',
    documentType: 'technical_inspection',
    displayName: 'Texnik ko\'rik sertifikati',
    description: 'Texnik holat bo\'yicha ko\'rik sertifikati',
    isMandatory: true,
    validityPeriodMonths: 12,
    reminderDaysBefore: [60, 30, 15, 7, 3],
    category: 'vehicle',
    priority: 'high',
    processingTimeHours: 24,
    estimatedCost: 8000,
    currency: 'RUB',
    issuingAuthority: 'Avtotexnik ko\'rik markazi',
    requiredFields: ['inspection_date', 'inspector_name', 'next_inspection'],
    fileFormats: ['pdf', 'jpg', 'png'],
    maxFileSizeMB: 5
  },
  {
    id: 5,
    countryCode: 'RU',
    documentType: 'osago_insurance',
    displayName: 'OSAGO sug\'urta polisi',
    description: 'Majburiy avtosug\'urta polisi',
    isMandatory: true,
    validityPeriodMonths: 12,
    reminderDaysBefore: [30, 15, 7, 3, 1],
    category: 'insurance',
    priority: 'critical',
    processingTimeHours: 2,
    estimatedCost: 45000,
    currency: 'RUB',
    issuingAuthority: 'Sug\'urta kompaniyasi',
    requiredFields: ['policy_number', 'insured_amount', 'coverage_area'],
    fileFormats: ['pdf', 'jpg'],
    maxFileSizeMB: 3
  },
  {
    id: 6,
    countryCode: 'RU',
    documentType: 'international_license',
    displayName: 'Xalqaro haydovchilik guvohnomasi',
    description: 'Xalqaro haydovchilik litsenziyasi',
    isMandatory: true,
    validityPeriodMonths: 36,
    reminderDaysBefore: [90, 30, 15, 7],
    category: 'driver',
    priority: 'critical',
    processingTimeHours: 168,
    estimatedCost: 5000,
    currency: 'RUB',
    issuingAuthority: 'GAI',
    requiredFields: ['license_number', 'category', 'photo'],
    fileFormats: ['pdf', 'jpg'],
    maxFileSizeMB: 5
  }
];

// Kazakhstan Document Requirements
export const kazakhstanDocuments: CountryDocumentRequirement[] = [
  {
    id: 7,
    countryCode: 'KZ',
    documentType: 'transit_permit',
    displayName: 'Tranzit ruxsatnomasi',
    description: 'Qozog\'iston orqali tranzit ruxsatnomasi',
    isMandatory: true,
    validityPeriodMonths: 6,
    reminderDaysBefore: [60, 30, 15, 7, 3],
    category: 'transit',
    priority: 'critical',
    processingTimeHours: 72,
    estimatedCost: 15000,
    currency: 'KZT',
    issuingAuthority: 'Qozog\'iston Transport vazirligi',
    requiredFields: ['route_details', 'cargo_description', 'transit_duration'],
    fileFormats: ['pdf', 'doc', 'jpg'],
    maxFileSizeMB: 10
  },
  {
    id: 8,
    countryCode: 'KZ',
    documentType: 'cargo_manifest',
    displayName: 'Yuk manifesti',
    description: 'Yuk ro\'yxati va tavsifi',
    isMandatory: true,
    validityPeriodMonths: 1,
    reminderDaysBefore: [15, 7, 3, 1],
    category: 'cargo',
    priority: 'high',
    processingTimeHours: 12,
    estimatedCost: 5000,
    currency: 'KZT',
    issuingAuthority: 'Bojxona xizmati',
    requiredFields: ['cargo_weight', 'cargo_value', 'origin_destination'],
    fileFormats: ['pdf', 'excel', 'doc'],
    maxFileSizeMB: 8
  },
  {
    id: 9,
    countryCode: 'KZ',
    documentType: 'customs_declaration',
    displayName: 'Bojxona deklaratsiyasi',
    description: 'Yuklar uchun bojxona deklaratsiyasi',
    isMandatory: true,
    validityPeriodMonths: 1,
    reminderDaysBefore: [15, 7, 3, 1],
    category: 'cargo',
    priority: 'critical',
    processingTimeHours: 24,
    estimatedCost: 12000,
    currency: 'KZT',
    issuingAuthority: 'Bojxona qo\'mitasi',
    requiredFields: ['hs_code', 'declared_value', 'tax_amount'],
    fileFormats: ['pdf', 'xml'],
    maxFileSizeMB: 15
  },
  {
    id: 10,
    countryCode: 'KZ',
    documentType: 'veterinary_certificate',
    displayName: 'Veterinariya sertifikati',
    description: 'Oziq-ovqat mahsulotlari uchun veterinariya sertifikati',
    isMandatory: false,
    validityPeriodMonths: 1,
    reminderDaysBefore: [15, 7, 3],
    category: 'special',
    priority: 'medium',
    processingTimeHours: 48,
    estimatedCost: 8000,
    currency: 'KZT',
    issuingAuthority: 'Veterinariya xizmati',
    requiredFields: ['product_type', 'origin_farm', 'health_status'],
    fileFormats: ['pdf', 'jpg'],
    maxFileSizeMB: 5
  }
];

// Other CIS Countries Documents
export const cisDocuments: CountryDocumentRequirement[] = [
  {
    id: 11,
    countryCode: 'BY',
    documentType: 'tir_carnet',
    displayName: 'TIR Carnet',
    description: 'Tranzit rejimi hujjati',
    isMandatory: true,
    validityPeriodMonths: 12,
    reminderDaysBefore: [90, 30, 15, 7],
    category: 'transit',
    priority: 'critical',
    processingTimeHours: 168,
    estimatedCost: 50,
    currency: 'USD',
    issuingAuthority: 'TIR markazi',
    requiredFields: ['carnet_number', 'guarantee_amount', 'route'],
    fileFormats: ['pdf'],
    maxFileSizeMB: 10
  },
  {
    id: 12,
    countryCode: 'ALL',
    documentType: 'cmr_document',
    displayName: 'CMR shartnomasi',
    description: 'Xalqaro yuk tashish shartnomasi',
    isMandatory: true,
    validityPeriodMonths: 12,
    reminderDaysBefore: [60, 30, 15, 7, 3],
    category: 'cargo',
    priority: 'critical',
    processingTimeHours: 1,
    estimatedCost: 10,
    currency: 'USD',
    issuingAuthority: 'Transport kompaniyasi',
    requiredFields: ['consignor', 'consignee', 'cargo_description', 'freight_charges'],
    fileFormats: ['pdf', 'jpg'],
    maxFileSizeMB: 5
  },
  {
    id: 13,
    countryCode: 'ALL',
    documentType: 'international_insurance',
    displayName: 'Xalqaro sug\'urta polisi',
    description: 'Green Card - xalqaro sug\'urta',
    isMandatory: true,
    validityPeriodMonths: 12,
    reminderDaysBefore: [30, 15, 7, 3, 1],
    category: 'insurance',
    priority: 'critical',
    processingTimeHours: 24,
    estimatedCost: 500,
    currency: 'USD',
    issuingAuthority: 'Sug\'urta kompaniyasi',
    requiredFields: ['policy_number', 'coverage_countries', 'vehicle_details'],
    fileFormats: ['pdf', 'jpg'],
    maxFileSizeMB: 3
  },
  {
    id: 14,
    countryCode: 'ALL',
    documentType: 'fuel_documentation',
    displayName: 'Yoqilg\'i xarajatlari hujjati',
    description: 'Yoqilg\'i xarajatlari va to\'lovlari hujjatlari',
    isMandatory: false,
    validityPeriodMonths: 1,
    reminderDaysBefore: [15, 7, 3],
    category: 'vehicle',
    priority: 'low',
    processingTimeHours: 1,
    estimatedCost: 0,
    currency: 'USD',
    issuingAuthority: 'Yoqilg\'i stansiyasi',
    requiredFields: ['fuel_amount', 'price_per_liter', 'station_details'],
    fileFormats: ['pdf', 'jpg', 'png'],
    maxFileSizeMB: 2
  }
];

// Combine all document requirements
export const allDocumentRequirements = [
  ...russiaDocuments,
  ...kazakhstanDocuments,
  ...cisDocuments
];

// Eurasian Routes
export const eurasianRoutes: EurasianRoute[] = [
  {
    id: 'route_1',
    name: 'Toshkent - Moskva (Standart)',
    origin: 'Toshkent, O\'zbekiston',
    destination: 'Moskva, Rossiya',
    countries: ['UZ', 'KZ', 'RU'],
    distance: 2847,
    estimatedDuration: 35,
    estimatedCost: 1250,
    difficulty: 'medium',
    popularity: 95,
    seasonal: false,
    restrictions: ['winter_equipment'],
    borderCrossings: [],
    tolls: [],
    fuelStations: [],
    requiredDocumentCount: 12,
    averageProcessingTime: 48,
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'route_2',
    name: 'Toshkent - Berlin (Yevropa)',
    origin: 'Toshkent, O\'zbekiston',
    destination: 'Berlin, Germaniya',
    countries: ['UZ', 'KZ', 'RU', 'BY', 'PL', 'DE'],
    distance: 4521,
    estimatedDuration: 48,
    estimatedCost: 2100,
    difficulty: 'hard',
    popularity: 75,
    seasonal: true,
    restrictions: ['euro_standards', 'winter_equipment', 'toll_payments'],
    borderCrossings: [],
    tolls: [],
    fuelStations: [],
    requiredDocumentCount: 18,
    averageProcessingTime: 72,
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'route_3',
    name: 'Toshkent - Varshava (Polsha)',
    origin: 'Toshkent, O\'zbekiston',
    destination: 'Varshava, Polsha',
    countries: ['UZ', 'KZ', 'RU', 'BY', 'PL'],
    distance: 4102,
    estimatedDuration: 45,
    estimatedCost: 1890,
    difficulty: 'medium',
    popularity: 80,
    seasonal: false,
    restrictions: ['euro_standards', 'toll_payments'],
    borderCrossings: [],
    tolls: [],
    fuelStations: [],
    requiredDocumentCount: 15,
    averageProcessingTime: 60,
    lastUpdated: '2024-01-15T00:00:00Z'
  }
];

// Border Crossings
export const borderCrossings: BorderCrossing[] = [
  {
    id: 'uz_kz_alat',
    name: 'Alat-Konayev',
    fromCountry: 'UZ',
    toCountry: 'KZ',
    location: { latitude: 42.1234, longitude: 69.5678 },
    operatingHours: '24/7',
    averageWaitTime: 4,
    facilities: ['customs', 'parking', 'fuel', 'restaurant'],
    restrictions: ['weight_limit_40t'],
    contacts: {
      phone: '+998 90 123 45 67',
      email: 'alat.border@customs.uz'
    }
  },
  {
    id: 'kz_ru_troitsk',
    name: 'Troitsk',
    fromCountry: 'KZ',
    toCountry: 'RU',
    location: { latitude: 54.0833, longitude: 61.5667 },
    operatingHours: '24/7',
    averageWaitTime: 8,
    facilities: ['customs', 'quarantine', 'parking', 'fuel'],
    restrictions: ['document_check', 'cargo_inspection'],
    contacts: {
      phone: '+7 351 234 56 78',
      email: 'troitsk@customs.ru'
    }
  }
];

// Document Validation Rules
export const documentValidationRules: Record<string, DocumentValidationRule[]> = {
  glonass_license: [
    {
      field: 'license_number',
      type: 'required',
      message: 'Litsenziya raqami kiritilishi shart',
      severity: 'error'
    },
    {
      field: 'vehicle_vin',
      type: 'pattern',
      pattern: '^[A-HJ-NPR-Z0-9]{17}$',
      message: 'VIN raqam 17 ta belgi bo\'lishi kerak',
      severity: 'error'
    },
    {
      field: 'expiry_date',
      type: 'date',
      message: 'Amal qilish muddati to\'g\'ri formatda bo\'lishi kerak',
      severity: 'error'
    }
  ],
  transit_permit: [
    {
      field: 'permit_number',
      type: 'required',
      message: 'Ruxsatnoma raqami kiritilishi shart',
      severity: 'error'
    },
    {
      field: 'route_details',
      type: 'required',
      message: 'Marshrut ma\'lumotlari kiritilishi shart',
      severity: 'error'
    },
    {
      field: 'cargo_weight',
      type: 'pattern',
      pattern: '^[0-9]+(\\\\.[0-9]+)?$',
      message: 'Yuk og\'irligi raqam formatida bo\'lishi kerak',
      severity: 'warning'
    }
  ]
};

// Mock Toll Information
export const tollInfo: TollInfo[] = [
  {
    id: 'toll_ru_m4',
    countryCode: 'RU',
    name: 'M4 Don avtomobil yo\'li',
    cost: 1500,
    currency: 'RUB',
    vehicleTypes: ['truck', 'heavy_vehicle'],
    paymentMethods: ['cash', 'card', 'transponder'],
    location: 'Moskva - Rostov-na-Donu'
  },
  {
    id: 'toll_pl_a1',
    countryCode: 'PL',
    name: 'A1 Avtomobil yo\'li',
    cost: 45,
    currency: 'PLN',
    vehicleTypes: ['all_vehicles'],
    paymentMethods: ['cash', 'card', 'viabox'],
    location: 'Gdansk - Lodz'
  }
];
