// =============================================================================
// Mock Data — Anomalo Investigator Pro
// Replace with real API calls when backend is ready
// =============================================================================

// ─── Brand ───────────────────────────────────────────────────────────────────
export const brand = {
  name: "Anomalo Investigator Pro",
  tagline: "Your numbers changed. Find out why.",
  description:
    "An autonomous agent system that detects anomalies, investigates root causes by querying Exasol directly, and delivers evidence-backed explanations — no SQL required.",
};

// ─── Dashboard Metrics ───────────────────────────────────────────────────────
export const dashboardMetrics = {
  revenue: {
    label: "Revenue",
    value: "$1,247,832",
    change: -30,
    trend: [82, 85, 78, 91, 88, 72, 51],
    isAnomaly: true,
    anomalyText: "30% decline this week",
  },
  orders: {
    label: "Orders",
    value: "14,291",
    change: -12,
    trend: [120, 118, 125, 115, 110, 105, 98],
    isAnomaly: false,
  },
  conversion: {
    label: "Conversion",
    value: "3.2%",
    change: -0.4,
    trend: [3.6, 3.5, 3.4, 3.5, 3.3, 3.2, 3.2],
    isAnomaly: false,
  },
  anomalyScore: {
    label: "Anomaly Score",
    value: "94",
    change: 94,
    trend: [12, 8, 15, 11, 42, 78, 94],
    isAnomaly: true,
    anomalyText: "Critical threshold exceeded",
  },
};

// ─── Revenue Chart Data (with anomaly zone) ──────────────────────────────────
export const revenueChartData = [
  { date: "Jul 28", revenue: 195000, baseline: 195000, anomaly: false },
  { date: "Jul 29", revenue: 202000, baseline: 198000, anomaly: false },
  { date: "Jul 30", revenue: 188000, baseline: 196000, anomaly: false },
  { date: "Jul 31", revenue: 201000, baseline: 199000, anomaly: false },
  { date: "Aug 1", revenue: 198000, baseline: 200000, anomaly: false },
  { date: "Aug 2", revenue: 205000, baseline: 201000, anomaly: false },
  { date: "Aug 3", revenue: 192000, baseline: 198000, anomaly: false },
  { date: "Aug 4", revenue: 210000, baseline: 202000, anomaly: false },
  { date: "Aug 5", revenue: 168000, baseline: 203000, anomaly: true },
  { date: "Aug 6", revenue: 142000, baseline: 201000, anomaly: true },
  { date: "Aug 7", revenue: 135000, baseline: 199000, anomaly: true },
];

// ─── Evidence Timeline ───────────────────────────────────────────────────────
export const evidenceTimeline = [
  { date: "Aug 3", event: "Revenue within normal range", type: "normal" as const },
  { date: "Aug 5", event: "Price increase applied to 3 Electronics products", type: "cause" as const },
  { date: "Aug 5", event: "Order volume drops 60% on affected products", type: "effect" as const },
  { date: "Aug 6", event: "Electronics category revenue drops 45%", type: "effect" as const },
  { date: "Aug 7", event: "Decline concentrated in South Asia region", type: "effect" as const },
  { date: "Aug 7", event: "Root cause confirmed — price increase", type: "confirmed" as const },
];

// ─── Investigation Steps ─────────────────────────────────────────────────────
export const investigationSteps = [
  {
    id: "watcher",
    label: "Watcher",
    purpose: "Scans metrics for anomalies",
    input: "Revenue, Orders, Conversion — last 7 days",
    output: "Anomaly flagged: Revenue −30%",
    icon: "eye",
    duration: 2500,
  },
  {
    id: "investigator",
    label: "Investigator",
    purpose: "Generates and executes SQL queries",
    input: "Anomaly context from Watcher",
    output: "Category, Region, Product, Price dimensions isolated",
    icon: "search",
    duration: 3000,
  },
  {
    id: "reasoner",
    label: "Reasoner",
    purpose: "Cross-references evidence across dimensions",
    input: "Query results from Investigator",
    output: "Hypothesis: Price increase caused volume drop",
    icon: "brain",
    duration: 2000,
  },
  {
    id: "reporter",
    label: "Reporter",
    purpose: "Produces plain-English explanation",
    input: "Hypothesis + supporting data from Reasoner",
    output: "Root cause report with confidence score",
    icon: "file-text",
    duration: 2000,
  },
];

