
import { useProjects } from "@/hooks/useProjects";
import ProjectsHeader from "./projects/ProjectsHeader";
import ProjectsList from "./projects/ProjectsList";
import EmptyProjects from "./projects/EmptyProjects";
import ProjectsLoading from "./projects/ProjectsLoading";
import ProjectsError from "./projects/ProjectsError";

export default function ProjectsManager() {
  const {
    projects,
    isLoading,
    isError,
    isSubmitting,
    deletingId,
    handleAddProject,
    handleEditProject,
    handleTechnologiesChange,
    handleDeleteProject,
    handleSaveProjects,
    refetch
  } = useProjects();

  if (isLoading) {
    return <ProjectsLoading />;
  }

  if (isError) {
    return <ProjectsError onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      <ProjectsHeader 
        onAddProject={handleAddProject}
        onSaveProjects={handleSaveProjects}
        isSubmitting={isSubmitting}
      />

      {projects.length === 0 ? (
        <EmptyProjects onAddProject={handleAddProject} />
      ) : (
        <ProjectsList
          projects={projects}
          onEdit={handleEditProject}
          onTechnologiesChange={handleTechnologiesChange}
          onDelete={handleDeleteProject}
          deletingId={deletingId}
        />
      )}
    </div>
  );
}
