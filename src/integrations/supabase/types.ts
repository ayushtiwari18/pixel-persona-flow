export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_access: {
        Row: {
          granted_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          granted_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          granted_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          date: string
          description: string | null
          id: string
          image: string | null
          issuer: string
          title: string
          url: string | null
        }
        Insert: {
          date: string
          description?: string | null
          id?: string
          image?: string | null
          issuer: string
          title: string
          url?: string | null
        }
        Update: {
          date?: string
          description?: string | null
          id?: string
          image?: string | null
          issuer?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      coding_profiles: {
        Row: {
          created_at: string | null
          github_display: boolean | null
          github_username: string | null
          hackerrank_display: boolean | null
          hackerrank_username: string | null
          id: string
          leetcode_display: boolean | null
          leetcode_username: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          github_display?: boolean | null
          github_username?: string | null
          hackerrank_display?: boolean | null
          hackerrank_username?: string | null
          id?: string
          leetcode_display?: boolean | null
          leetcode_username?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          github_display?: boolean | null
          github_username?: string | null
          hackerrank_display?: boolean | null
          hackerrank_username?: string | null
          id?: string
          leetcode_display?: boolean | null
          leetcode_username?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          responded_at: string | null
          status: string | null
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          responded_at?: string | null
          status?: string | null
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          responded_at?: string | null
          status?: string | null
          subject?: string
        }
        Relationships: []
      }
      hackathons: {
        Row: {
          date: string
          id: string
          image: string | null
          learnings: string[]
          name: string
          result: string
          role: string
        }
        Insert: {
          date: string
          id?: string
          image?: string | null
          learnings?: string[]
          name: string
          result: string
          role: string
        }
        Update: {
          date?: string
          id?: string
          image?: string | null
          learnings?: string[]
          name?: string
          result?: string
          role?: string
        }
        Relationships: []
      }
      hackerrank_badges: {
        Row: {
          color_class: string
          created_at: string | null
          id: string
          level: number
          name: string
          stars: number
          updated_at: string | null
        }
        Insert: {
          color_class: string
          created_at?: string | null
          id?: string
          level: number
          name: string
          stars: number
          updated_at?: string | null
        }
        Update: {
          color_class?: string
          created_at?: string | null
          id?: string
          level?: number
          name?: string
          stars?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      profile_settings: {
        Row: {
          created_at: string | null
          description: string
          form_endpoint: string | null
          github_url: string | null
          id: string
          linkedin_url: string | null
          name: string
          resume_url: string | null
          title: string
          twitter_url: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          form_endpoint?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          name: string
          resume_url?: string | null
          title: string
          twitter_url?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          form_endpoint?: string | null
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string
          resume_url?: string | null
          title?: string
          twitter_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          date: string
          demourl: string | null
          description: string
          featured: boolean
          githuburl: string | null
          id: string
          image: string
          submissioncount: number | null
          technologies: string[]
          title: string
        }
        Insert: {
          category: string
          date: string
          demourl?: string | null
          description: string
          featured?: boolean
          githuburl?: string | null
          id?: string
          image: string
          submissioncount?: number | null
          technologies?: string[]
          title: string
        }
        Update: {
          category?: string
          date?: string
          demourl?: string | null
          description?: string
          featured?: boolean
          githuburl?: string | null
          id?: string
          image?: string
          submissioncount?: number | null
          technologies?: string[]
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
