
import React from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface PlatformProfileFormProps {
  title: string;
  platform: 'github' | 'leetcode' | 'hackerrank';
  icon: React.ReactNode;
  username: string;
  displayStats: boolean;
  onUsernameChange: (platform: 'github' | 'leetcode' | 'hackerrank', value: string) => void;
  onDisplayChange: (platform: 'github' | 'leetcode' | 'hackerrank', value: boolean) => void;
  animationDelay?: number;
}

export default function PlatformProfileForm({
  title,
  platform,
  icon,
  username,
  displayStats,
  onUsernameChange,
  onDisplayChange,
  animationDelay = 0
}: PlatformProfileFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: animationDelay }}
      className="bg-background rounded-lg shadow-sm border p-6 space-y-4"
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Username</label>
          <Input
            value={username}
            onChange={(e) => onUsernameChange(platform, e.target.value)}
            placeholder={`${platform.toLowerCase()}-username`}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`${platform.toLowerCase()}-display`}
            checked={displayStats}
            onChange={(e) => onDisplayChange(platform, e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor={`${platform.toLowerCase()}-display`} className="text-sm">
            Display {title} stats on profile
          </label>
        </div>
      </div>
    </motion.div>
  );
}