// ─── Terminal Trace Logs ─────────────────────────────────────────────────────
export const traceLogs = [
  { agent: "Watcher", message: "Scanning revenue metrics for the past 7 days...", delay: 0 },
  { agent: "Watcher", message: "Anomaly detected — Revenue dropped 30% week-over-week", delay: 800 },
  { agent: "Watcher", message: "Decline exceeds 15% threshold — flagging for investigation", delay: 1600 },
  { agent: "Watcher", message: "Handing off to Investigator Agent", delay: 2400 },
  { agent: "Investigator", message: "Initializing text-to-SQL engine...", delay: 3200 },
  { agent: "Investigator", message: "SELECT category, region, SUM(revenue) FROM sales WHERE date >= '2026-08-01' GROUP BY category, region", delay: 3800 },
  { agent: "Investigator", message: "Executed on Exasol — 142ms — Electronics in South Asia: largest decline", delay: 4400 },
  { agent: "Investigator", message: "SELECT product_id, price, quantity FROM orders WHERE category = 'Electronics' AND region = 'South Asia'", delay: 5000 },
  { agent: "Investigator", message: "Executed on Exasol — 98ms — 3 premium products: 60% quantity drop after price increase", delay: 5600 },
  { agent: "Investigator", message: "SELECT date, AVG(price), SUM(quantity) FROM orders WHERE category = 'Electronics' GROUP BY date", delay: 6200 },
  { agent: "Investigator", message: "Executed on Exasol — 87ms — Price increase correlates with quantity decline starting Aug 5", delay: 6800 },
  { agent: "Investigator", message: "Handing off to Reasoner Agent", delay: 7400 },
  { agent: "Reasoner", message: "Cross-referencing price changes with volume across regions...", delay: 8000 },
  { agent: "Reasoner", message: "Checking competitor activity — no significant changes detected", delay: 8600 },
  { agent: "Reasoner", message: "Checking supply chain — no disruptions in South Asia", delay: 9200 },
  { agent: "Reasoner", message: "Hypothesis: Price increase on Aug 5 caused 60% volume drop in Electronics", delay: 9800 },
  { agent: "Reasoner", message: "Confidence: 94% — supported by 3 independent data slices", delay: 10400 },
  { agent: "Reasoner", message: "Handing off to Reporter Agent", delay: 11000 },
  { agent: "Reporter", message: "Generating plain-English summary...", delay: 11600 },
  { agent: "Reporter", message: "Building visualization...", delay: 12200 },
  { agent: "Reporter", message: "Investigation complete — report ready", delay: 12800 },
];

// ─── Evidence Discovered (during investigation) ──────────────────────────────
export const evidenceDiscovered = [
  { label: "Revenue", value: "↓ 30%", color: "amber" as const, moment: 3 },
  { label: "Electronics", value: "↓ 45%", color: "amber" as const, moment: 5 },
  { label: "South Asia", value: "↓ 38%", color: "amber" as const, moment: 7 },
  { label: "Price", value: "↑ 15%", color: "blue" as const, moment: 9 },
  { label: "Orders", value: "↓ 60%", color: "amber" as const, moment: 11 },
  { label: "Correlation", value: "94%", color: "green" as const, moment: 16 },
];

// ─── Catalog Items ───────────────────────────────────────────────────────────
export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "scheduled";
  date: string;
  confidence: number;
  rootCause: string;
  affectedMetric: string;
  impact: string;
  tags: string[];
  author: string;
}

