
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface HackathonsTableProps {
  hackathons: any[];
  refetch: () => void;
}

export default function HackathonsTable({ hackathons, refetch }: HackathonsTableProps) {
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

  return (
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
  );
}
