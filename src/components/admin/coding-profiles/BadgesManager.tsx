
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import HackerRankBadgeItem from "./HackerRankBadgeItem";
import HackerRankBadgeEditor from "./HackerRankBadgeEditor";

type HackerRankBadge = {
  id: string;
  name: string;
  level: number;
  stars: number;
  colorClass: string;
};

export default function BadgesManager() {
  const [editingBadge, setEditingBadge] = useState<HackerRankBadge | null>(null);

  // Fetch HackerRank badges from Supabase
  const { data: badgesData } = useQuery({
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
    toast.info("Enter badge details and save to create");
  };

  const handleEditBadge = (badge: HackerRankBadge) => {
    setEditingBadge(badge);
  };

  const handleCancelEdit = () => {
    setEditingBadge(null);
  };

  return (
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
          <HackerRankBadgeEditor
            badge={editingBadge}
            onCancel={handleCancelEdit}
          />
        )}

        {badgesData && badgesData.map((badge) => (
          <HackerRankBadgeItem
            key={badge.id}
            badge={badge}
            onEdit={handleEditBadge}
            currentlyEditing={editingBadge?.id === badge.id}
          />
        ))}

        {(!badgesData || badgesData.length === 0) && !editingBadge && (
          <div className="text-center text-muted-foreground py-8">
            No badges added yet. Click "Add Badge" to create one.
          </div>
        )}
      </div>
    </div>
  );
}
