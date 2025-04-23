
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Edit, Plus, Trash } from "lucide-react";

type HackerRankBadge = {
  id: string;
  name: string;
  level: number;
  stars: number;
  colorClass: string;
};

export default function CodingProfilesManager() {
  const [githubUsername, setGithubUsername] = useState("janedeveloper");
  const [leetCodeUsername, setLeetCodeUsername] = useState("janedeveloper");
  const [hackerRankUsername, setHackerRankUsername] = useState("janedeveloper");
  const [hackerRankBadges, setHackerRankBadges] = useState<HackerRankBadge[]>([
    { id: "1", name: "Problem Solving", level: 6, stars: 5, colorClass: "bg-green-100 text-green-800" },
    { id: "2", name: "JavaScript", level: 5, stars: 5, colorClass: "bg-yellow-100 text-yellow-800" },
    { id: "3", name: "Python", level: 4, stars: 4, colorClass: "bg-blue-100 text-blue-800" },
    { id: "4", name: "SQL", level: 3, stars: 3, colorClass: "bg-purple-100 text-purple-800" },
  ]);

  const handleSaveProfiles = () => {
    toast.success("Coding profiles saved successfully!");
  };

  const handleEditBadge = (badge: HackerRankBadge) => {
    // In a real app, you'd open a dialog to edit the badge
    toast.info(`Editing badge: ${badge.name}`);
  };

  const handleAddBadge = () => {
    const newBadge: HackerRankBadge = {
      id: `badge-${Date.now()}`,
      name: "New Badge",
      level: 1,
      stars: 1,
      colorClass: "bg-gray-100 text-gray-800"
    };
    
    setHackerRankBadges([...hackerRankBadges, newBadge]);
    toast.success("Badge added! Edit it to customize.");
  };

  const handleDeleteBadge = (id: string) => {
    setHackerRankBadges(hackerRankBadges.filter(badge => badge.id !== id));
    toast.success("Badge deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Coding Profiles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background rounded-lg shadow-sm border p-6 space-y-6">
          <h3 className="text-xl font-bold">Platform Usernames</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub Username</label>
              <Input
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">LeetCode Username</label>
              <Input
                value={leetCodeUsername}
                onChange={(e) => setLeetCodeUsername(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">HackerRank Username</label>
              <Input
                value={hackerRankUsername}
                onChange={(e) => setHackerRankUsername(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleSaveProfiles}>Save Usernames</Button>
        </div>
        
        <div className="bg-background rounded-lg shadow-sm border p-6 space-y-6">
          <h3 className="text-xl font-bold">HackerRank Badges</h3>
          <div className="space-y-4">
            {hackerRankBadges.map((badge) => (
              <div key={badge.id} className="flex items-center justify-between gap-4 border p-3 rounded-md">
                <div className="flex-1">
                  <p className="font-medium">{badge.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Level: {badge.level}</span>
                    <span className="text-sm">Stars: {"★".repeat(badge.stars)}{"☆".repeat(5 - badge.stars)}</span>
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
            ))}
          </div>
          <Button onClick={handleAddBadge}>
            <Plus className="h-4 w-4 mr-2" />
            Add Badge
          </Button>
        </div>
      </div>
    </div>
  );
}
