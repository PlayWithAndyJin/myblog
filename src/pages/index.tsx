import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { projects } from '../data/projects';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

function LatestProjects() {
  const latest = [...projects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  return (
    <section style={{maxWidth: 900, margin: '2rem auto', padding: '1rem'}}>
      <h2>最新项目</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
        {latest.map((project, idx) => (
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
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="首页"
      description="这是我的现代化中文博客，基于 Docusaurus 搭建。"
    >
      <HomepageHeader />
      <main>
        <LatestProjects />
      </main>
    </Layout>
  );
}
