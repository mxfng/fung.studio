import React from "react";
import type { CollectionEntry } from "astro:content";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectGridProps {
  projects: CollectionEntry<"projects">[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <div>No projects found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {projects.map((project) => {
        return (
          <a key={project.id} href={`/works/${project.slug}`} className="group">
            <Card className="border-none shadow-none bg-transparent">
              <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden group-hover:-translate-y-2 transition-transform duration-300">
                {project.data.hero && (
                  <img
                    src={project.data.hero}
                    alt={project.data.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>

              <CardHeader className="p-0">
                <h2 className="text-2xl tracking-tight">
                  {project.data.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.data.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </a>
        );
      })}
    </div>
  );
};

export default ProjectGrid;
