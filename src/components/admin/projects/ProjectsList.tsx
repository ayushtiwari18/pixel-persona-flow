
import { Project } from "@/types";
import ProjectForm from "./ProjectForm";

interface ProjectsListProps {
  projects: Project[];
  onEdit: (index: number, field: keyof Project, value: any) => void;
  onTechnologiesChange: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  deletingId: string;
}

export default function ProjectsList({
  projects,
  onEdit,
  onTechnologiesChange,
  onDelete,
  deletingId
}: ProjectsListProps) {
  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <ProjectForm
          key={project.id}
          project={project}
          index={index}
          onEdit={onEdit}
          onTechnologiesChange={onTechnologiesChange}
          onDelete={onDelete}
          isDeleting={deletingId === project.id}
          deletingId={deletingId}
        />
      ))}
    </div>
  );
}
