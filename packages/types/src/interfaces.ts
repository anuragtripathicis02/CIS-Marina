import {
  UserRole,
  BookingStatus,
  PaymentStatus,
  Currency,
  BusinessType,
  YachtOperationalStatus,
  CrewRole,
  CrewStatus,
  CertStatus,
  MaintenanceStatus,
  MaintenancePriority,
  InspectionType,
  InspectionStatus,
  InspectionItemResult,
  ChecklistStatus,
  ChecklistItemResult,
  TaskStatus,
  TaskPriority,
  LeadStatus,
  DeviceType,
  DeviceStatus,
  MetricType,
  TelemetryQuality,
  AlertSeverity,
  AlertCategory,
  AlertStatus,
  GeofenceShape,
  GeofenceEventType,
  MarinaStatus,
  DockStatus,
  BerthStatus,
  BerthReservationStatus,
  ContractType,
  ContractStatus,
  ClubMemberStatus,
  MembershipBillingCycle,
  ClubEventStatus,
  LeadSource,
  ActivityType,
  FollowUpStatus,
  AutomationTrigger,
  TemplateChannel,
  CampaignStatus,
  CustomerBookingStatus,
  ServiceRequestStatus,
  ConciergeRequestStatus,
  SupportTicketStatus,
  SupportTicketPriority,
  WaitlistStatus,
  SubscriptionPlan,
  SubscriptionStatus,
  TaxCategory,
  PrivacyRequestType,
  PrivacyRequestStatus,
  SystemHealthStatus,
  ForecastConfidence,
  MaintenanceRiskLevel,
  CustomerSegment,
  ExecutiveAlertCategory,
  ExecutiveAlertSeverity,
} from './enums';

export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code?: string;
    message: string;
  };
  meta?: {
    timestamp?: string;
    correlationId?: string;
    totalItems?: number;
  };
}

