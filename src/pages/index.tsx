import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { projects } from '../data/projects';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

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

function LatestTutorialAndBlog() {
  // 最新博客自动抓取
  let latestBlog = null;
  try {
    const blogPost = useBlogPost?.();
    latestBlog = blogPost?.metadata;
  } catch (e) {}
  return (
    <section style={{maxWidth: 900, margin: '2rem auto', padding: '1rem', background: '#fff', borderRadius: 12}}>
      <h2>最新内容</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
        {/* 最新教程（手动维护） */}
        <div style={{flex: 1, minWidth: 260, background: '#f8f9fa', borderRadius: 12, padding: 20}}>
          <h3>最新教程</h3>
          <div style={{fontWeight: 600}}>macOS 安装 Python</div>
          <div style={{fontSize: 14, color: '#666', margin: '8px 0'}}>详细介绍如何在 macOS 上通过 Homebrew 或官网下载方式安装 Python，并区分 Intel/Apple Silicon 芯片，包含 pip 使用说明。</div>
          <Link to="/docs/install_python/macos-install">查看教程 &rarr;</Link>
        </div>
        {/* 最新博客（自动） */}
        {latestBlog && (
          <div style={{flex: 1, minWidth: 260, background: '#f8f9fa', borderRadius: 12, padding: 20}}>
            <h3>最新博客</h3>
            <div style={{fontWeight: 600}}>{latestBlog.title}</div>
            <div style={{fontSize: 14, color: '#666', margin: '8px 0'}}>{latestBlog.description || ''}</div>
            <Link to={latestBlog.permalink}>阅读全文 &rarr;</Link>
          </div>
        )}
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
      <main style={{background: '#fff'}}>
        <LatestProjects />
        <LatestTutorialAndBlog />
      </main>
    </Layout>
  );
}
