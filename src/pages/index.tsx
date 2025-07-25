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
      <span style={{fontFamily: 'Alibaba Dongfangdakai Regular, serif', fontSize: 24, display: 'inline-block', marginBottom: 2}}>
        本站已上线，欢迎访问与体验！
      </span><br/>
      <span style={{fontFamily: 'Alimama DaoLiTi, serif', fontSize: 22, display: 'inline-block', marginBottom: 2}}>
        工具库已升级&全新上线，欢迎体验！
      </span><br/>
      <div style={{fontWeight: 400, fontSize: 18, textAlign: 'left', margin: '8px auto 0', maxWidth: 600}}>
        <b style={{fontFamily: 'DingTalk JinBuTi Regular, serif', fontSize: 18}}>本次更新：</b>
        <ul style={{margin: '8px 0 0 0', paddingLeft: 20, fontFamily: 'Alimama FangYuanTiVF Thin, serif', fontSize: 16}}>
          <li>收录OPPO、vivo、荣耀、华为、小米、阿里巴巴等多品牌字体。</li>
          <li>收录清华大学、阿里云、中科大、华为云多种类镜像源。</li>
          <li>收录Windows、Windows Server、macOS、Linux多版本原版非激活系统镜像。</li>
          <li>收录JetBrains、Office办公套件、华为开发者工具和微信开发者工具。</li>
          <li>收录多用途多品类UI设计资源网站。</li>
          <li>收录Docker国内镜像源等其他实用资源。</li>
        </ul>
      </div>
    </div>
  );
}

function LatestProjects() {
  const latest = [...projects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  return (
    <section className="force-black" style={{maxWidth: 900, margin: '2rem auto', padding: '1rem'}}>
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
    <section className="force-black" style={{maxWidth: 900, margin: '2rem auto', padding: '1rem', background: '#fff', borderRadius: 12}}>
      <h2>最新内容</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
        {/* 最新教程（手动维护） */}
        <div style={{flex: 1, minWidth: 260, background: '#f8f9fa', borderRadius: 12, padding: 20}}>
          <h3>最新教程</h3>
          <div style={{fontWeight: 600}}>快速安装部署这个网站</div>
          <div style={{fontSize: 14, margin: '8px 0'}}>详细介绍如何在本地或服务器上安装、开发和部署本博客网站（基于 Docusaurus 2）。</div>
          <Link to="/docs/install_this_website" className="force-black-ignore">查看教程 &rarr;</Link>
        </div>
        {/* 最新博客（手动维护） */}
        <div style={{flex: 1, minWidth: 260, background: '#f8f9fa', borderRadius: 12, padding: 20}}>
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
        `}</style>
        <AnnouncementBar />
        <LatestProjects />
        <LatestTutorialAndBlog />
      </main>
    </Layout>
  );
}
