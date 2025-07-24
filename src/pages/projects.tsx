import React from 'react';
import Layout from '@theme/Layout';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import styles from './projects.module.css';

function groupProjectsByYear(projects: Project[]) {
  return projects.reduce((acc, project) => {
    const year = new Date(project.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {} as Record<number, Project[]>);
}

export default function ProjectsPage() {
  const grouped = groupProjectsByYear(projects);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
  return (
    <Layout title="项目" description="我的项目归档">
      <main className={styles.projectsContainer}>
        <h1>项目归档</h1>
        {years.map(year => (
          <section key={year} className={styles.yearSection}>
            <h2 className={styles.yearHeading}>{year}</h2>
            <div className={styles.projectsGrid}>
              {grouped[year].map((project, idx) => (
                <a
                  key={idx}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectCard}
                >
                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <div className={styles.projectDate}>{project.date}</div>
                  <p style={{margin: '8px 0'}}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag, i) => (
                      <span key={i} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </main>
    </Layout>
  );
} 
