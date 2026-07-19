export const APP_NAME = 'Digifox';
export const APP_DESCRIPTION = 'Digital Agency Management Platform';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const USER_ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  CLIENT: 'client',
  GUEST: 'guest',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const PORTFOLIO_CATEGORIES = [
  'WordPress Website',
  'Shopify Store',
  '3D Animated Website',
  'Google Ranking',
  'Ad Creative',
] as const;

export const SERVICES = [
  { id: 'web-development', name: 'Website Development', icon: 'Globe', description: 'Custom websites built with cutting-edge technology for maximum performance and conversions.' },
  { id: 'mobile-apps', name: 'Mobile Apps', icon: 'Smartphone', description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.' },
  { id: 'shopify', name: 'Shopify', icon: 'ShoppingBag', description: 'High-converting Shopify stores with custom themes and seamless checkout flows.' },
  { id: 'wordpress', name: 'WordPress', icon: 'FileText', description: 'Professional WordPress websites with custom themes and powerful functionality.' },
  { id: 'seo', name: 'SEO', icon: 'Search', description: 'Data-driven SEO strategies that drive organic traffic and improve search rankings.' },
  { id: 'geo', name: 'GEO', icon: 'MapPin', description: 'Generative Engine Optimization for AI-powered search visibility.' },
  { id: 'meta-ads', name: 'Meta Ads', icon: 'Target', description: 'Strategic Meta advertising campaigns that maximize ROI and brand reach.' },
  { id: 'ad-creatives', name: 'Ad Creatives', icon: 'Image', description: 'Scroll-stopping ad creatives that capture attention and drive conversions.' },
] as const;

export const LEAD_STATUSES = [
  'onboarded',
  'step 1',
  'step 2',
  'done',
] as const;

export const PROJECT_STAGES = [
  { id: 'onboarded', name: 'Onboarded', description: '', icon: '📋' },
  { id: 'step-1', name: 'Step 1', description: 'Brand details submitted, build started', icon: '⚙️' },
  { id: 'step-2', name: 'Step 2', description: 'Updated as required', icon: '🏗️' },
  { id: 'done', name: 'Done', description: '', icon: '🚀' },
] as const;

export const NAV_ITEMS = {
  admin: [
    { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
    { label: 'Portfolio', href: '/admin/portfolio', icon: 'Briefcase' },
    { label: 'Studio', href: '/admin/studio', icon: 'Palette' },
    { label: 'Management', href: '/admin/management', icon: 'Users' },
    { label: 'Profile', href: '/admin/profile', icon: 'User' },
  ],
  employee: [
    { label: 'Dashboard', href: '/employee', icon: 'LayoutDashboard' },
    { label: 'Portfolio', href: '/employee/portfolio', icon: 'Briefcase' },
    { label: 'Studio', href: '/employee/studio', icon: 'Palette' },
    { label: 'Profile', href: '/employee/profile', icon: 'User' },
  ],
  client: [
    { label: 'Dashboard', href: '/client', icon: 'LayoutDashboard' },
    { label: 'Portfolio', href: '/client/portfolio', icon: 'Briefcase' },
    { label: 'My Projects', href: '/client/projects', icon: 'Rocket' },
    { label: 'Support', href: '/client/support', icon: 'MessageCircle' },
    { label: 'Profile', href: '/client/profile', icon: 'User' },
  ],
  guest: [
    { label: 'Home', href: '/home', icon: 'Home' },
    { label: 'Portfolio', href: '/portfolio', icon: 'Briefcase' },
    { label: 'Studio', href: '/studio', icon: 'Palette' },
    { label: 'Pricing', href: '/pricing', icon: 'Tag' },
    { label: 'Contact', href: '/contact', icon: 'Mail' },
  ],
} as const;
