
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import HackathonsTable from "./hackathons/HackathonsTable";
import HackathonForm from "./hackathons/HackathonForm";
import HackathonsLoader from "./hackathons/HackathonsLoader";
import EmptyHackathons from "./hackathons/EmptyHackathons";
import ErrorState from "./hackathons/ErrorState";

export default function HackathonsManager() {
  const [isAddingNew, setIsAddingNew] = useState(false);

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
  };

  const handleSuccess = () => {
    refetch();
    setIsAddingNew(false);
  };

  if (isError) {
    return <ErrorState refetch={refetch} />;
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
        <HackathonForm 
          onCancel={handleCancelAddNew} 
          onSuccess={handleSuccess} 
        />
      )}

      {isLoading ? (
        <HackathonsLoader />
      ) : hackathons && hackathons.length > 0 ? (
        <HackathonsTable hackathons={hackathons} refetch={refetch} />
      ) : (
        <EmptyHackathons />
      )}
    </div>
  );
}
