
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type HackerRankBadge = {
  id: string;
  name: string;
  level: number;
  stars: number;
  colorClass: string;
};

interface HackerRankBadgeItemProps {
  badge: any; // Accept both DB format and component format
  onEdit: (badge: HackerRankBadge) => void;
  currentlyEditing: boolean;
}

export default function HackerRankBadgeItem({ badge, onEdit, currentlyEditing }: HackerRankBadgeItemProps) {
  const queryClient = useQueryClient();
  
  // Map DB field names to our component expected property names if needed
  const badgeForDisplay: HackerRankBadge = {
    id: badge.id,
    name: badge.name,
    level: badge.level,
    stars: badge.stars,
    colorClass: badge.color_class || badge.colorClass // Support both formats
  };

  // Badge delete mutation
  const deleteBadgeMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('hackerrank_badges')
        .delete()
        .eq('id', badgeForDisplay.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-hackerrank-badges'] });
      queryClient.invalidateQueries({ queryKey: ['hackerrank-badges'] });
      toast.success("Badge deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting badge:", error);
      toast.error("Failed to delete badge");
    }
  });

  const handleDelete = async () => {
    await deleteBadgeMutation.mutateAsync();
  };

  const handleEdit = () => {
    onEdit(badgeForDisplay);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 border rounded-md ${
        currentlyEditing ? "bg-muted/50" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-lg">{badgeForDisplay.name}</div>
          <div className="flex items-center gap-3 mt-1 text-sm">
            <span className="text-muted-foreground">Level: {badgeForDisplay.level}</span>
            <span className="text-muted-foreground">
              Stars: {"★".repeat(badgeForDisplay.stars)}{"☆".repeat(5 - badgeForDisplay.stars)}
            </span>
            <span 
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${badgeForDisplay.colorClass}`}
            >
              {badgeForDisplay.colorClass.includes("green") ? "Green" : 
                badgeForDisplay.colorClass.includes("blue") ? "Blue" :
                badgeForDisplay.colorClass.includes("yellow") ? "Yellow" :
                badgeForDisplay.colorClass.includes("red") ? "Red" :
                badgeForDisplay.colorClass.includes("purple") ? "Purple" : 
                badgeForDisplay.colorClass.includes("pink") ? "Pink" : "Custom"}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleDelete}
            disabled={deleteBadgeMutation.isPending}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
