import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { useColorMode } from '@docusaurus/theme-common';

// 定义镜像类型，包含 status 字段
interface Mirror {
  name: string;
  url: string;
  desc: string;
  status: string;
}

const mirrorVendors = [
  {
    name: '清华大学',
    url: 'https://mirrors.tuna.tsinghua.edu.cn/',
    mirrors: [
      { name: 'PyPI', url: 'https://pypi.tuna.tsinghua.edu.cn/simple', desc: 'Python 包管理', status: '正常' },
      { name: 'Anaconda', url: 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/', desc: '科学计算包管理', status: '正常' },
      { name: 'Miniconda', url: 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/', desc: '轻量级 Anaconda 发行版', status: '正常' },
      { name: 'Homebrew', url: 'https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/', desc: 'macOS 包管理器', status: '正常' },
      { name: 'Ubuntu/Debian', url: 'https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/', desc: 'Linux 软件源', status: '正常' },
      { name: 'CentOS', url: 'https://mirrors.tuna.tsinghua.edu.cn/help/centos/', desc: 'Linux 软件源', status: '正常' },
      { name: 'Node.js', url: 'https://mirrors.tuna.tsinghua.edu.cn/help/nodejs-release/', desc: 'Node.js 发行版', status: '正常' },
      { name: 'Docker', url: 'https://mirrors.tuna.tsinghua.edu.cn/help/docker-ce/', desc: 'Docker 软件包加速', status: '正常' },
      { name: 'CRAN', url: 'https://mirrors.tuna.tsinghua.edu.cn/CRAN/', desc: 'R 语言包管理', status: '正常' },
      { name: 'CTAN', url: 'https://mirrors.tuna.tsinghua.edu.cn/CTAN/', desc: 'LaTeX 宏包', status: '正常' },
      { name: 'CPAN', url: 'https://mirrors.tuna.tsinghua.edu.cn/CPAN/', desc: 'Perl 包管理', status: '正常' },
      { name: 'EPEL', url: 'https://mirrors.tuna.tsinghua.edu.cn/help/epel/', desc: '企业 Linux 附加包', status: '正常' },
      { name: 'Apache', url: 'https://mirrors.tuna.tsinghua.edu.cn/apache/', desc: 'Apache HTTP Server 及相关项目', status: '正常' },
      { name: 'openSUSE', url: 'https://mirrors.tuna.tsinghua.edu.cn/opensuse/', desc: 'openSUSE Linux 镜像', status: '正常' },
      { name: 'Deepin', url: 'https://mirrors.tuna.tsinghua.edu.cn/deepin/', desc: '国产 Linux 发行版 Deepin 镜像', status: '正常' },
      { name: 'MySQL', url: 'https://mirrors.tuna.tsinghua.edu.cn/mysql/', desc: 'MySQL 数据库', status: '正常' },
      { name: 'Kali', url: 'https://mirrors.tuna.tsinghua.edu.cn/kali/', desc: 'Kali 软件库镜像', status: '正常' },
      { name: 'Kali Linux', url: 'https://mirrors.tuna.tsinghua.edu.cn/kali-images/', desc: 'Kali 系统镜像', status: '正常' },
      { name: 'Arch Linux', url: 'https://mirrors.tuna.tsinghua.edu.cn/archlinux/', desc: 'Arch Linux 镜像', status: '正常' },
      { name: 'MariaDB', url: 'https://mirrors.tuna.tsinghua.edu.cn/mariadb/', desc: 'MariaDB 数据库', status: '正常' },
      { name: 'openBSD', url: 'https://mirrors.tuna.tsinghua.edu.cn/OpenBSD/', desc: 'openBSD 镜像', status: '离线' },
    ]
  },
  {
    name: '阿里云',
    url: 'https://developer.aliyun.com/mirror/',
    mirrors: [
      { name: 'PyPI', url: 'https://mirrors.aliyun.com/pypi', desc: 'Python 包管理', status: '正常' },
      { name: 'Ubuntu/Debian', url: 'https://developer.aliyun.com/mirror/ubuntu', desc: 'Linux 软件源', status: '正常' },
      { name: 'CentOS', url: 'https://developer.aliyun.com/mirror/centos', desc: 'Linux 软件源', status: '正常' },
      { name: 'Node.js', url: 'https://mirrors.aliyun.com/nodejs-release', desc: 'Node.js 发行版', status: '正常' },
      { name: 'npm', url: 'http://npmmirror.com', desc: 'Node.js 包管理', status: '正常' },
      { name: 'Homebrew', url: 'https://mirrors.aliyun.com/homebrew', desc: 'Homebrew 包管理', status: '正常' },
      { name: 'Maven', url: 'https://developer.aliyun.com/mirror/maven', desc: 'Java 包管理', status: '正常' },
      { name: 'Docker', url: 'https://developer.aliyun.com/mirror/docker-ce', desc: 'Docker 镜像加速', status: '正常' },
      { name: 'CRAN', url: 'https://mirrors.aliyun.com/CRAN/', desc: 'R 语言包管理', status: '正常' },
      { name: 'Apache', url: 'https://mirrors.aliyun.com/apache/', desc: 'Apache HTTP Server 及相关项目', status: '正常' },
      { name: 'OpenAnolis', url: 'https://mirrors.aliyun.com/anolis/', desc: '阿里云自研操作系统 OpenAnolis 镜像', status: '正常' },
      { name: 'openEuler', url: 'https://mirrors.aliyun.com/openeuler', desc: 'openEuler Linux 镜像', status: '正常' },
      { name: 'MySQL', url: 'https://mirrors.aliyun.com/mysql/', desc: 'MySQL 数据库', status: '正常' },
      { name: 'Kali Linux', url: 'https://mirrors.aliyun.com/kali-images', desc: 'Kali Linux 镜像', status: '正常' },
      { name: 'Kali 软件', url: 'https://mirrors.aliyun.com/kali', desc: 'Kali 官方软件库镜像', status: '正常' },
      { name: 'Arch Linux', url: 'https://mirrors.aliyun.com/archlinux/', desc: 'Arch Linux 镜像', status: '正常' },
      { name: 'MariaDB', url: 'https://mirrors.aliyun.com/mariadb/', desc: 'MariaDB 数据库', status: '正常' },
      { name: 'openBSD', url: 'https://mirrors.aliyun.com/openbsd/', desc: 'openBSD 镜像', status: '正常' },
      { name: 'openSUSE', url: 'https://mirrors.aliyun.com/opensuse', desc: 'openSUSE Linux 镜像', status: '正常' },
      { name: 'Deepin', url: 'https://mirrors.aliyun.com/deepin', desc: '国产 Linux 发行版 Deepin 镜像', status: '正常' },
    ]
  },
  {
    name: '中科大',
    url: 'https://mirrors.ustc.edu.cn/',
    mirrors: [
      { name: 'PyPI', url: 'https://pypi.mirrors.ustc.edu.cn/simple/', desc: 'Python 包管理', status: '正常' },
      { name: 'Anaconda', url: 'https://mirrors.ustc.edu.cn/anaconda/', desc: '科学计算包管理', status: '正常' },
      { name: 'Ubuntu/Debian', url: 'https://mirrors.ustc.edu.cn/ubuntu/', desc: 'Linux 软件源', status: '正常' },
      { name: 'CentOS', url: 'https://mirrors.ustc.edu.cn/centos-cloud/centos/', desc: 'Linux 软件源', status: '正常' },
      { name: 'Node.js', url: 'https://mirrors.ustc.edu.cn/node/', desc: 'Node.js 发行版', status: '正常' },
      { name: 'Homebrew', url: 'https://mirrors.ustc.edu.cn/homebrew-bottles/', desc: 'Homebrew 包管理', status: '正常' },
      { name: 'Docker', url: 'https://mirrors.ustc.edu.cn/docker-ce/', desc: 'Docker 镜像加速', status: '正常' },
      { name: 'CRAN', url: 'https://mirrors.ustc.edu.cn/CRAN/', desc: 'R 语言包管理', status: '正常' },
      { name: 'CTAN', url: 'https://mirrors.ustc.edu.cn/CTAN/', desc: 'LaTeX 宏包', status: '正常' },
      { name: 'CPAN', url: 'https://mirrors.ustc.edu.cn/CPAN/', desc: 'Perl 包管理', status: '正常' },
      { name: 'EPEL', url: 'https://mirrors.ustc.edu.cn/epel/', desc: '企业 Linux 附加包', status: '正常' },
      { name: 'Apache', url: 'https://mirrors.ustc.edu.cn/apache/', desc: 'Apache HTTP Server 及相关项目', status: '正常' },
      { name: 'openSUSE', url: 'https://mirrors.ustc.edu.cn/opensuse/', desc: 'openSUSE Linux 镜像', status: '正常' },
      { name: 'Deepin', url: 'https://mirrors.ustc.edu.cn/deepin/', desc: '国产 Linux 发行版 Deepin 镜像', status: '正常' },
      { name: 'MySQL', url: 'https://mirrors.ustc.edu.cn/mysql-repo/', desc: 'MySQL 数据库', status: '正常' },
      { name: 'Kali 软件', url: 'https://mirrors.ustc.edu.cn/kali/', desc: 'Kali 官方软件库', status: '正常' },
      { name: 'Kali Linux', url: 'https://mirrors.ustc.edu.cn/kali-images/', desc: 'Kali 系统镜像', status: '正常' },
      { name: 'Arch Linux', url: 'https://mirrors.ustc.edu.cn/archlinux/', desc: 'Arch Linux 镜像', status: '正常' },
      { name: 'MariaDB', url: 'https://mirrors.ustc.edu.cn/mariadb/', desc: 'MariaDB 数据库', status: '正常' },
      { name: 'openEuler', url: 'https://mirrors.ustc.edu.cn/openeuler/', desc: 'openEuler 镜像', status: '正常' },
    ]
  },
  {
    name: '华为云',
    url: 'https://mirrors.huaweicloud.com/',
    mirrors: [
      { name: 'PyPI', url: 'https://mirrors.huaweicloud.com/mirrorDetail/5ea148ce302e67c59c8fe161?mirrorName=pypi&catalog=language', desc: 'Python 包管理', status: '正常' },
      { name: 'Ubuntu/Debian', url: 'https://mirrors.huaweicloud.com/ubuntu/', desc: 'Linux 软件源', status: '正常' },
      { name: 'CentOS', url: 'https://mirrors.huaweicloud.com/centos/', desc: 'Linux 软件源', status: '正常' },
      { name: 'Node.js', url: 'https://mirrors.huaweicloud.com/nodejs/', desc: 'Node.js 发行版', status: '正常' },
      { name: 'npm', url: 'https://repo.huaweicloud.com/repository/npm/', desc: 'Node.js 包管理', status: '正常' },
      { name: 'Maven', url: 'https://mirrors.huaweicloud.com/mirrorDetail/5ea0025f2ab89b484a4dd5ce?mirrorName=maven&catalog=language', desc: 'Java 包管理', status: '正常' },
      { name: 'Docker', url: 'https://mirrors.huaweicloud.com/docker-ce/', desc: 'Docker 镜像加速', status: '正常' },
      { name: 'Apache', url: 'https://mirrors.huaweicloud.com/apache/', desc: 'Apache HTTP Server 及相关项目', status: '正常' },
      { name: 'openEuler', url: 'https://mirrors.huaweicloud.com/openeuler/', desc: '华为自研操作系统 openEuler 镜像', status: '正常' },
      { name: '华为鲲鹏-Maven', url: 'https://mirrors.huaweicloud.com/mirrorDetail/5fbb71cd07bbb121c2aded7b?mirrorName=kunpeng_maven&catalog=arm', desc: '华为鲲鹏平台 Maven 镜像', status: '正常' },
      { name: '华为鸿蒙编译器', url: 'https://mirrors.huaweicloud.com/harmonyos/compiler/', desc: '华为鸿蒙 HarmonyOS 编译器', status: '正常' },
      { name: 'Electron', url: 'https://mirrors.huaweicloud.com/electron/', desc: '跨平台桌面应用开发框架', status: '正常' },
      { name: 'Euler', url: 'https://mirrors.huaweicloud.com/euler/', desc: 'Euler Linux 镜像', status: '正常' },
      { name: 'HuaweiCloud SDK', url: 'https://mirrors.huaweicloud.com/mirrorDetail/5ea148ce302e67c59c8fe162?mirrorName=huaweicloudsdk_maven&catalog=sdk', desc: '华为云 SDK 镜像', status: '正常' },
      { name: 'openSUSE', url: 'https://mirrors.huaweicloud.com/opensuse/', desc: 'openSUSE Linux 镜像', status: '正常' },
      { name: 'openJDK', url: 'https://mirrors.huaweicloud.com/java/', desc: '开源 Java 运行环境', status: '正常' },
      { name: 'Deepin', url: 'https://mirrors.huaweicloud.com/deepin/', desc: '国产 Linux 发行版 Deepin 镜像', status: '正常' },
      { name: 'MySQL', url: 'https://mirrors.huaweicloud.com/mysql/', desc: 'MySQL 数据库', status: '正常' },
      { name: 'Kali 软件', url: 'https://mirrors.huaweicloud.com/kali/', desc: 'Kali 官方软件仓库', status: '正常' },
      { name: 'Kali Linux', url: 'https://mirrors.huaweicloud.com/kali-images/', desc: 'Kali 系统镜像', status: '正常' },
      { name: 'Arch Linux', url: 'https://mirrors.huaweicloud.com/archlinux/', desc: 'Arch Linux 镜像', status: '正常' },
      { name: 'MariaDB', url: 'https://mirrors.huaweicloud.com/mariadb/', desc: 'MariaDB 数据库', status: '正常' },
      { name: 'openBSD', url: 'https://mirrors.huaweicloud.com/OpenBSD/', desc: 'openBSD 镜像', status: '正常' },
      { name: '华为鲲鹏', url: 'https://mirrors.huaweicloud.com/mirrorDetail/5fbccd320332195e7de5b6b8?mirrorName=kunpeng_yum&catalog=arm', desc: '华为鲲鹏相关镜像（麒麟）', status: '正常' },
      { name: 'Ascend', url: 'https://mirrors.huaweicloud.com/ascend/autoarchive/', desc: '昇腾 AI 处理器相关镜像', status: '正常' },
      { name: 'ohpm', url: 'https://mirrors.huaweicloud.com/mirrorDetail/666c559aaf8ae249d7d18ed3?mirrorName=ohpm&catalog=language', desc: 'ohpm鸿蒙社区开源组件', status: '正常' },
    ]
  },
];

const categories = [
  {
    key: 'mirrors',
    label: '镜像源',
    content: (
      <div>
        {mirrorVendors.map(vendor => (
          <div key={vendor.name} style={{marginBottom: 32}}>
            <h3 style={{marginBottom: 8}}>
              <a href={vendor.url} target="_blank" rel="noopener" style={{color: '#3578e5', textDecoration: 'none'}}>{vendor.name}</a>
            </h3>
            <table style={{width: '100%', borderCollapse: 'collapse', background: 'inherit'}}>
              <thead>
                <tr>
                  <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee'}}>镜像名称</th>
                  <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee'}}>说明</th>
                  <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee'}}>镜像地址-点击跳转</th>
                  <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee'}}>状态</th>
                </tr>
              </thead>
              <tbody>
                {vendor.mirrors
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
                  .map(mirror => (
                    <tr key={mirror.url}>
                      <td style={{padding: '6px 12px'}}>{mirror.name}</td>
                      <td style={{padding: '6px 12px'}}>{mirror.desc}</td>
                      <td style={{padding: '6px 12px'}}>
                        <a href={mirror.url} target="_blank" rel="noopener">{mirror.url}</a>
                      </td>
                      <td style={{padding: '6px 12px', textAlign: 'center', color: mirror.status === '离线' ? 'red' : undefined}}>{mirror.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: 'tools',
    label: '常用工具',
    content: (
      <ul>
        <li><a href="https://gitee.com/cunkai/HomebrewCN" target="_blank" rel="noopener">Homebrew 国内一键安装脚本</a></li>
        <li><a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode 下载</a></li>
        <li><a href="https://git-scm.com/" target="_blank" rel="noopener">Git 官网</a></li>
        <li><a href="https://www.python.org/downloads/" target="_blank" rel="noopener">Python 官网</a></li>
      </ul>
    ),
  },
  {
    key: 'tutorials',
    label: '教程网站',
    content: (
      <ul>
        <li><a href="https://docs.python.org/zh-cn/3/" target="_blank" rel="noopener">Python 官方文档</a></li>
        <li><a href="https://pytorch.apachecn.org/" target="_blank" rel="noopener">PyTorch 中文文档</a></li>
        <li><a href="https://tensorflow.google.cn/" target="_blank" rel="noopener">TensorFlow 中文文档</a></li>
        <li><a href="https://www.runoob.com/" target="_blank" rel="noopener">菜鸟教程</a></li>
      </ul>
    ),
  },
  {
    key: 'others',
    label: '其他资源',
    content: (
      <ul>
        <li><a href="https://www.jetbrains.com/pycharm/" target="_blank" rel="noopener">PyCharm</a></li>
        <li><a href="https://jupyter.org/" target="_blank" rel="noopener">Jupyter 官网</a></li>
      </ul>
    ),
  },
];

function ToolsContent({ selected, setSelected }: { selected: string; setSelected: (key: string) => void }) {
  const { colorMode } = useColorMode();
  const current = categories.find(c => c.key === selected);
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        margin: 0,
        background: colorMode === 'dark' ? '#23272f' : '#fff',
        borderRadius: 0,
        boxShadow: 'none'
      }}
    >
      <nav style={{
        width: 180,
        borderRight: '1px solid #eee',
        padding: '2rem 0',
        background: colorMode === 'dark' ? '#181a20' : '#fafbfc',
        borderRadius: '12px 0 0 12px'
      }}>
        <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
          {categories.map(cat => (
            <li key={cat.key}>
              <button
                onClick={() => setSelected(cat.key)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px 24px',
                  background: selected === cat.key ? '#e3e8f0' : 'none',
                  border: 'none',
                  borderLeft: selected === cat.key ? '4px solid #3578e5' : '4px solid transparent',
                  color: selected === cat.key
                    ? '#3578e5'
                    : (colorMode === 'dark' ? '#fff' : '#222'),
                  fontWeight: selected === cat.key ? 600 : 400,
                  fontSize: 16,
                  textAlign: 'left',
                  cursor: 'pointer',
                  outline: 'none',
                  borderRadius: 0,
                  transition: 'background .2s, color .2s',
                }}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main style={{flex: 1, padding: '2rem', width: '100%'}}>
        <h2 style={{marginTop: 0}}>{current?.label}</h2>
        {current?.content}
      </main>
    </div>
  );
}

export default function Tools() {
  const [selected, setSelected] = useState('mirrors');
  return (
    <Layout title="工具库" description="常用镜像源、开发工具、教程网站等资源大全">
      <ToolsContent selected={selected} setSelected={setSelected} />
    </Layout>
  );
} 