import type { EnterpriseRecord, MetricTrend } from '@/types/api.types'
import type { User } from '@/types/auth.types'

// Mock 30-day Trend Data
export const mockTrends: MetricTrend[] = [
  { timestamp: 'Nov 01', revenue: 64200, target: 60000, expenses: 22000, activeUsers: 34100, latencyMs: 42 },
  { timestamp: 'Nov 03', revenue: 71000, target: 61000, expenses: 23100, activeUsers: 35800, latencyMs: 39 },
  { timestamp: 'Nov 05', revenue: 68500, target: 62000, expenses: 21800, activeUsers: 36400, latencyMs: 44 },
  { timestamp: 'Nov 07', revenue: 82400, target: 63000, expenses: 24500, activeUsers: 38900, latencyMs: 38 },
  { timestamp: 'Nov 09', revenue: 79100, target: 64000, expenses: 23800, activeUsers: 39200, latencyMs: 41 },
  { timestamp: 'Nov 11', revenue: 88900, target: 65000, expenses: 25100, activeUsers: 41300, latencyMs: 36 },
  { timestamp: 'Nov 13', revenue: 94200, target: 66000, expenses: 26000, activeUsers: 43200, latencyMs: 45 },
  { timestamp: 'Nov 15', revenue: 91500, target: 67000, expenses: 24900, activeUsers: 44100, latencyMs: 37 },
  { timestamp: 'Nov 17', revenue: 104800, target: 68000, expenses: 27400, activeUsers: 48219, latencyMs: 35 },
]

// Mock Category Distribution for Pie / Donut
export const mockDistribution = [
  { name: 'Infrastructure', value: 38, color: '#6366f1' }, // Indigo
  { name: 'Security & Auth', value: 26, color: '#06b6d4' }, // Cyan
  { name: 'Analytics Core', value: 22, color: '#10b981' }, // Emerald
  { name: 'APIs & Gateways', value: 14, color: '#f59e0b' }, // Amber
]

// Mock Enterprise Records
export const initialRecords: EnterpriseRecord[] = [
  {
    id: 'rec_01',
    name: 'Primary Ingestion Cluster',
    code: 'ING-CLUSTER-US-E1',
    category: 'Infrastructure',
    region: 'US-East',
    status: 'Healthy',
    healthScore: 99.4,
    throughputEps: 54200,
    lastUpdated: '1 min ago',
  },
  {
    id: 'rec_02',
    name: 'Edge Auth Gateway',
    code: 'GW-AUTH-EU-C1',
    category: 'Security',
    region: 'EU-Central',
    status: 'Healthy',
    healthScore: 98.8,
    throughputEps: 28400,
    lastUpdated: '4 mins ago',
  },
  {
    id: 'rec_03',
    name: 'Real-Time Pipeline Broker',
    code: 'KAFKA-BROKER-AP-S1',
    category: 'Integration',
    region: 'APAC-South',
    status: 'Degraded',
    healthScore: 84.2,
    throughputEps: 18100,
    lastUpdated: '12 mins ago',
  },
  {
    id: 'rec_04',
    name: 'Telemetry Aggregator v2',
    code: 'TEL-AGG-US-W2',
    category: 'Analytics',
    region: 'US-West',
    status: 'Healthy',
    healthScore: 99.9,
    throughputEps: 87300,
    lastUpdated: 'Just now',
  },
  {
    id: 'rec_05',
    name: 'Cold Storage Archive Vault',
    code: 'VAULT-COLD-US-E2',
    category: 'Infrastructure',
    region: 'US-East',
    status: 'Maintenance',
    healthScore: 91.0,
    throughputEps: 4200,
    lastUpdated: '45 mins ago',
  },
  {
    id: 'rec_06',
    name: 'OAuth Federation Relay',
    code: 'OAUTH-RELAY-EU-W1',
    category: 'Security',
    region: 'EU-Central',
    status: 'Healthy',
    healthScore: 97.5,
    throughputEps: 19800,
    lastUpdated: '8 mins ago',
  },
  {
    id: 'rec_07',
    name: 'Customer Intelligence Spark Node',
    code: 'SPARK-CI-US-W1',
    category: 'Analytics',
    region: 'US-West',
    status: 'Critical',
    healthScore: 61.2,
    throughputEps: 6400,
    lastUpdated: '2 mins ago',
  },
  {
    id: 'rec_08',
    name: 'Global DNS Anycast Load Balancer',
    code: 'ALB-DNS-GLOBAL',
    category: 'Infrastructure',
    region: 'US-East',
    status: 'Healthy',
    healthScore: 100.0,
    throughputEps: 124500,
    lastUpdated: 'Just now',
  },
]

// Mock Users Directory
export const initialUsers: User[] = [
  {
    id: 'usr_01',
    name: 'Alex Developer',
    email: 'alex@nexuscorp.internal',
    role: 'SuperAdmin',
    department: 'Platform Architecture',
    lastLogin: 'Just now',
    isActive: true,
  },
  {
    id: 'usr_02',
    name: 'Sarah Chen',
    email: 'sarah.chen@nexuscorp.internal',
    role: 'Analyst',
    department: 'Business Intelligence',
    lastLogin: '25 mins ago',
    isActive: true,
  },
  {
    id: 'usr_03',
    name: 'Marcus Vance',
    email: 'm.vance@nexuscorp.internal',
    role: 'Analyst',
    department: 'Revenue Operations',
    lastLogin: '2 hours ago',
    isActive: true,
  },
  {
    id: 'usr_04',
    name: 'Fatima Al-Mansoor',
    email: 'f.mansoor@nexuscorp.internal',
    role: 'SuperAdmin',
    department: 'Global Security & Compliance',
    lastLogin: '1 day ago',
    isActive: true,
  },
  {
    id: 'usr_05',
    name: 'David Kim',
    email: 'd.kim@nexuscorp.internal',
    role: 'Viewer',
    department: 'Executive Leadership',
    lastLogin: '3 days ago',
    isActive: true,
  },
  {
    id: 'usr_06',
    name: 'Elena Rostova',
    email: 'elena.r@nexuscorp.internal',
    role: 'Viewer',
    department: 'External Audits',
    lastLogin: '1 week ago',
    isActive: false,
  },
]

