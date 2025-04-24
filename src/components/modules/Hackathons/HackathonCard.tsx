
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import type { Hackathon } from "@/data/hackathons";

interface HackathonCardProps {
  hackathon: Hackathon;
  variant?: "preview" | "full";
}

export function HackathonCard({ hackathon, variant = "full" }: HackathonCardProps) {
  const { name, date, role, result, learnings, image } = hackathon;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const getResultColor = (result: string) => {
    switch (result) {
      case "Winner":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Finalist":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden">
        {image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">{role}</Badge>
              <Badge className={cn("border", getResultColor(result))}>
                {result}
              </Badge>
            </div>
            {variant === "full" && learnings && learnings.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-medium mb-2">Key Learnings</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {learnings.map((learning, index) => (
                    <li key={index}>{learning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

