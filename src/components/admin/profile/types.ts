
export interface ProfileSettings {
  id: string;
  name: string;
  title: string;
  description: string;
  resume_url?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  twitter_url?: string | null;
  form_endpoint?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