export const catalogItems: CatalogItem[] = [
  {
    id: "inv-001",
    title: "Electronics Revenue Drop — South Asia",
    description:
      "Revenue declined 30% in Electronics across South Asia after a price increase on three premium products.",
    status: "completed",
    date: "2026-08-07",
    confidence: 94,
    rootCause: "Price increase on premium Electronics products",
    affectedMetric: "Revenue",
    impact: "−30%",
    tags: ["revenue", "pricing", "electronics", "south-asia"],
    author: "System",
  },
  {
    id: "inv-002",
    title: "Clothing Category Spike — Europe",
    description:
      "Clothing revenue surged 22% in Europe during the first week of August, linked to a viral social media campaign.",
    status: "completed",
    date: "2026-08-05",
    confidence: 89,
    rootCause: "Viral social media campaign driving traffic",
    affectedMetric: "Revenue",
    impact: "+22%",
    tags: ["revenue", "marketing", "clothing", "europe"],
    author: "System",
  },
  {
    id: "inv-003",
    title: "Order Volume Decline — North America",
    description:
      "Order volume dropped 18% in North America over the past week. Root cause analysis underway.",
    status: "in-progress",
    date: "2026-08-08",
    confidence: 0,
    rootCause: "Under investigation",
    affectedMetric: "Order Volume",
    impact: "−18%",
    tags: ["orders", "north-america"],
    author: "System",
  },
  {
    id: "inv-004",
    title: "Home & Garden Flatline — Global",
    description:
      "Home & Garden revenue flat for three consecutive weeks. Scheduled deep-dive investigation for next Monday.",
    status: "scheduled",
    date: "2026-08-11",
    confidence: 0,
    rootCause: "Pending",
    affectedMetric: "Revenue",
    impact: "0%",
    tags: ["revenue", "home-garden", "global"],
    author: "Priya M.",
  },
  {
    id: "inv-005",
    title: "Refund Rate Increase — Electronics",
    description:
      "Refund rates for Electronics jumped from 4% to 9%. Traced to a defective charger batch from the Shenzhen warehouse.",
    status: "completed",
    date: "2026-08-03",
    confidence: 91,
    rootCause: "Defective charger batch from Shenzhen",
    affectedMetric: "Refund Rate",
    impact: "+125%",
    tags: ["refunds", "electronics", "supply-chain"],
    author: "System",
  },
  {
    id: "inv-006",
    title: "Customer Acquisition Cost Spike — APAC",
    description:
      "CAC rose 35% in APAC markets. Investigation analyzing channel-level ad spend and conversion rates.",
    status: "in-progress",
    date: "2026-08-09",
    confidence: 0,
    rootCause: "Under investigation",
    affectedMetric: "CAC",
    impact: "+35%",
    tags: ["cac", "marketing", "apac"],
    author: "Raj K.",
  },
];

// ─── Investigation Detail ────────────────────────────────────────────────────
export const investigationDetail = {
  id: "inv-001",
  title: "Electronics Revenue Drop — South Asia",
  status: "completed" as const,
  createdAt: "2026-08-07T10:24:00Z",
  completedAt: "2026-08-07T10:25:42Z",
  duration: "1 min 42 sec",
  confidence: 94,
  queriesRun: 3,
  avgLatency: "327ms",
  dimensions: 4,
  backend: "Exasol Personal",
  timeline: [
    { time: "10:24:00", agent: "Watcher", event: "Scanning revenue metrics for the past 7 days" },
    { time: "10:24:03", agent: "Watcher", event: "Anomaly detected — Revenue dropped 30% week-over-week" },
    { time: "10:24:05", agent: "Watcher", event: "Flagging for investigation — decline exceeds 15% threshold" },
    { time: "10:24:06", agent: "Investigator", event: "Initializing text-to-SQL engine" },
    { time: "10:24:08", agent: "Investigator", event: "Query: SELECT category, region, SUM(revenue) FROM sales GROUP BY category, region" },
    { time: "10:24:09", agent: "Investigator", event: "Executed on Exasol — 142ms" },
    { time: "10:24:11", agent: "Investigator", event: "Query: SELECT product_id, price, quantity FROM orders WHERE category = 'Electronics'" },
    { time: "10:24:12", agent: "Investigator", event: "Executed on Exasol — 98ms" },
    { time: "10:24:14", agent: "Investigator", event: "Query: SELECT date, AVG(price), SUM(quantity) FROM orders GROUP BY date" },
    { time: "10:24:15", agent: "Investigator", event: "Executed on Exasol — 87ms" },
    { time: "10:24:16", agent: "Reasoner", event: "Cross-referencing price changes with volume data across regions" },
    { time: "10:24:18", agent: "Reasoner", event: "Hypothesis formed — price increase on Aug 5 caused 60% volume drop" },
    { time: "10:24:19", agent: "Reporter", event: "Generating plain-English summary and supporting visualization" },
    { time: "10:25:42", agent: "Reporter", event: "Investigation complete — report ready" },
  ],
};

// ─── Comments ────────────────────────────────────────────────────────────────
export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export const comments: Comment[] = [
  {
    id: "c1",
    author: "Priya M.",
    avatar: "PM",
    text: "This explains the dip we saw on Monday. Can we revert the price change and monitor for a week?",
    timestamp: "2026-08-07 11:02",
  },
  {
    id: "c2",
    author: "Raj K.",
    avatar: "RK",
    text: "I checked competitor pricing — they're still at the old price point. This lines up with the report.",
    timestamp: "2026-08-07 11:18",
  },
  {
    id: "c3",
    author: "System",
    avatar: "AI",
    text: "Scheduled a follow-up investigation for Aug 14 to track the impact of any price adjustments.",
    timestamp: "2026-08-07 11:20",
  },
];

