
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Code, Save } from "lucide-react";

interface JsonEditorProps {
  jsonContent: string;
  onJsonChange: (value: string) => void;
  onSave: () => void;
  jsonError: string | null;
}

export default function JsonEditor({ 
  jsonContent, 
  onJsonChange, 
  onSave, 
  jsonError 
}: JsonEditorProps) {
  return (
    <div className="bg-background rounded-lg shadow-sm border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Code className="h-5 w-5" />
          JSON Editor
        </h3>
        <Button onClick={onSave}>
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
            value={jsonContent}
            onChange={(e) => onJsonChange(e.target.value)}
          />
        </div>
        
        {jsonError && (
          <div className="text-red-500 text-sm mt-2">
            Error: {jsonError}
          </div>
        )}
      </div>
    </div>
  );
}