export interface IOrganization {
  id: string;
  name: string;
  slug: string;
  legalName?: string;
  taxId?: string;
  countryCode: string;
  defaultCurrency: Currency;
  timezone: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IUser {
  id: string;
  organizationId?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  isActive: boolean;
  createdAt: Date | string;
}

export interface IYacht {
  id: string;
  organizationId: string;
  name: string;
  registrationNumber?: string;
  make?: string;
  model?: string;
  yearBuilt?: number;
  lengthFt?: number;
  capacityPassengers: number;
  cabins: number;
  bathrooms: number;
  hourlyRate: number;
  dailyRate: number;
  currency: Currency;
  isActive: boolean;
  operationalStatus?: YachtOperationalStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ICrewMember {
  id: string;
  organizationId: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: CrewRole;
  customRole?: string;
  nationality?: string;
  status: CrewStatus;
  hireDate?: Date | string;
  isActive: boolean;
  certifications?: ICrewCertification[];
  licenses?: ICrewLicense[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ICrewCertification {
  id: string;
  crewMemberId: string;
  name: string;
  issuingAuthority?: string;
  certificateNumber?: string;
  issueDate?: Date | string;
  expiryDate?: Date | string;
  documentUrl?: string;
  status: CertStatus;
  createdAt: Date | string;
}

export interface ICrewLicense {
  id: string;
  crewMemberId: string;
  name: string;
  licenseNumber?: string;
  issuingAuthority?: string;
  issueDate?: Date | string;
  expiryDate?: Date | string;
  documentUrl?: string;
  status: CertStatus;
  createdAt: Date | string;
}

export interface ICrewAssignment {
  id: string;
  bookingId: string;
  crewMemberId: string;
  roleAssigned: string;
  startTime: Date | string;
  endTime: Date | string;
  status: string;
  notes?: string;
  crewMember?: ICrewMember;
  createdAt: Date | string;
}

export interface IMaintenanceRecord {
  id: string;
  organizationId: string;
  yachtId: string;
  vendorId?: string;
  inspectionId?: string;
  title: string;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  isBlocking: boolean;
  reportedById?: string;
  assignedVendorName?: string;
  dueDate?: Date | string;
  completedDate?: Date | string;
  estimatedCost?: number;
  actualCost?: number;
  currency: Currency;
  notes?: string;
  yacht?: IYacht;
  vendor?: IVendor;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IVendor {
  id: string;
  organizationId: string;
  name: string;
  category: string;
  contactName?: string;
  email?: string;
  phone?: string;
  location?: string;
  services?: string;
  status: string;
  notes?: string;
  createdAt: Date | string;
}

export interface IChecklistTemplate {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  type: string;
  isActive: boolean;
  items: IChecklistTemplateItem[];
  createdAt: Date | string;
}

export interface IChecklistTemplateItem {
  id: string;
  templateId: string;
  title: string;
  description?: string;
  isRequired: boolean;
  displayOrder: number;
}

export interface IChecklistInstance {
  id: string;
  organizationId: string;
  bookingId?: string;
  yachtId: string;
  templateId: string;
  assignedUserId?: string;
  status: ChecklistStatus;
  completedAt?: Date | string;
  items: IChecklistInstanceItem[];
  createdAt: Date | string;
}

export interface IChecklistInstanceItem {
  id: string;
  instanceId: string;
  title: string;
  result: ChecklistItemResult;
  notes?: string;
  completedBy?: string;
  completedAt?: Date | string;
}

export interface IInspection {
  id: string;
  organizationId: string;
  yachtId: string;
  bookingId?: string;
  inspectorUserId?: string;
  type: InspectionType;
  status: InspectionStatus;
  notes?: string;
  inspectionDate: Date | string;
  items: IInspectionItem[];
  maintenanceRecords?: IMaintenanceRecord[];
  createdAt: Date | string;
}

export interface IInspectionItem {
  id: string;
  inspectionId: string;
  categoryName: string;
  itemName: string;
  result: InspectionItemResult;
  notes?: string;
  maintenanceCreated: boolean;
}

export interface IOperationalTask {
  id: string;
  organizationId: string;
  yachtId?: string;
  bookingId?: string;
  assignedUserId?: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date | string;
  completedAt?: Date | string;
  createdAt: Date | string;
}

export interface IYachtReadiness {
  yachtId: string;
  isReady: boolean;
  status: YachtOperationalStatus;
  reasons: string[];
  assignedCrewCount: number;
  checklistCompleted: boolean;
  inspectionCompleted: boolean;
  activeBlockingMaintenanceCount: number;
}

export interface IOperationalMetrics {
  todaysCharters: number;
  upcomingCharters: number;
  yachtsReady: number;
  yachtsNotReady: number;
  crewAssignedCount: number;
  crewMissingCertCount: number;
  openMaintenanceCount: number;
  overdueMaintenanceCount: number;
  pendingInspectionsCount: number;
  openOperationalTasksCount: number;
}

export interface IDevice {
  id: string;
  organizationId: string;
  yachtId?: string;
  deviceName: string;
  deviceType: DeviceType;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  firmwareVersion?: string;
  status: DeviceStatus;
  lastSeenAt?: Date | string;
  installedAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  yacht?: IYacht;
}

export interface IDeviceCredentials {
  deviceId: string;
  secretKey: string;
  tokenHash: string;
}

export interface ITelemetryRecord {
  id: string;
  organizationId: string;
  yachtId: string;
  deviceId: string;
  timestamp: Date | string;
  metricType: MetricType;
  value: number;
  unit: string;
  quality: TelemetryQuality;
  source: string;
  eventId?: string;
  createdAt: Date | string;
}

export interface ITelemetryIngestionPayload {
  deviceId: string;
  timestamp?: string;
  eventId?: string;
  metrics: {
    metricType: MetricType;
    value: number;
    unit?: string;
    quality?: TelemetryQuality;
  }[];
}

export interface IAlertRule {
  id: string;
  organizationId: string;
  yachtId?: string;
  deviceId?: string;
  metricType: MetricType;
  operator: '<' | '<=' | '>' | '>=' | '==';
  threshold: number;
  severity: AlertSeverity;
  category: AlertCategory;
  isEnabled: boolean;
  cooldownMinutes: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IAlert {
  id: string;
  organizationId: string;
  yachtId: string;
  deviceId?: string;
  ruleId?: string;
  category: AlertCategory;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  message: string;
  metricType?: MetricType;
  metricValue?: number;
  threshold?: number;
  triggerCount: number;
  lastTriggeredAt: Date | string;
  acknowledgedById?: string;
  acknowledgedAt?: Date | string;
  resolvedById?: string;
  resolvedAt?: Date | string;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  yacht?: IYacht;
  device?: IDevice;
}

export interface IGeofence {
  id: string;
  organizationId: string;
  yachtId?: string;
  name: string;
  description?: string;
  shape: GeofenceShape;
  centerLat?: number;
  centerLng?: number;
  radiusMeters?: number;
  polygonCoords?: { lat: number; lng: number }[];
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IGeofenceEvent {
  id: string;
  organizationId: string;
  yachtId: string;
  deviceId?: string;
  geofenceId: string;
  eventType: GeofenceEventType;
  latitude: number;
  longitude: number;
  timestamp: Date | string;
  createdAt: Date | string;
  geofence?: IGeofence;
}

export interface IDeviceEvent {
  id: string;
  organizationId: string;
  deviceId: string;
  eventType: string;
  payload?: any;
  timestamp: Date | string;
  createdAt: Date | string;
}

export interface IVesselHealthScore {
  yachtId: string;
  score: number;
  label: string;
  activeAlertsCount: number;
  devicesOnlineCount: number;
  devicesOfflineCount: number;
  readinessStatus: YachtOperationalStatus;
}

export interface IIoTProvider {
  registerDevice(organizationId: string, yachtId: string, dto: Partial<IDevice>): Promise<{ device: IDevice; credentials: IDeviceCredentials }>;
  authenticateDevice(deviceId: string, secretKey: string): Promise<boolean>;
  receiveTelemetry(payload: ITelemetryIngestionPayload): Promise<{ ingestedCount: number }>;
  getDeviceStatus(deviceId: string): Promise<DeviceStatus>;
  disconnectDevice(deviceId: string): Promise<void>;
}

// Phase 4 Interfaces
export interface IMarina {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  address: string;
  country: string;
  city: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  operatingHours?: string;
  timezone: string;
  currency: Currency;
  status: MarinaStatus;
  docks?: IDock[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IDock {
  id: string;
  marinaId: string;
  name: string;
  description?: string;
  location?: string;
  numberOfBerths: number;
  status: DockStatus;
  berths?: IBerth[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IBerth {
  id: string;
  dockId: string;
  berthNumber: string;
  maxLengthFt: number;
  maxBeamFt: number;
  maxDraftFt: number;
  powerAvailable: boolean;
  waterAvailable: boolean;
  sewageService: boolean;
  fuelService: boolean;
  status: BerthStatus;
  pricePerNight: number;
  currency: Currency;
  dock?: IDock;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IMarinaVessel {
  id: string;
  organizationId: string;
  yachtId?: string;
  customerId?: string;
  vesselName: string;
  registrationNumber?: string;
  type?: string;
  lengthFt: number;
  beamFt: number;
  draftFt: number;
  homePort?: string;
  insurancePolicyNumber?: string;
  insuranceExpiry?: Date | string;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IBerthReservation {
  id: string;
  organizationId: string;
  marinaId: string;
  berthId: string;
  vesselId: string;
  customerId: string;
  bookingId?: string;
  checkInDate: Date | string;
  checkOutDate: Date | string;
  status: BerthReservationStatus;
  totalAmount: number;
  currency: Currency;
  notes?: string;
  berth?: IBerth;
  vessel?: IMarinaVessel;
  services?: IReservationService[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IMarinaService {
  id: string;
  organizationId: string;
  name: string;
  category: string;
  pricingModel: string;
  unitPrice: number;
  currency: Currency;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IReservationService {
  id: string;
  reservationId: string;
  serviceId: string;
  quantity: number;
  totalPrice: number;
  service?: IMarinaService;
  createdAt: Date | string;
}

export interface IMarinaContract {
  id: string;
  organizationId: string;
  marinaId: string;
  berthId: string;
  customerId: string;
  vesselId: string;
  contractNumber: string;
  type: ContractType;
  startDate: Date | string;
  endDate: Date | string;
  price: number;
  currency: Currency;
  status: ContractStatus;
  terms?: string;
  documentUrl?: string;
  berth?: IBerth;
  vessel?: IMarinaVessel;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IMarinaCheckinCheckout {
  id: string;
  reservationId: string;
  actionType: 'CHECK_IN' | 'CHECK_OUT';
  timestamp: Date | string;
  conditionRating?: number;
  conditionNotes?: string;
  staffUserId?: string;
  createdAt: Date | string;
}

export interface IClubMember {
  id: string;
  organizationId: string;
  customerId: string;
  userId?: string;
  membershipNumber: string;
  planId: string;
  status: ClubMemberStatus;
  joinDate: Date | string;
  expiryDate?: Date | string;
  notes?: string;
  plan?: IMembershipPlan;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IMembershipPlan {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  price: number;
  billingCycle: MembershipBillingCycle;
  benefits?: string[];
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IClubEvent {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  eventDate: Date | string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  registeredCount: number;
  price: number;
  status: ClubEventStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IEventRegistration {
  id: string;
  eventId: string;
  memberId: string;
  status: string;
  registeredAt: Date | string;
  notes?: string;
  event?: IClubEvent;
  member?: IClubMember;
}

export interface IClubService {
  id: string;
  organizationId: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  createdAt: Date | string;
}

export interface IMarinaOccupancyMetrics {
  totalBerths: number;
  occupiedBerths: number;
  availableBerths: number;
  reservedBerths: number;
  maintenanceBerths: number;
  occupancyRate: number;
  todaysArrivals: number;
  todaysDepartures: number;
  overdueCheckouts: number;
  monthlyRevenue: number;
}

// Phase 5 Interfaces
export interface ILead {
  id: string;
  organizationId?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  source: LeadSource;
  interestedYachtId?: string;
  interestedMarinaId?: string;
  budget?: number;
  preferredDates?: string;
  businessType?: any;
  fleetSize?: any;
  locations?: string;
  currentSoftware?: string;
  challenge?: string;
  message?: string;
  status: LeadStatus;
  score: number;
  assignedUserId?: string;
  convertedCustomerId?: string;
  convertedAt?: Date | string;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ILeadActivity {
  id: string;
  organizationId: string;
  leadId?: string;
  customerId?: string;
  userId?: string;
  type: ActivityType;
  summary: string;
  notes?: string;
  createdAt: Date | string;
}

export interface IFollowUpTask {
  id: string;
  organizationId: string;
  leadId?: string;
  customerId?: string;
  assignedUserId?: string;
  dueDate: Date | string;
  priority: TaskPriority;
  notes?: string;
  status: FollowUpStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IAutomationWorkflow {
  id: string;
  organizationId: string;
  name: string;
  trigger: AutomationTrigger;
  conditions?: any;
  actions: any;
  isEnabled: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IAutomationRun {
  id: string;
  organizationId: string;
  workflowId: string;
  eventId: string;
  startedAt: Date | string;
  completedAt?: Date | string;
  result: 'SUCCESS' | 'SKIPPED' | 'FAILED';
  actionsExecuted: number;
  error?: string;
}

export interface ICommunicationTemplate {
  id: string;
  organizationId: string;
  name: string;
  channel: TemplateChannel;
  subject?: string;
  body: string;
  variables: string[];
  status: 'ACTIVE' | 'DRAFT';
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ICustomerPreference {
  id: string;
  customerId: string;
  emailOptIn: boolean;
  whatsappOptIn: boolean;
  smsOptIn: boolean;
  updatedAt: Date | string;
}

export interface ICampaign {
  id: string;
  organizationId: string;
  name: string;
  channel: string;
  startDate: Date | string;
  endDate?: Date | string;
  budget?: number;
  targetSegment?: string;
  status: CampaignStatus;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  leadsCount?: number;
  bookingsCount?: number;
  revenueGenerated?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ICustomerFeedback {
  id: string;
  organizationId: string;
  customerId: string;
  bookingId?: string;
  rating: number;
  comment?: string;
  createdAt: Date | string;
}

export interface IAiUsageLog {
  id: string;
  organizationId: string;
  userId?: string;
  feature: string;
  provider: string;
  promptCategory: string;
  outputSummary?: string;
  tokensUsed: number;
  estimatedCost: number;
  approvedStatus: 'APPROVED' | 'REJECTED' | 'PENDING';
  timestamp: Date | string;
}

export interface IAiPromptRequest {
  feature: string;
  prompt: string;
  context?: any;
}

export interface IAiPromptResponse {
  resultText: string;
  structuredData?: any;
  recommendationReason?: string;
  tokensUsed: number;
}

export interface IRevenueAnalyticsMetrics {
  totalRevenue: number;
  bookingRevenue: number;
  marinaRevenue: number;
  membershipRevenue: number;
  serviceRevenue: number;
  outstandingPayments: number;
  averageBookingValue: number;
  revenueByYacht: { yachtId: string; yachtName: string; revenue: number }[];
  revenueByMarina: { marinaId: string; marinaName: string; revenue: number }[];
  aiPricingRecommendations: {
    targetId: string;
    targetName: string;
    currentPrice: number;
    recommendedPrice: number;
    reason: string;
    demandLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  }[];
}

// Phase 6 Customer Portal Interfaces
export interface ICustomerPortalSummary {
  customerName: string;
  email: string;
  membershipTier?: string;
  upcomingBooking?: {
    id: string;
    yachtName: string;
    startDate: string;
    status: CustomerBookingStatus;
    totalAmount: number;
  };
  activeServicesCount: number;
  openTicketsCount: number;
  upcomingEventsCount: number;
}

export interface IConciergeRequest {
  id: string;
  organizationId: string;
  customerId: string;
  bookingId?: string;
  category: string;
  description: string;
  preferredDate?: Date | string;
  budget?: number;
  status: ConciergeRequestStatus;
  proposalDetails?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IServiceRequestDetail {
  id: string;
  organizationId: string;
  customerId: string;
  bookingId?: string;
  serviceId: string;
  serviceName: string;
  requestedDate: Date | string;
  quantity: number;
  totalPrice: number;
  status: ServiceRequestStatus;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ISupportTicket {
  id: string;
  organizationId: string;
  customerId: string;
  bookingId?: string;
  subject: string;
  category: string;
  description: string;
  priority: SupportTicketPriority;
  status: SupportTicketStatus;
  assignedStaffUserId?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  messages?: ISupportMessage[];
}

export interface ISupportMessage {
  id: string;
  ticketId: string;
  senderType: 'CUSTOMER' | 'STAFF' | 'SYSTEM';
  senderName: string;
  message: string;
  createdAt: Date | string;
}

export interface IEventWaitlist {
  id: string;
  eventId: string;
  customerId: string;
  joinedAt: Date | string;
  status: WaitlistStatus;
  notifiedAt?: Date | string;
}

export interface ICustomerMessage {
  id: string;
  customerId: string;
  organizationId: string;
  bookingId?: string;
  senderType: 'CUSTOMER' | 'CONCIERGE' | 'STAFF';
  senderName: string;
  message: string;
  createdAt: Date | string;
}

export interface IPublicReview {
  id: string;
  customerId: string;
  customerName: string;
  yachtId?: string;
  marinaId?: string;
  rating: number;
  comment: string;
  isPublished: boolean;
  createdAt: Date | string;
}

// Phase 7 Enterprise Interfaces
export interface IBranch {
  id: string;
  organizationId: string;
  name: string;
  code: string;
  country: string;
  region?: string;
  address: string;
  timezone: string;
  currency: Currency;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ICountryConfig {
  id: string;
  countryCode: string;
  countryName: string;
  defaultCurrency: Currency;
  currencySymbol: string;
  timezone: string;
  dateFormat: string;
  phoneCode: string;
  addressFormat: string;
  taxModel: string;
  invoiceRules: string;
  enabledPaymentProviders: string[];
  enabledLanguages: string[];
}

export interface IExchangeRate {
  id: string;
  baseCurrency: Currency;
  targetCurrency: Currency;
  rate: number;
  provider: string;
  timestamp: Date | string;
}

export interface ITaxRule {
  id: string;
  organizationId: string;
  countryCode: string;
  taxName: string;
  taxRate: number;
  category: TaxCategory;
  jurisdiction: string;
  isActive: boolean;
  createdAt: Date | string;
}

export interface IFeatureFlag {
  id: string;
  level: 'PLATFORM' | 'ORGANIZATION' | 'BRANCH';
  targetId: string;
  flagKey: string;
  isEnabled: boolean;
}

export interface ISubscription {
  id: string;
  organizationId: string;
  planName: SubscriptionPlan;
  status: SubscriptionStatus;
  userLimit: number;
  yachtLimit: number;
  bookingLimit: number;
  aiRequestLimit: number;
  storageLimitMb: number;
  currentStorageUsedMb: number;
  renewsAt: Date | string;
}

export interface IConsentRecord {
  id: string;
  customerId: string;
  consentType: string;
  policyVersion: string;
  isGranted: boolean;
  channel: string;
  source: string;
  timestamp: Date | string;
}

export interface IPrivacyRequest {
  id: string;
  organizationId: string;
  customerId: string;
  requestType: PrivacyRequestType;
  status: PrivacyRequestStatus;
  requestedAt: Date | string;
  completedAt?: Date | string;
}

export interface ISystemHealthLog {
  id: string;
  serviceName: string;
  status: SystemHealthStatus;
  latencyMs: number;
  message: string;
  timestamp: Date | string;
}

export interface IEnterpriseSummary {
  totalOrganizations: number;
  activeSubscriptions: number;
  activeBranchesCount: number;
  supportedCountriesCount: number;
  systemHealth: SystemHealthStatus;
  storageUsedGb: number;
}

// Phase 8 Advanced Analytics & Executive Interfaces
export interface IExecutiveSummary {
  totalRevenue: number;
  revenueGrowthPercent: number;
  totalBookings: number;
  avgBookingValue: number;
  fleetUtilizationPercent: number;
  marinaOccupancyPercent: number;
  customerGrowthPercent: number;
  activeMaintenanceRisksCount: number;
  aiExecutiveNarrative: string;
}

export interface IKpiDefinition {
  id: string;
  organizationId: string;
  kpiKey: string;
  name: string;
  currentValue: number;
  targetValue: number;
  warningThreshold: number;
  criticalThreshold: number;
  unit: string;
  timePeriod: string;
}

export interface IRevenueForecast {
  period: string;
  actualRevenue?: number;
  predictedRevenue: number;
  confidence: ForecastConfidence;
  historicalComparisonGrowth: number;
}

export interface IDemandHeatmapPoint {
  date: string;
  demandLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  bookingVelocity: number;
  seasonTag?: string;
}

export interface IYachtPerformanceScore {
  yachtId: string;
  yachtName: string;
  performanceScore: number;
  utilizationRate: number;
  revenueGenerated: number;
  downtimeDays: number;
  statusTag: string;
}

export interface IPredictiveMaintenanceRisk {
  yachtId: string;
  yachtName: string;
  riskLevel: MaintenanceRiskLevel;
  riskDrivers: string[];
  recommendedInspectionDate: string;
}

export interface ICustomerIntelligenceSegment {
  segment: CustomerSegment;
  count: number;
  totalRevenue: number;
  averageClvEstimate: number;
  churnRiskCount: number;
}

export interface IExecutiveAlert {
  id: string;
  organizationId: string;
  category: ExecutiveAlertCategory;
  severity: ExecutiveAlertSeverity;
  title: string;
  message: string;
  recommendedAction: string;
  createdAt: Date | string;
}

export interface ISavedReport {
  id: string;
  organizationId: string;
  name: string;
  metricKeys: string[];
  dimensions: string[];
  scheduleCron?: string;
  createdAt: Date | string;
}

export interface IAiAnalyticsResponse {
  query: string;
  answerText: string;
  citationSource: string;
  dataSnippet?: any;
}
