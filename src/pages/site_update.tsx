import React from 'react';
import Layout from '@theme/Layout';
import styles from './projects.module.css';
import { useColorMode } from '@docusaurus/theme-common';

// 支持多行内容
const updates = [
  {
    date: '2025-07-25',
    content: [
      '字体资源新增荣耀、vivo、思源黑体、思源宋体和小米的字体，并支持自定义样例渲染。',
      '软件资源新增华为开发者工具的完整套件和微信开发者工具。',
      '工具库所有页面全面美化，所有资源展示由列表/表格升级为卡片化、模块化风格。',
      '操作系统新增收录Windows Server 2003-2025。',
      '下载Office办公套件和Windows Server时，新增系统适配提醒弹窗，优化弹窗交互体验。',
      '美化了网站部分文字的字体。'
    ]
  },
  {
    date: '2025-07-24',
    content: [
      '软件资源新增华为开发者工具部分内容和微信开发者工具。',
      '字体资源和UI设计资源上线，字体初步收录OPPO、阿里巴巴、华为品牌字体，UI资源收录众多设计资源网站。',
      '工具库移动端适配优化，表格展示问题修复，体验更佳。'
    ]
  },
  {
    date: '2025-07-23',
    content: [
      '适配移动端，工具库新增侧边按钮，移动端可隐藏/显示边栏。',
      '工具库新增软件资源，收录JetBrains全家桶和Office办公套件。',
      '工具库新增字体资源和UI设计资源入口。',
      '主页支持展示最新项目。'
    ]
  },
  {
    date: '2025-07-22',
    content: [
      '本站正式建站，首发博客和教程页面。',
      '创建项目页面。',
      '工具库初步上线，包含镜像源、操作系统、教程资源和其他资源。',
      '镜像源收录清华源、阿里云、中科大和华为云。',
      '操作系统收录Windows XP-11、macOS 10.7-26 Beta4和Linux。',
      '教程资源收录菜鸟教程、Python官方文档、PyTorch官方文档、TensorFlow官方文档。',
      '其他资源收录Docker国内源。',
      '所有资源以列表和表格形式展示。'
    ]
  },
];

type Update = { date: string; content: string[] };

function groupUpdatesByYear(updates: Update[]) {
  return updates.reduce((acc, update) => {
    const year = new Date(update.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(update);
    return acc;
  }, {} as Record<number, Update[]>);
}

export default function SiteUpdate() {
  const [colorMode, setColorMode] = React.useState<'light' | 'dark'>('light');
  React.useEffect(() => {
    // 只在客户端调用 useColorMode
    if (typeof window !== 'undefined') {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        setColorMode(useColorMode().colorMode);
      } catch {}
    }
  }, []);

  const grouped = groupUpdatesByYear(updates);
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
  const contentColor = colorMode === 'dark' ? '#fff' : '#333';
  return (
    <Layout title="更新日志" description="本站功能与内容更新记录">
      <main className={styles.projectsContainer}>
        {/* vivo Sans 常规体、扩展 VF 和阿里妈妈东方大楷字体引入 */}
        <style>{`
          @font-face {
            font-family: 'vivo Sans 常规体';
            src: url('/fonts/vivo/vivoSans-Regular.ttf') format('truetype');
            font-display: swap;
          }
          @font-face {
            font-family: 'vivo Sans 扩展 VF';
            src: url('/fonts/vivo/vivoSansExpVF.ttf') format('truetype');
            font-display: swap;
          }
          @font-face {
            font-family: '阿里妈妈东方大楷 常规体';
            src: url('/fonts/Alibaba/AlimamaDongFangDaKai-Regular.ttf') format('truetype');
            font-display: swap;
          }
        `}</style>
        <h1 style={{fontSize: 38, fontWeight: 800, marginBottom: 32, textAlign: 'center'}}>更新日志</h1>
        {years.map(year => (
          <section key={year} className={styles.yearSection}>
            <h2 className={styles.yearHeading} style={{fontFamily: 'vivo Sans 常规体, sans-serif', color: 'var(--ifm-font-color-base)'}}>{year}</h2>
            <ul style={{fontSize: 16, color: 'var(--ifm-font-color-base)', lineHeight: 2, maxWidth: 700, margin: '0 auto'}}>
              {grouped[year].map((item, idx) => (
                <li key={idx} style={{marginBottom: 8}}>
                  <span style={{color: 'var(--ifm-font-color-base)', marginRight: 12, fontFamily: 'vivo Sans 扩展 VF, sans-serif', fontSize: 18}}>{item.date}</span>
                  <ul style={{margin: 0, paddingLeft: 20}}>
                    {item.content.map((line, i) => (
                      <li key={i} style={{marginBottom: 2, fontFamily: '阿里妈妈东方大楷 常规体, serif', fontSize: 20, color: 'var(--ifm-font-color-base)'}}>{line}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </Layout>
  );
} 