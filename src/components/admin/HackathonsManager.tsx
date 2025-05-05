
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Trash, Plus, Save, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function HackathonsManager() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newHackathon, setNewHackathon] = useState({
    name: "",
    date: new Date().toISOString().split('T')[0],
    role: "",
    result: "Participant",
    learnings: [""],
    image: ""
  });

  // Fetch hackathons from Supabase
  const { data: hackathons, isLoading, isError, refetch } = useQuery({
    queryKey: ['hackathons'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hackathons')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error("Error fetching hackathons:", error);
        throw new Error(error.message);
      }
      
      return data || [];
    }
  });

  const handleAddNew = () => {
    setIsAddingNew(true);
  };

  const handleCancelAddNew = () => {
    setIsAddingNew(false);
    setNewHackathon({
      name: "",
      date: new Date().toISOString().split('T')[0],
      role: "",
      result: "Participant",
      learnings: [""],
      image: ""
    });
  };

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
      refetch(); // Refresh the list
      handleCancelAddNew();
    } catch (error: any) {
      console.error("Error adding hackathon:", error);
      toast.error(`Failed to add hackathon: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hackathon?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('hackathons')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast.success("Hackathon deleted successfully!");
      refetch(); // Refresh the list
    } catch (error: any) {
      console.error("Error deleting hackathon:", error);
      toast.error(`Failed to delete hackathon: ${error.message}`);
    }
  };

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Failed to load hackathons. Please try again later.</p>
        <Button onClick={() => refetch()} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Hackathons</h2>
        {!isAddingNew && (
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Hackathon
          </Button>
        )}
      </div>

      {isAddingNew && (
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
            <Button variant="outline" onClick={handleCancelAddNew}>
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
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading hackathons...</p>
        </div>
      ) : hackathons && hackathons.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Result</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hackathons.map((hackathon: any) => (
              <TableRow key={hackathon.id}>
                <TableCell className="font-medium">{hackathon.name}</TableCell>
                <TableCell>{new Date(hackathon.date).toLocaleDateString()}</TableCell>
                <TableCell>{hackathon.role}</TableCell>
                <TableCell>
                  <span className={
                    hackathon.result === "Winner" 
                      ? "text-green-600 font-medium" 
                      : hackathon.result === "Finalist" 
                        ? "text-blue-600 font-medium" 
                        : ""
                  }>{hackathon.result}</span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(hackathon.id)}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">No hackathons found. Add your first one!</p>
        </div>
      )}
    </div>
  );
}
