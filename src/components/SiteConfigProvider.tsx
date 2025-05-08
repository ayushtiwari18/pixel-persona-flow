
import React, { createContext, useContext } from 'react';
import { useSiteConfig } from '@/data/site-config';
import { SiteConfig } from '@/types';
import { Loader2 } from 'lucide-react';

interface SiteConfigContextType {
  config: SiteConfig;
  isLoading: boolean;
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: {} as SiteConfig,
  isLoading: true
});

export const useSiteConfigContext = () => useContext(SiteConfigContext);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const { config, isLoading } = useSiteConfig();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading site configuration...</p>
      </div>
    );
  }

  return (
    <SiteConfigContext.Provider value={{ config, isLoading }}>
      {children}
    </SiteConfigContext.Provider>
  );
}