// ─── Report Data ─────────────────────────────────────────────────────────────
export const reportData = {
  headline: "Revenue dropped 30% due to a price increase on Electronics in South Asia",
  summary:
    "On August 5, 2026, three premium Electronics products in the South Asia region received a 15% price increase. This immediately triggered a 60% decline in order volume for those products, which compounded into a 30% revenue drop for the week.",

  rootCause: "Price increase on premium Electronics products",
  confidence: 94,
  queriesExecuted: 4,
  recordsAnalyzed: 2100000,
  dimensionsSliced: 4,

  evidenceChain: [
    { step: "Price +15%", detail: "Applied Aug 5 on 3 products" },
    { step: "Orders −60%", detail: "Volume collapse on affected SKUs" },
    { step: "Revenue −30%", detail: "Category-level impact" },
  ],

  whyWeBelieve: [
    { evidence: "Price increased 15% on Aug 5", strength: "strong" as const },
    { evidence: "Premium Electronics orders decreased 60% immediately after", strength: "strong" as const },
    { evidence: "Decline concentrated in South Asia only", strength: "strong" as const },
    { evidence: "Competitor activity unchanged during this period", strength: "corroborating" as const },
    { evidence: "Supply chain remained stable — no disruptions", strength: "corroborating" as const },
  ],

  alternatives: [
    { explanation: "Competitor activity", likelihood: "unlikely" as const, reason: "No pricing changes from competitors during this period" },
    { explanation: "Supply chain disruption", likelihood: "unlikely" as const, reason: "Inventory levels stable, no warehouse issues reported" },
    { explanation: "Regional event or holiday", likelihood: "unlikely" as const, reason: "No holidays or events in South Asia during Aug 5-7" },
    { explanation: "Seasonal demand shift", likelihood: "unlikely" as const, reason: "Other categories in same region unaffected" },
    { explanation: "Pricing change", likelihood: "confirmed" as const, reason: "Strongest temporal and magnitude correlation with decline" },
  ],

  keyFindings: [
    { metric: "Revenue Impact", value: "−30%", detail: "Week-over-week" },
    { metric: "Volume Drop", value: "−60%", detail: "Premium Electronics" },
    { metric: "Price Change", value: "+15%", detail: "Applied Aug 5" },
    { metric: "Region", value: "South Asia", detail: "Primary impact" },
  ],

  supportingEvidence: [
    {
      title: "Region Analysis",
      content: "South Asia: −45% revenue decline. All other regions stable.",
      metric: "−45%",
    },
    {
      title: "Category Breakdown",
      content: "Electronics: −45% vs. Clothing +2%, Home & Garden +5%",
      metric: "−45%",
    },
    {
      title: "Price Correlation",
      content: "Products with price increase showed 60% volume drop",
      metric: "94%",
    },
    {
      title: "Timeline Match",
      content: "Decline started exactly on Aug 5 — price change date",
      metric: "Exact",
    },
  ],
};

// ─── Chart Data ──────────────────────────────────────────────────────────────
export const chartData = {
  revenueVsPrice: [
    { date: "Aug 1", revenue: 45000, price: 520 },
    { date: "Aug 2", revenue: 47000, price: 520 },
    { date: "Aug 3", revenue: 44000, price: 520 },
    { date: "Aug 4", revenue: 46000, price: 520 },
    { date: "Aug 5", revenue: 38000, price: 598 },
    { date: "Aug 6", revenue: 28000, price: 598 },
    { date: "Aug 7", revenue: 25000, price: 598 },
  ],
};

// ─── Admin Data ──────────────────────────────────────────────────────────────
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "analyst" | "viewer";
  lastActive: string;
  investigations: number;
}

export const adminUsers: AdminUser[] = [
  { id: "u1", name: "Priya Mehta", email: "priya@company.com", role: "admin", lastActive: "2 min ago", investigations: 12 },
  { id: "u2", name: "Raj Kumar", email: "raj@company.com", role: "analyst", lastActive: "15 min ago", investigations: 8 },
  { id: "u3", name: "Sarah Chen", email: "sarah@company.com", role: "analyst", lastActive: "1 hr ago", investigations: 5 },
  { id: "u4", name: "Alex Rivera", email: "alex@company.com", role: "viewer", lastActive: "3 hrs ago", investigations: 0 },
  { id: "u5", name: "Dev Patel", email: "dev@company.com", role: "analyst", lastActive: "1 day ago", investigations: 3 },
];

export const adminStats = {
  totalInvestigations: 28,
  activeInvestigations: 2,
  completedThisWeek: 6,
  avgConfidence: 91,
  avgDuration: "1 min 38 sec",
  totalQueriesRun: 84,
  exasolUptime: "99.9%",
  llmTokensUsed: "142K",
};
