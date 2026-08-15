// 1. أنواع الخطط وحالة الاشتراك
export type PlanType = 'free' | 'pro' | 'agency';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trailing';

// 2. بيانات الوكالة (المستخدم)
export interface Agency {
  id: string;
  agency_name: string;
  logo_url?: string;
  plan: PlanType;
  created_at: string;
}

// 3. أنواع وأشكال عناصر بناء البوابة (Portal Builder Elements)
export type ElementType = 'text' | 'textarea' | 'file' | 'logo' | 'select' | 'heading';

export interface PortalElement {
  id: string;
  type: ElementType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // في حال اختيار نوع "select"
}

// 4. إعدادات الثيم والمظهر للبوابة
export interface ThemeConfig {
  primaryColor: string;
  backgroundColor: string;
  darkMode: boolean;
  customLogo?: string;
}

// 5. نموذج البوابة (Portal Template)
export interface Portal {
  id: string;
  agency_id: string;
  title: string;
  schema: PortalElement[]; // هيكل الصفحة المبني بالسحب والإفلات
  theme_config: ThemeConfig;
  created_at: string;
}

// 6. الروابط المخصصة الفريدة (One-Time Portal Links)
export interface PortalLink {
  id: string;
  portal_id: string;
  token: string;
  is_used: boolean;
  created_at: string;
}

// 7. إجابات العملاء والملفات (Submissions)
export interface Submission {
  id: string;
  portal_link_id: string;
  client_name: string;
  data: Record<string, any>; // الإجابات النصية
  files: Record<string, string>; // روابط الملفات المرفوعة في Supabase Storage
  submitted_at: string;
}

// 8. سجلات اشتراك Paddle في قاعدة البيانات
export interface Subscription {
  id: string;
  user_id: string;
  paddle_customer_id: string;
  paddle_subscription_id: string;
  plan: PlanType;
  status: SubscriptionStatus;
  current_period_end: string;
}
