
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X, Check } from "lucide-react";
import { Hackathon } from "@/types/hackathon";
import { useForm } from "react-hook-form";
import { 
  Form,
  FormControl,
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface HackathonFormProps {
  hackathon?: Hackathon;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function HackathonForm({
  hackathon,
  onCancel,
  onSuccess
}: HackathonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [learnings, setLearnings] = useState<string[]>(
    hackathon?.learnings || [""]
  );
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      name: hackathon?.name || "",
      date: hackathon?.date || "",
      role: hackathon?.role || "",
      result: hackathon?.result || "",
      image: hackathon?.image || "",
    }
  });
  
  const addLearning = () => {
    setLearnings([...learnings, ""]);
  };
  
  const removeLearning = (index: number) => {
    const newLearnings = [...learnings];
    newLearnings.splice(index, 1);
    setLearnings(newLearnings);
  };
  
  const updateLearning = (index: number, value: string) => {
    const newLearnings = [...learnings];
    newLearnings[index] = value;
    setLearnings(newLearnings);
  };
  
  const onSubmit = async (values: {
    name: string;
    date: string;
    role: string;
    result: string;
    image?: string;
  }) => {
    try {
      setIsSubmitting(true);
      
      // Filter out empty learning points
      const filteredLearnings = learnings.filter(learning => learning.trim() !== "");
      
      if (hackathon?.id) {
        // Update existing hackathon
        const { error } = await supabase
          .from('hackathons')
          .update({
            name: values.name,
            date: values.date,
            role: values.role,
            result: values.result,
            image: values.image || null,
            learnings: filteredLearnings
          })
          .eq('id', hackathon.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Hackathon updated successfully",
        });
      } else {
        // Create new hackathon
        const { error } = await supabase
          .from('hackathons')
          .insert([{
            name: values.name,
            date: values.date,
            role: values.role,
            result: values.result,
            image: values.image || null,
            learnings: filteredLearnings
          }]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Hackathon added successfully",
        });
      }
      
      onSuccess();
    } catch (error: any) {
      console.error("Error saving hackathon:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save hackathon",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hackathon Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., TechCrunch Disrupt" 
                  {...field} 
                  required 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., June 2023" 
                  {...field} 
                  required 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Role</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Full-stack Developer" 
                  {...field} 
                  required 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="result"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Result</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., 1st Place" 
                  {...field} 
                  required 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., /images/hackathon.jpg" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <FormLabel>Key Learnings</FormLabel>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              onClick={addLearning}
            >
              Add Learning
            </Button>
          </div>
          
          <div className="space-y-2">
            {learnings.map((learning, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={learning}
                  onChange={(e) => updateLearning(index, e.target.value)}
                  placeholder={`Learning point ${index + 1}`}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLearning(index)}
                  disabled={learnings.length <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                {hackathon ? "Update Hackathon" : "Add Hackathon"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
