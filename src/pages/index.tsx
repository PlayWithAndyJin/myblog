import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { projects } from '../data/projects';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import { useEffect } from 'react';

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

function AnnouncementBar() {
  return (
    <div style={{
      background: '#fffbe6',
      color: '#ad6800',
      textAlign: 'center',
      padding: '12px 0',
      borderRadius: 10,
      margin: '24px auto 0',
      maxWidth: 900,
      fontWeight: 600,
      fontSize: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      🎉 本站已上线，欢迎访问与交流!<br/>
      工具库已升级全新上线，欢迎体验与交流！
    </div>
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
  return (
    <section style={{maxWidth: 900, margin: '2rem auto', padding: '1rem', background: '#fff', borderRadius: 12}}>
      <h2>最新内容</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
        {/* 最新教程（手动维护） */}
        <div style={{flex: 1, minWidth: 260, background: '#f8f9fa', borderRadius: 12, padding: 20}}>
          <h3>最新教程</h3>
          <div style={{fontWeight: 600}}>快速部署这个网站</div>
          <div style={{fontSize: 14, color: '#666', margin: '8px 0'}}>详细介绍如何在本地或服务器上安装、开发和部署本博客网站（基于 Docusaurus 2）。</div>
          <Link to="/docs/install_this_website">查看教程 &rarr;</Link>
        </div>
        {/* 最新博客（手动维护） */}
        <div style={{flex: 1, minWidth: 260, background: '#f8f9fa', borderRadius: 12, padding: 20}}>
          <h3>最新博客</h3>
          <div style={{fontWeight: 600}}>快速搭建一个基于Flask的API教务系统</div>
          <div style={{fontSize: 14, color: '#666', margin: '8px 0'}}>EasyEAMS 是一个基于 Flask + Jinja2 的现代化教务系统 Web 应用，支持学生自助查询成绩、课表、学业等。</div>
          <Link to="/blog/搭建一个快捷教务系统">阅读全文 &rarr;</Link>
        </div>
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
        <AnnouncementBar />
        <LatestProjects />
        <LatestTutorialAndBlog />
      </main>
    </Layout>
  );
}
