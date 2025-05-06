
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Save, Trash } from "lucide-react";

interface HackathonFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function HackathonForm({ onCancel, onSuccess }: HackathonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newHackathon, setNewHackathon] = useState({
    name: "",
    date: new Date().toISOString().split('T')[0],
    role: "",
    result: "Participant",
    learnings: [""],
    image: ""
  });

  const handleAddLearning = () => {
    setNewHackathon(prev => ({
      ...prev,
      learnings: [...prev.learnings, ""]
    }));
  };

  const handleLearningChange = (index: number, value: string) => {
    const updatedLearnings = [...newHackathon.learnings];
    updatedLearnings[index] = value;
    setNewHackathon(prev => ({
      ...prev,
      learnings: updatedLearnings
    }));
  };

  const handleRemoveLearning = (index: number) => {
    const updatedLearnings = newHackathon.learnings.filter((_, i) => i !== index);
    setNewHackathon(prev => ({
      ...prev,
      learnings: updatedLearnings
    }));
  };

  const handleSubmit = async () => {
    // Validate form
    if (!newHackathon.name || !newHackathon.date || !newHackathon.role || !newHackathon.result) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Filter out empty learnings
    const filteredLearnings = newHackathon.learnings.filter(learning => learning.trim() !== "");
    
    if (filteredLearnings.length === 0) {
      toast.error("Please add at least one learning");
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert new hackathon
      const { data, error } = await supabase
        .from('hackathons')
        .insert({
          ...newHackathon,
          learnings: filteredLearnings
        })
        .select();

      if (error) {
        throw error;
      }

      toast.success("Hackathon added successfully!");
      onSuccess(); // Refresh the list and reset form
    } catch (error: any) {
      console.error("Error adding hackathon:", error);
      toast.error(`Failed to add hackathon: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-background shadow-sm space-y-4">
      <h3 className="text-xl font-bold">Add New Hackathon</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Hackathon Name *</label>
          <Input
            value={newHackathon.name}
            onChange={(e) => setNewHackathon(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter hackathon name"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Date *</label>
          <Input
            type="date"
            value={newHackathon.date}
            onChange={(e) => setNewHackathon(prev => ({ ...prev, date: e.target.value }))}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Role *</label>
          <Input
            value={newHackathon.role}
            onChange={(e) => setNewHackathon(prev => ({ ...prev, role: e.target.value }))}
            placeholder="e.g. Full Stack Developer, Team Lead"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Result *</label>
          <Select 
            value={newHackathon.result} 
            onValueChange={(value) => setNewHackathon(prev => ({ ...prev, result: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Winner">Winner</SelectItem>
              <SelectItem value="Finalist">Finalist</SelectItem>
              <SelectItem value="Participant">Participant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Image URL (optional)</label>
        <Input
          value={newHackathon.image || ""}
          onChange={(e) => setNewHackathon(prev => ({ ...prev, image: e.target.value }))}
          placeholder="/path/to/image.jpg"
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Learnings *</label>
          <Button variant="outline" size="sm" onClick={handleAddLearning}>
            <Plus className="h-3 w-3 mr-1" />
            Add Learning
          </Button>
        </div>
        
        {newHackathon.learnings.map((learning, index) => (
          <div key={index} className="flex items-start gap-2">
            <Textarea
              value={learning}
              onChange={(e) => handleLearningChange(index, e.target.value)}
              placeholder={`Learning ${index + 1}`}
              className="flex-1"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleRemoveLearning(index)}
              disabled={newHackathon.learnings.length <= 1}
            >
              <Trash className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Hackathon
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
