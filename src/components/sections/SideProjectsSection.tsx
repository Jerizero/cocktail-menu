"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { sideProjects } from "@/data/side-projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const SideProjectsSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionWrapper id="side-projects">
      <SectionHeading title="Side Projects" subtitle="Beyond the menu" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sideProjects.map((project, i) => {
          return (
            <motion.div
              key={project.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-cream-dark border border-border rounded-2xl p-6 md:p-8 flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-serif text-xl text-text-primary">
                    {project.name}
                  </h3>
                  <p className="text-text-muted text-sm mt-0.5">
                    {project.subtitle}
                  </p>
                </div>
                <span className="flex-shrink-0">
                  <StatusBadge status={project.status} />
                </span>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-5 flex-grow">
                {project.description}
              </p>

              {project.specs && project.specs.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-2">
                    Specs
                  </p>
                  <ul className="space-y-1.5">
                    {project.specs.map((spec, j) => (
                      <li
                        key={j}
                        className="text-text-secondary text-xs leading-relaxed pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[0.45em] before:w-1 before:h-1 before:rounded-full before:bg-amber/50"
                      >
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
