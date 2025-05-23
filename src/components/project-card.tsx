import React from "react";
import type { CollectionEntry } from "astro:content";
import { Card, CardHeader } from "@/components/ui/card";

interface ProjectCardProps {
  project: CollectionEntry<"projects">;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <a href={`/works/${project.slug}`} className="group">
      <Card className="border-none shadow-none bg-transparent">
        {project.data.hero && (
          <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden group-hover:-translate-y-2 transition-transform duration-300">
            <img
              src={project.data.hero}
              alt={project.data.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader className="p-0">
          <h2 className="text-2xl tracking-tight">{project.data.title}</h2>
          <div className="flex flex-wrap gap-1 text-sm text-muted-foreground">
            {project.data.categories.map((category, index) => (
              <React.Fragment key={category}>
                <a
                  href={`/works/${category.toLowerCase()}`}
                  className="hover:text-foreground transition-colors -me-1 font-['doto']"
                >
                  {category}
                </a>
                {index < project.data.categories.length - 1 && (
                  <span className="text-muted-foreground">, </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </CardHeader>
      </Card>
    </a>
  );
};

export default ProjectCard;
