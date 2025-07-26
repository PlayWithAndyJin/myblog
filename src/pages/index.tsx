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
      <style>{`
        @media (max-width: 768px) {
          .hero {
            padding-bottom: 2rem !important;
          }
          .hero__title {
            font-size: 2rem !important;
            margin-bottom: 1rem !important;
          }
          .hero__subtitle {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </header>
  );
}

function AnnouncementBar() {
  return (
    <div className="announcement-bar" style={{
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
      <style>{`
        @media (max-width: 768px) {
          .announcement-bar {
            margin: 16px 12px 0 !important;
            padding: 16px 12px !important;
            border-radius: 8px !important;
          }
          .announcement-bar .title {
            font-size: 20px !important;
            margin-bottom: 4px !important;
          }
          .announcement-bar .subtitle {
            font-size: 18px !important;
            margin-bottom: 4px !important;
          }
          .announcement-bar .content {
            font-size: 14px !important;
            margin: 8px 0 0 0 !important;
          }
          .announcement-bar ul {
            padding-left: 16px !important;
          }
          .announcement-bar li {
            font-size: 14px !important;
            margin-bottom: 4px !important;
          }
        }
      `}</style>
      <style>{`
        @font-face {
          font-family: 'Alibaba Dongfangdakai Regular';
          src: url('/fonts/Alibaba/AlimamaDongFangDaKai-Regular.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Alimama DaoLiTi';
          src: url('/fonts/Alibaba/AlimamaDaoLiTi.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'DingTalk JinBuTi Regular';
          src: url('/fonts/Alibaba/DingTalkJinBuTi-Regular.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Alimama FangYuanTiVF Thin';
          src: url('/fonts/Alibaba/AlimamaFangYuanTiVF-Thin.ttf') format('truetype');
          font-display: swap;
        }
      `}</style>
      <span className="title" style={{fontFamily: 'Alibaba Dongfangdakai Regular, serif', fontSize: 24, display: 'inline-block', marginBottom: 2}}>
        本站已上线，欢迎访问与体验！
      </span><br/>
      <span className="subtitle" style={{fontFamily: 'Alimama DaoLiTi, serif', fontSize: 22, display: 'inline-block', marginBottom: 2}}>
        工具库已升级&全新上线，欢迎体验！
      </span><br/>
      <div className="content" style={{fontWeight: 400, fontSize: 18, textAlign: 'left', margin: '8px auto 0', maxWidth: 600}}>
        <b style={{fontFamily: 'DingTalk JinBuTi Regular, serif', fontSize: 18}}>本次更新：</b>
        <ul style={{margin: '8px 0 0 0', paddingLeft: 20, fontFamily: 'Alimama FangYuanTiVF Thin, serif', fontSize: 16}}>
          <li>字体资源新增荣耀、vivo、思源黑体、思源宋体和小米的字体，并支持自定义样例渲染。</li>
          <li>工具库所有页面全面美化，所有资源展示由列表/表格升级为卡片化、模块化风格。</li>
          <li>操作系统新增收录Windows Server。</li>
        </ul>
        <p style={{fontSize: 16, margin: '8px 0 0 0', fontFamily: 'Alimama FangYuanTiVF Thin, serif'}}>更多更新内容请查看→<a href="/site_update" style={{color: '#3578e5', textDecoration: 'none'}}>更新日志</a></p>
      </div>
    </div>
  );
}

function LatestProjects() {
  const latest = [...projects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  return (
    <section className="force-black latest-projects" style={{maxWidth: 900, margin: '2rem auto', padding: '1rem'}}>
      <style>{`
        @media (max-width: 768px) {
          .latest-projects {
            margin: 1rem 12px !important;
            padding: 1rem 0 !important;
          }
          .latest-projects h2 {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          .latest-projects .project-grid {
            gap: 16px !important;
          }
          .latest-projects .project-card {
            min-width: 100% !important;
            padding: 16px !important;
          }
        }
      `}</style>
      <h2>最新项目</h2>
      <div className="project-grid" style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
        {latest.map((project, idx) => (
          <a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
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
    <section className="force-black latest-content" style={{maxWidth: 900, margin: '2rem auto', padding: '1rem', background: '#fff', borderRadius: 12}}>
      <style>{`
        @media (max-width: 768px) {
          .latest-content {
            margin: 1rem 12px !important;
            padding: 1rem !important;
            border-radius: 8px !important;
          }
          .latest-content h2 {
            font-size: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          .latest-content .content-grid {
            gap: 16px !important;
          }
          .latest-content .content-card {
            min-width: 100% !important;
            padding: 16px !important;
          }
        }
      `}</style>
      <h2>最新内容</h2>
      <div className="content-grid" style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
        {/* 最新教程（手动维护） */}
        <div className="content-card" style={{flex: 1, minWidth: 260, background: '#f8f9fa', borderRadius: 12, padding: 20}}>
          <h3>最新教程</h3>
          <div style={{fontWeight: 600}}>快速安装部署这个网站</div>
          <div style={{fontSize: 14, margin: '8px 0'}}>详细介绍如何在本地或服务器上安装、开发和部署本博客网站（基于 Docusaurus 2）。</div>
          <Link to="/docs/install_this_website" className="force-black-ignore">查看教程 &rarr;</Link>
        </div>
        {/* 最新博客（手动维护） */}
        <div className="content-card" style={{flex: 1, minWidth: 260, background: '#f8f9fa', borderRadius: 12, padding: 20}}>
          <h3>最新博客</h3>
          <div style={{fontWeight: 600}}>快速搭建一个基于Flask的API教务系统</div>
          <div style={{fontSize: 14, margin: '8px 0'}}>EasyEAMS 是一个基于 Flask + Jinja2 的现代化教务系统 Web 应用，支持学生自助查询成绩、课表、学业等。</div>
          <Link to="/blog/搭建一个快捷教务系统" className="force-black-ignore">阅读全文 &rarr;</Link>
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
        <style>{`
          @font-face {
            font-family: 'Alibaba Dongfangdakai Regular';
            src: url('/fonts/Alibaba/AlimamaDongFangDaKai-Regular.ttf') format('truetype');
            font-display: swap;
          }
          
          @media (max-width: 768px) {
            main {
              padding-top: 0 !important;
            }
          }
        `}</style>
        <AnnouncementBar />
        <LatestProjects />
        <LatestTutorialAndBlog />
      </main>
    </Layout>
  );
}
