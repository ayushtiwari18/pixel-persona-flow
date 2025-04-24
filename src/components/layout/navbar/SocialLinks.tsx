
import { Github, Linkedin, Twitter } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export function SocialLinks() {
  return (
    <div className="hidden md:flex items-center gap-3">
      {siteConfig.links.github && (
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Github className="h-5 w-5" />
        </a>
      )}
      {siteConfig.links.linkedin && (
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      )}
      {siteConfig.links.twitter && (
        <a
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noreferrer"
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Twitter className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}
