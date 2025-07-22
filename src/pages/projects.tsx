import React from 'react';
import Layout from '@theme/Layout';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

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
      <main style={{maxWidth: 900, margin: '0 auto', padding: '2rem 1rem'}}>
        <h1>项目归档</h1>
        {years.map(year => (
          <section key={year} style={{marginBottom: 32}}>
            <h2>{year}</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
              {grouped[year].map((project, idx) => (
                <a
                  key={idx}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    padding: 20,
                    minWidth: 260,
                    flex: '1 1 260px',
                    textDecoration: 'none',
                    color: '#222',
                    transition: 'box-shadow .2s',
                  }}
                >
                  <h3 style={{marginTop: 0}}>{project.title}</h3>
                  <div style={{fontSize: 13, color: '#888', marginBottom: 4}}>{project.date}</div>
                  <p style={{margin: '8px 0'}}>{project.description}</p>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
                    {project.tags.map((tag, i) => (
                      <span key={i} style={{background: '#eee', borderRadius: 8, padding: '2px 8px', fontSize: 12}}>{tag}</span>
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