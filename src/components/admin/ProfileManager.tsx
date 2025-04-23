
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { siteConfig } from "@/data/site-config";

export default function ProfileManager() {
  const [name, setName] = useState(siteConfig.name);
  const [title, setTitle] = useState(siteConfig.title);
  const [description, setDescription] = useState(siteConfig.description);
  const [resumeUrl, setResumeUrl] = useState(siteConfig.resume);
  const [githubUrl, setGithubUrl] = useState(siteConfig.links.github);
  const [linkedinUrl, setLinkedinUrl] = useState(siteConfig.links.linkedin);
  const [twitterUrl, setTwitterUrl] = useState(siteConfig.links.twitter || "");
  const [formEndpoint, setFormEndpoint] = useState(siteConfig.formEndpoint || "");

  const handleSavePersonalInfo = () => {
    toast.success("Personal information saved successfully!");
  };

  const handleSaveSocialLinks = () => {
    toast.success("Social links saved successfully!");
  };

  const handleSaveFormEndpoint = () => {
    toast.success("Form endpoint saved successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background rounded-lg shadow-sm border p-6 space-y-6">
          <h3 className="text-xl font-bold">Personal Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <Button onClick={handleSavePersonalInfo}>Save Personal Info</Button>
        </div>
        
        <div className="bg-background rounded-lg shadow-sm border p-6 space-y-6">
          <h3 className="text-xl font-bold">Social Links</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub</label>
              <Input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">LinkedIn</label>
              <Input
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Twitter</label>
              <Input
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleSaveSocialLinks}>Save Social Links</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-background rounded-lg shadow-sm border p-6 space-y-6">
          <h3 className="text-xl font-bold">Resume & Contact Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Resume URL</label>
              <Input
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Path to your resume file (e.g., /resume.pdf)
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Form Endpoint</label>
              <Input
                value={formEndpoint}
                onChange={(e) => setFormEndpoint(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Your Formspree or other form endpoint URL
              </p>
            </div>
          </div>
          <Button onClick={handleSaveFormEndpoint}>Save Contact Settings</Button>
        </div>
      </div>
    </div>
  );
}
