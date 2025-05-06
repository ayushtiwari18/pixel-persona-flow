
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, X, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type HackerRankBadge = {
  id: string;
  name: string;
  level: number;
  stars: number;
  colorClass: string;
};

interface HackerRankBadgeEditorProps {
  badge: HackerRankBadge | null;
  onCancel: () => void;
}

export default function HackerRankBadgeEditor({ badge, onCancel }: HackerRankBadgeEditorProps) {
  const [editingBadge, setEditingBadge] = useState<HackerRankBadge | null>(badge);
  const queryClient = useQueryClient();

  // Badge mutation
  const badgeMutation = useMutation({
    mutationFn: async (operation: { 
      type: 'create' | 'update'; 
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
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-hackerrank-badges'] });
      queryClient.invalidateQueries({ queryKey: ['hackerrank-badges'] });
      toast.success(badge?.id ? "Badge updated successfully!" : "Badge created successfully!");
      onCancel();
    },
    onError: (error) => {
      console.error("Error managing badge:", error);
      toast.error("Failed to manage badge");
    }
  });

  const handleSave = async () => {
    if (!editingBadge) return;
    
    const isNewBadge = !editingBadge?.id?.startsWith('badge-') || false;
    
    await badgeMutation.mutateAsync({
      type: isNewBadge ? 'create' : 'update',
      badge: editingBadge
    });
  };

  if (!editingBadge) return null;

  return (
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
          <Button variant="ghost" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={badgeMutation.isPending}>
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
  );
}
