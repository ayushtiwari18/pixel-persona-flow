
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Edit, Plus, Trash, Code, Check, X, Github, PieChart, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

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
  
  // Main state for the profiles data
  const [profilesData, setProfilesData] = useState<CodingProfileData>({
    github: {
      username: "ayushtiwari18",
      displayStats: true
    },
    leetcode: {
      username: "_aayush03",
      displayStats: true
    },
    hackerrank: {
      username: "ayushtiwari10201",
      displayStats: true,
      badges: [
        { id: "1", name: "Problem Solving", level: 6, stars: 5, colorClass: "bg-green-100 text-green-800" },
        { id: "2", name: "JavaScript", level: 5, stars: 5, colorClass: "bg-yellow-100 text-yellow-800" },
        { id: "3", name: "Python", level: 4, stars: 4, colorClass: "bg-blue-100 text-blue-800" },
        { id: "4", name: "SQL", level: 3, stars: 3, colorClass: "bg-purple-100 text-purple-800" },
      ]
    }
  });

  // State for the JSON editor
  const [jsonEditorContent, setJsonEditorContent] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  
  // State for currently editing badge
  const [editingBadge, setEditingBadge] = useState<HackerRankBadge | null>(null);

  // Initialize JSON content
  useEffect(() => {
    setJsonEditorContent(JSON.stringify(profilesData, null, 2));
  }, []);

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

  const handleSaveProfiles = () => {
    // In a real app, you would save this to the database
    // For demo, we'll just show a success message
    toast.success("Coding profiles saved successfully!");
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
    
    setProfilesData(prev => ({
      ...prev,
      hackerrank: {
        ...prev.hackerrank,
        badges: [...prev.hackerrank.badges, newBadge]
      }
    }));
    
    setEditingBadge(newBadge);
    toast.success("Badge added! Edit it to customize.");
  };

  const handleEditBadge = (badge: HackerRankBadge) => {
    setEditingBadge(badge);
  };

  const handleUpdateBadge = () => {
    if (!editingBadge) return;
    
    setProfilesData(prev => ({
      ...prev,
      hackerrank: {
        ...prev.hackerrank,
        badges: prev.hackerrank.badges.map(badge => 
          badge.id === editingBadge.id ? editingBadge : badge
        )
      }
    }));
    
    setEditingBadge(null);
    toast.success("Badge updated successfully!");
  };

  const handleCancelEditBadge = () => {
    setEditingBadge(null);
  };

  const handleDeleteBadge = (id: string) => {
    setProfilesData(prev => ({
      ...prev,
      hackerrank: {
        ...prev.hackerrank,
        badges: prev.hackerrank.badges.filter(badge => badge.id !== id)
      }
    }));
    
    if (editingBadge?.id === id) {
      setEditingBadge(null);
    }
    
    toast.success("Badge deleted successfully!");
  };

  const handleJsonChange = (value: string) => {
    setJsonEditorContent(value);
    setJsonError(null);
  };

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonEditorContent);
      
      // Basic validation
      if (!parsed.github || !parsed.leetcode || !parsed.hackerrank) {
        throw new Error("JSON must include github, leetcode, and hackerrank objects");
      }
      
      setProfilesData(parsed);
      toast.success("JSON saved and applied successfully!");
      setJsonError(null);
    } catch (error) {
      setJsonError((error as Error).message);
      toast.error("Invalid JSON: " + (error as Error).message);
    }
  };

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
            <Button onClick={handleSaveProfiles}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
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
              {profilesData.hackerrank.badges.map((badge) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 border rounded-md ${
                    editingBadge?.id === badge.id ? "bg-muted/50" : ""
                  }`}
                >
                  {editingBadge?.id === badge.id ? (
                    // Editing mode
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
                        <Button onClick={handleUpdateBadge}>
                          <Check className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-lg">{badge.name}</div>
                        <div className="flex items-center gap-3 mt-1 text-sm">
                          <span className="text-muted-foreground">Level: {badge.level}</span>
                          <span className="text-muted-foreground">
                            Stars: {"★".repeat(badge.stars)}{"☆".repeat(5 - badge.stars)}
                          </span>
                          <span 
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${badge.colorClass}`}
                          >
                            {badge.colorClass.includes("green") ? "Green" : 
                              badge.colorClass.includes("blue") ? "Blue" :
                              badge.colorClass.includes("yellow") ? "Yellow" :
                              badge.colorClass.includes("red") ? "Red" :
                              badge.colorClass.includes("purple") ? "Purple" : 
                              badge.colorClass.includes("pink") ? "Pink" : "Custom"}
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
                  )}
                </motion.div>
              ))}

              {profilesData.hackerrank.badges.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No badges added yet. Click "Add Badge" to create one.
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button onClick={handleSaveProfiles}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
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
