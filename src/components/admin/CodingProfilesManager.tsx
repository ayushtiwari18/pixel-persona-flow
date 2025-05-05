import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Edit, Plus, Trash, Code, Check, X, Github, PieChart, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type HackerRankBadge = {
  id: string;
  name: string;
  level: number;
  stars: number;
  colorClass: string;
};

type CodingProfileData = {
  github: {
    username: string;
    displayStats: boolean;
  };
  leetcode: {
    username: string;
    displayStats: boolean;
  };
  hackerrank: {
    username: string;
    displayStats: boolean;
    badges: HackerRankBadge[];
  };
};

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
  
  // State for currently editing badge
  const [editingBadge, setEditingBadge] = useState<HackerRankBadge | null>(null);
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

  // Badge mutation
  const badgeMutation = useMutation({
    mutationFn: async (operation: { 
      type: 'create' | 'update' | 'delete'; 
      badge: HackerRankBadge 
    }) => {
      if (operation.type === 'create') {
        const { name, level, stars, colorClass } = operation.badge;
        const { error } = await supabase
          .from('hackerrank_badges')
          .insert({ name, level, stars, color_class: colorClass });
        
        if (error) throw error;
      } else if (operation.type === 'update') {
        const { id, name, level, stars, colorClass } = operation.badge;
        const { error } = await supabase
          .from('hackerrank_badges')
          .update({ 
            name, 
            level, 
            stars, 
            color_class: colorClass,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);
        
        if (error) throw error;
      } else if (operation.type === 'delete') {
        const { id } = operation.badge;
        const { error } = await supabase
          .from('hackerrank_badges')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-hackerrank-badges'] });
      queryClient.invalidateQueries({ queryKey: ['hackerrank-badges'] });
    },
    onError: (error) => {
      console.error("Error managing badge:", error);
      toast.error("Failed to manage badge");
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

  const handleAddBadge = () => {
    const badgeColors = [
      "bg-green-100 text-green-800",
      "bg-blue-100 text-blue-800",
      "bg-yellow-100 text-yellow-800", 
      "bg-red-100 text-red-800",
      "bg-purple-100 text-purple-800",
      "bg-pink-100 text-pink-800"
    ];
    
    const newBadge: HackerRankBadge = {
      id: `badge-${Date.now()}`,
      name: "New Badge",
      level: 1,
      stars: 1,
      colorClass: badgeColors[Math.floor(Math.random() * badgeColors.length)]
    };
    
    setEditingBadge(newBadge);
    
    // This is a new badge, so we don't add it to the state until it's saved
    toast.info("Enter badge details and save to create");
  };

  const handleEditBadge = (badge: HackerRankBadge) => {
    setEditingBadge({...badge});
  };

  const handleUpdateBadge = async () => {
    if (!editingBadge) return;
    
    const isNewBadge = !badgesData?.some(badge => badge.id === editingBadge.id);
    
    try {
      await badgeMutation.mutateAsync({
        type: isNewBadge ? 'create' : 'update',
        badge: editingBadge
      });
      
      if (isNewBadge) {
        toast.success("Badge created successfully!");
      } else {
        toast.success("Badge updated successfully!");
      }
      
      setEditingBadge(null);
    } catch (error) {
      console.error("Error saving badge:", error);
    }
  };

  const handleCancelEditBadge = () => {
    setEditingBadge(null);
  };

  const handleDeleteBadge = async (id: string) => {
    const badge = badgesData?.find(badge => badge.id === id);
    if (!badge) return;
    
    try {
      await badgeMutation.mutateAsync({
        type: 'delete',
        badge: {
          id: badge.id,
          name: badge.name,
          level: badge.level,
          stars: badge.stars,
          colorClass: badge.color_class
        }
      });
      
      if (editingBadge?.id === id) {
        setEditingBadge(null);
      }
      
      toast.success("Badge deleted successfully!");
    } catch (error) {
      console.error("Error deleting badge:", error);
      toast.error("Failed to delete badge");
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-background rounded-lg shadow-sm border p-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">GitHub</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    value={profilesData.github.username}
                    onChange={(e) => handleUsernameChange('github', e.target.value)}
                    placeholder="github-username"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="github-display"
                    checked={profilesData.github.displayStats}
                    onChange={(e) => handleDisplayStatsChange('github', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="github-display" className="text-sm">
                    Display GitHub stats on profile
                  </label>
                </div>
              </div>
            </motion.div>

            {/* LeetCode settings */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-background rounded-lg shadow-sm border p-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">LeetCode</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    value={profilesData.leetcode.username}
                    onChange={(e) => handleUsernameChange('leetcode', e.target.value)}
                    placeholder="leetcode-username"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="leetcode-display"
                    checked={profilesData.leetcode.displayStats}
                    onChange={(e) => handleDisplayStatsChange('leetcode', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="leetcode-display" className="text-sm">
                    Display LeetCode stats on profile
                  </label>
                </div>
              </div>
            </motion.div>

            {/* HackerRank settings */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-background rounded-lg shadow-sm border p-6 space-y-4 md:col-span-2"
            >
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">HackerRank</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    value={profilesData.hackerrank.username}
                    onChange={(e) => handleUsernameChange('hackerrank', e.target.value)}
                    placeholder="hackerrank-username"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="hackerrank-display"
                    checked={profilesData.hackerrank.displayStats}
                    onChange={(e) => handleDisplayStatsChange('hackerrank', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="hackerrank-display" className="text-sm">
                    Display HackerRank stats on profile
                  </label>
                </div>
              </div>
            </motion.div>
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
          <div className="bg-background rounded-lg shadow-sm border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">HackerRank Badges</h3>
              <Button onClick={handleAddBadge}>
                <Plus className="h-4 w-4 mr-2" />
                Add Badge
              </Button>
            </div>
            
            <div className="space-y-4">
              {editingBadge && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-md bg-muted/50 mb-4"
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Badge Name</label>
                        <Input
                          value={editingBadge.name}
                          onChange={(e) => setEditingBadge({ ...editingBadge, name: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Color Class</label>
                        <select
                          className="w-full p-2 border rounded-md"
                          value={editingBadge.colorClass}
                          onChange={(e) => setEditingBadge({ ...editingBadge, colorClass: e.target.value })}
                        >
                          <option value="bg-green-100 text-green-800">Green</option>
                          <option value="bg-blue-100 text-blue-800">Blue</option>
                          <option value="bg-yellow-100 text-yellow-800">Yellow</option>
                          <option value="bg-red-100 text-red-800">Red</option>
                          <option value="bg-purple-100 text-purple-800">Purple</option>
                          <option value="bg-pink-100 text-pink-800">Pink</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Level (1-6)</label>
                        <Input
                          type="number"
                          min={1}
                          max={6}
                          value={editingBadge.level}
                          onChange={(e) => setEditingBadge({ ...editingBadge, level: parseInt(e.target.value) || 1 })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Stars (1-5)</label>
                        <Input
                          type="number"
                          min={1}
                          max={5}
                          value={editingBadge.stars}
                          onChange={(e) => setEditingBadge({ ...editingBadge, stars: parseInt(e.target.value) || 1 })}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="ghost" onClick={handleCancelEditBadge}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={handleUpdateBadge} disabled={badgeMutation.isPending}>
                        {badgeMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {badgesData && badgesData.map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 border rounded-md ${
                    editingBadge?.id === badge.id ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-lg">{badge.name}</div>
                      <div className="flex items-center gap-3 mt-1 text-sm">
                        <span className="text-muted-foreground">Level: {badge.level}</span>
                        <span className="text-muted-foreground">
                          Stars: {"★".repeat(badge.stars)}{"☆".repeat(5 - badge.stars)}
                        </span>
                        <span 
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${badge.color_class}`}
                        >
                          {badge.color_class.includes("green") ? "Green" : 
                            badge.color_class.includes("blue") ? "Blue" :
                            badge.color_class.includes("yellow") ? "Yellow" :
                            badge.color_class.includes("red") ? "Red" :
                            badge.color_class.includes("purple") ? "Purple" : 
                            badge.color_class.includes("pink") ? "Pink" : "Custom"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditBadge(badge)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteBadge(badge.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {(!badgesData || badgesData.length === 0) && !editingBadge && (
                <div className="text-center text-muted-foreground py-8">
                  No badges added yet. Click "Add Badge" to create one.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="json-editor" className="space-y-4">
          <div className="bg-background rounded-lg shadow-sm border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Code className="h-5 w-5" />
                JSON Editor
              </h3>
              <Button onClick={handleSaveJson}>
                <Save className="h-4 w-4 mr-2" />
                Apply JSON
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Edit the configuration directly in JSON format. Be careful with the syntax!
              </p>
              
              <div className="border rounded-md">
                <Textarea
                  className="font-mono text-sm h-[400px] resize-none"
                  value={jsonEditorContent}
                  onChange={(e) => handleJsonChange(e.target.value)}
                />
              </div>
              
              {jsonError && (
                <div className="text-red-500 text-sm mt-2">
                  Error: {jsonError}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
