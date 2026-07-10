export type UserRole = 'admin' | 'employee' | 'client' | 'guest';

export interface Profile {
  id: string;
  user_id: string;
  role: UserRole;
  full_name: string;
  email: string;
  avatar_url: string | null;
  phone: string | null;
  designation: string | null;
  department: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  source: 'website' | 'meta' | 'google' | 'referral' | 'manual';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  budget: number | null;
  notes: string | null;
  assigned_to: string | null;
  assigned_employee?: Profile;
  follow_ups: FollowUp[];
  created_at: string;
  updated_at: string;
}

export interface FollowUp {
  id: string;
  lead_id: string;
  notes: string;
  scheduled_at: string;
  completed: boolean;
  created_at: string;
}

export interface Employee {
  id: string;
  user_id: string;
  profile: Profile;
  designation: string;
  department: string;
  performance_score: number;
  projects_assigned: number;
  leads_converted: number;
  joined_at: string;
}

export interface Client {
  id: string;
  user_id: string;
  profile: Profile;
  company: string;
  projects: Project[];
  payment_status: 'pending' | 'partial' | 'completed';
  total_paid: number;
  total_due: number;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  client_id: string;
  client?: Client;
  assigned_team: string[];
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
  progress: number;
  timeline_start: string;
  timeline_end: string;
  stages: ProjectStage[];
  created_at: string;
  updated_at: string;
}

export interface ProjectStage {
  id: string;
  project_id: string;
  stage_name: string;
  stage_order: number;
  percentage: number;
  status: 'pending' | 'in-progress' | 'completed';
  notes: string | null;
  documents: string[];
  images: string[];
  videos: string[];
  completed_at: string | null;
  sub_steps: ProjectSubStep[];
}

export interface ProjectSubStep {
  id: string;
  stage_id: string;
  name: string;
  completed: boolean;
  completed_at: string | null;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  videos: string[];
  technologies: string[];
  live_url: string | null;
  featured: boolean;
  order: number;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  active: boolean;
  order: number;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'lead_assigned' | 'project_update' | 'payment' | 'ticket' | 'general';
  title: string;
  message: string;
  read: boolean;
  link: string | null;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
  avatar_url: string | null;
  active: boolean;
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  active: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  author_id: string;
  author?: Profile;
  tags: string[];
  published: boolean;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: string;
  client_id: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  user?: Profile;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link: string | null;
  active: boolean;
  order: number;
}

export interface CompanySetting {
  id: string;
  key: string;
  value: string;
  updated_by: string;
  updated_at: string;
}

export interface DashboardStats {
  revenue: number;
  revenueChange: number;
  totalLeads: number;
  newLeads: number;
  activeProjects: number;
  completedProjects: number;
  totalEmployees: number;
  totalClients: number;
}
