import React from "react";
import type { CollectionEntry } from "astro:content";
import ProjectCard from "./project-card";

interface ProjectGridProps {
  projects: CollectionEntry<"projects">[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <div>No projects found</div>;
  }

  const sortedProjects = [...projects].sort((a, b) => {
    return b.data.date.getTime() - a.data.date.getTime();
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
      {sortedProjects.map((project) => {
        return <ProjectCard key={project.id} project={project} />;
      })}
    </div>
  );
};

export default ProjectGrid;
