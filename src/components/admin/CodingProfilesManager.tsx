import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Github, PieChart, Code, Save, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Import newly created components
import PlatformProfileForm from "./coding-profiles/PlatformProfileForm";
import BadgesManager from "./coding-profiles/BadgesManager";
import JsonEditor from "./coding-profiles/JsonEditor";
import { CodingProfileData } from "./coding-profiles/types";

export default function CodingProfilesManager() {
  // Tab state
  const [activeTab, setActiveTab] = useState("usernames");
  const queryClient = useQueryClient();
  
  // Main state for the profiles data
  const [profilesData, setProfilesData] = useState<CodingProfileData>({
    github: {
      username: "",
      displayStats: true
    },
    leetcode: {
      username: "",
      displayStats: true
    },
    hackerrank: {
      username: "",
      displayStats: true,
      badges: []
    }
  });

  // State for the JSON editor
  const [jsonEditorContent, setJsonEditorContent] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch profile data from Supabase
  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ['admin-coding-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coding_profiles')
        .select('*')
        .limit(1)
        .single();
      
      if (error) {
        console.error("Error fetching coding profiles:", error);
        if (error.code !== 'PGRST116') { // Not found error
          toast.error("Failed to load coding profiles");
        }
        return null;
      }
      
      return data;
    }
  });

  // Fetch HackerRank badges from Supabase
  const { data: badgesData, isLoading: isBadgesLoading } = useQuery({
    queryKey: ['admin-hackerrank-badges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hackerrank_badges')
        .select('*')
        .order('level', { ascending: false });
      
      if (error) {
        console.error("Error fetching HackerRank badges:", error);
        toast.error("Failed to load HackerRank badges");
        return [];
      }
      
      return data;
    }
  });

  // Update profiles mutation
  const updateProfilesMutation = useMutation({
    mutationFn: async ({
      github_username,
      github_display,
      leetcode_username,
      leetcode_display,
      hackerrank_username,
      hackerrank_display,
      id
    }: {
      github_username: string;
      github_display: boolean;
      leetcode_username: string;
      leetcode_display: boolean;
      hackerrank_username: string;
      hackerrank_display: boolean;
      id?: string;
    }) => {
      // If we have an existing profile, update it
      if (id) {
        const { error } = await supabase
          .from('coding_profiles')
          .update({
            github_username,
            github_display,
            leetcode_username,
            leetcode_display,
            hackerrank_username,
            hackerrank_display,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);
        
        if (error) throw error;
      } else {
        // Otherwise, insert a new profile
        const { error } = await supabase
          .from('coding_profiles')
          .insert({
            github_username,
            github_display,
            leetcode_username,
            leetcode_display,
            hackerrank_username,
            hackerrank_display
          });
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Coding profiles saved successfully!");
      queryClient.invalidateQueries({ queryKey: ['admin-coding-profiles'] });
      queryClient.invalidateQueries({ queryKey: ['coding-profiles'] });
    },
    onError: (error) => {
      console.error("Error saving profiles:", error);
      toast.error("Failed to save coding profiles");
    }
  });

  // Initialize profile data when it's loaded
  useEffect(() => {
    if (profileData) {
      setProfilesData({
        github: {
          username: profileData.github_username || "",
          displayStats: profileData.github_display
        },
        leetcode: {
          username: profileData.leetcode_username || "",
          displayStats: profileData.leetcode_display
        },
        hackerrank: {
          username: profileData.hackerrank_username || "",
          displayStats: profileData.hackerrank_display,
          badges: []
        }
      });
    }
  }, [profileData]);

  // Initialize badges when they're loaded
  useEffect(() => {
    if (badgesData) {
      setProfilesData(prev => ({
        ...prev,
        hackerrank: {
          ...prev.hackerrank,
          badges: badgesData.map(badge => ({
            id: badge.id,
            name: badge.name,
            level: badge.level,
            stars: badge.stars,
            colorClass: badge.color_class
          }))
        }
      }));
    }
  }, [badgesData]);

  // When data changes, update the JSON editor
  useEffect(() => {
    if (activeTab === "json-editor") {
      setJsonEditorContent(JSON.stringify(profilesData, null, 2));
    }
  }, [activeTab, profilesData]);

  const handleUsernameChange = (platform: 'github' | 'leetcode' | 'hackerrank', value: string) => {
    setProfilesData(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        username: value
      }
    }));
  };

  const handleDisplayStatsChange = (platform: 'github' | 'leetcode' | 'hackerrank', value: boolean) => {
    setProfilesData(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        displayStats: value
      }
    }));
  };

  const handleSaveProfiles = async () => {
    setIsSubmitting(true);
    try {
      await updateProfilesMutation.mutateAsync({
        github_username: profilesData.github.username,
        github_display: profilesData.github.displayStats,
        leetcode_username: profilesData.leetcode.username,
        leetcode_display: profilesData.leetcode.displayStats,
        hackerrank_username: profilesData.hackerrank.username,
        hackerrank_display: profilesData.hackerrank.displayStats,
        id: profileData?.id
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJsonChange = (value: string) => {
    setJsonEditorContent(value);
    setJsonError(null);
  };

  const handleSaveJson = async () => {
    try {
      const parsed = JSON.parse(jsonEditorContent);
      
      // Basic validation
      if (!parsed.github || !parsed.leetcode || !parsed.hackerrank) {
        throw new Error("JSON must include github, leetcode, and hackerrank objects");
      }
      
      setProfilesData(parsed);
      
      // Save profile data
      await updateProfilesMutation.mutateAsync({
        github_username: parsed.github.username,
        github_display: parsed.github.displayStats,
        leetcode_username: parsed.leetcode.username,
        leetcode_display: parsed.leetcode.displayStats,
        hackerrank_username: parsed.hackerrank.username,
        hackerrank_display: parsed.hackerrank.displayStats,
        id: profileData?.id
      });
      
      // We don't handle badges from JSON currently as it would be complex
      // to determine which to create, update, or delete
      
      toast.success("JSON saved and applied successfully!");
      setJsonError(null);
    } catch (error) {
      setJsonError((error as Error).message);
      toast.error("Invalid JSON: " + (error as Error).message);
    }
  };

  if (isProfileLoading || isBadgesLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <p className="text-lg">Loading coding profiles data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Coding Profiles</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="usernames">Platform Usernames</TabsTrigger>
          <TabsTrigger value="badges">HackerRank Badges</TabsTrigger>
          <TabsTrigger value="json-editor">JSON Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usernames" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GitHub settings */}
            <PlatformProfileForm
              title="GitHub"
              platform="github"
              icon={<Github className="h-5 w-5 text-primary" />}
              username={profilesData.github.username}
              displayStats={profilesData.github.displayStats}
              onUsernameChange={handleUsernameChange}
              onDisplayChange={handleDisplayStatsChange}
            />

            {/* LeetCode settings */}
            <PlatformProfileForm
              title="LeetCode"
              platform="leetcode"
              icon={<PieChart className="h-5 w-5 text-primary" />}
              username={profilesData.leetcode.username}
              displayStats={profilesData.leetcode.displayStats}
              onUsernameChange={handleUsernameChange}
              onDisplayChange={handleDisplayStatsChange}
              animationDelay={0.1}
            />

            {/* HackerRank settings */}
            <PlatformProfileForm
              title="HackerRank"
              platform="hackerrank"
              icon={<Code className="h-5 w-5 text-primary" />}
              username={profilesData.hackerrank.username}
              displayStats={profilesData.hackerrank.displayStats}
              onUsernameChange={handleUsernameChange}
              onDisplayChange={handleDisplayStatsChange}
              animationDelay={0.2}
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleSaveProfiles} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="badges" className="space-y-4">
          <BadgesManager />
        </TabsContent>
        
        <TabsContent value="json-editor" className="space-y-4">
          <JsonEditor
            jsonContent={jsonEditorContent}
            onJsonChange={handleJsonChange}
            onSave={handleSaveJson}
            jsonError={jsonError}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
