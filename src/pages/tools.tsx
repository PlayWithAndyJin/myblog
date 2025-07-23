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

// Windows 数据
const windowsList = [
  { version: 'Windows 11', official: 'https://www.microsoft.com/software-download/windows11', third: 'magnet:?xt=urn:btih:bc18d66c6105ef2e81ae8e253bdbc5467aca79e1&dn=zh-cn_windows_11_consumer_editions_version_24h2_updated_july_2025_x64_dvd_a1f0681d.iso&xl=7204851712', status: '维护中', officialDown: true, lastUpdate: '至今' },
  { version: 'Windows 10', official: 'https://www.microsoft.com/software-download/windows10', third: 'magnet:?xt=urn:btih:a07e6acd719e73aee87433a38c814955fec336e4&dn=zh-cn_windows_10_consumer_editions_version_22h2_updated_july_2025_x64_dvd_f841fba5.iso&xl=6969270272', status: '维护中', officialDown: true, lastUpdate: '至今' },
  { version: 'Windows 8.1', official: '', third: 'ed2k://|file|cn_windows_8.1_with_update_x64_dvd_6051473.iso|4504475648|D66BEF759548656EDA981D902A957545|/', status: '停止维护', officialDown: false, lastUpdate: '2014-12' },
  { version: 'Windows 8', official: '', third: 'ed2k://|file|cn_windows_8_x64_dvd_915407.iso|3652950016|5C7F8C212BD3A1827866563773A431C2|/', status: '停止维护', officialDown: false, lastUpdate: '2012-08' },
  { version: 'Windows 7 64位', official: '', third: 'magnet:?xt=urn:btih:E86414F638E11104248108B155BE9408A8362509&dn=cn_windows_7_ultimate_with_sp1_x64_dvd_u_677408.iso&xl=3420557312', status: '停止维护', officialDown: false, lastUpdate: '2019-02' },
  { version: 'Windows 7 32位', official: '', third: 'magnet:?xt=urn:btih:585DF592DE43A067C75CFE5A639B41FC3F24DA6F&dn=cn_windows_7_ultimate_with_sp1_x86_dvd_u_677486.iso&xl=2653276160', status: '停止维护', officialDown: false, lastUpdate: '2011-05' },
  { version: 'Windows Vista 32位', official: '', third: 'ed2k://|file|cn_windows_vista_with_sp2_x86_dvd_x15-36326.iso|2930489344|B6B6B6B6B6B6B6B6B6B6B6B6B6B6B6B6|/', status: '停止维护', officialDown: false, lastUpdate: '2012-04' },
  { version: 'Windows XP 32位', official: '', third: 'ed2k://|file|zh-hans_windows_xp_professional_with_service_pack_3_x86_cd_x14-80404.iso|630239232|CD0900AFA058ACB6345761969CBCBFF4|/', status: '停止维护', officialDown: false, lastUpdate: '2010-12' },
];

// macOS 数据
const macosList = [
  { name: 'macOS Tahoe', releaseDate: '2025', latestVersion: '26 Beta 4', download: 'https://sysin.org/blog/macos-tahoe/', chip: 'Apple Silicon/Intel', remark: '当前处于公测期，建议使用 macOS 15.5' },
  { name: 'macOS Sequoia', releaseDate: '2024', latestVersion: '15.5', download: 'https://sysin.org/blog/macOS-Sequoia/', chip: 'Apple Silicon/Intel', remark: '当前运行稳定，推荐使用' },
  { name: 'macOS Sonoma', releaseDate: '2023', latestVersion: '14.7.6', download: 'https://sysin.org/blog/macOS-Sonoma/', chip: 'Apple Silicon/Intel', remark: '当前运行稳定，推荐使用' },
  { name: 'macOS Ventura', releaseDate: '2022', latestVersion: '13.7.6', download: 'https://sysin.org/blog/macOS-Ventura/', chip: 'Apple Silicon/Intel', remark: '当前运行稳定，推荐使用' },
  { name: 'macOS Monterey', releaseDate: '2021', latestVersion: '12.7.6', download: 'https://sysin.org/blog/macOS-Monterey/', chip: 'Apple Silicon/Intel', remark: '当前运行稳定，推荐使用' },
  { name: 'macOS Big Sur', releaseDate: '2020', latestVersion: '11.7.10', download: 'https://sysin.org/blog/macOS-Big-Sur/', chip: 'Apple Silicon/Intel', remark: '当前运行稳定，推荐使用' },
  { name: 'macOS Catalina', releaseDate: '2019', latestVersion: '10.15.7', download: 'https://sysin.org/blog/macOS-Catalina/', chip: 'Intel', remark: '' },
  { name: 'macOS Mojave', releaseDate: '2018', latestVersion: '10.14.6', download: 'https://sysin.org/blog/macOS-Mojave/', chip: 'Intel', remark: '' },
  { name: 'macOS High Sierra', releaseDate: '2017', latestVersion: '10.13.6', download: 'https://sysin.org/blog/macOS-High-Sierra/', chip: 'Intel', remark: '' },
  { name: 'macOS Sierra', releaseDate: '2016', latestVersion: '10.12.6', download: 'https://sysin.org/blog/macOS-Sierra/', chip: 'Intel', remark: '' },
  { name: 'OS X El Capitan', releaseDate: '2015', latestVersion: '10.11.6', download: 'https://sysin.org/blog/os-x', chip: 'Intel', remark: '' },
  { name: 'OS X Yosemite', releaseDate: '2014', latestVersion: '10.10.5', download: 'https://sysin.org/blog/os-x', chip: 'Intel', remark: '' },
  { name: 'OS X Mavericks', releaseDate: '2013', latestVersion: '10.9.5', download: 'https://sysin.org/blog/os-x', chip: 'Intel', remark: '' },
  { name: 'OS X Mountain Lion', releaseDate: '2012', latestVersion: '10.8.5', download: 'https://sysin.org/blog/os-x', chip: 'Intel', remark: '' },
  { name: 'Mac OS X Lion', releaseDate: '2010', latestVersion: '10.7.5', download: 'https://sysin.org/blog/mac-os-x', chip: 'Intel', remark: '' },
];

// Linux 数据
const linuxList = [
  { name: 'Ubuntu 官网', url: 'https://ubuntu.com/' },
  { name: 'Debian 官网', url: 'https://www.debian.org/' },
  { name: 'CentOS 官网', url: 'https://www.centos.org/' },
  { name: 'Arch Linux 官网', url: 'https://www.archlinux.org/' },
  { name: 'Deepin 官网', url: 'https://www.deepin.org/' },
  { name: '统信UOS 官网', url: 'https://www.chinauos.com/' },
  { name: 'openEuler 官网', url: 'https://www.openeuler.org/' },
  { name: 'Fedora 官网', url: 'https://getfedora.org/' },
  { name: 'Kali Linux 官网', url: 'https://www.kali.org/' },
  { name: 'AlmaLinux 官网', url: 'https://almalinux.org/' },
  { name: 'Rocky Linux 官网', url: 'https://rockylinux.org/' },
  { name: 'Manjaro 官网', url: 'https://manjaro.org/' },
  { name: 'openSUSE 官网', url: 'https://www.opensuse.org/' },
  { name: 'Red Hat Enterprise Linux 官网', url: 'https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux' },
  { name: 'Linux Mint 官网', url: 'https://linuxmint.com/' },
  { name: 'Zorin OS 官网', url: 'https://zorin.com/os/' },
  { name: 'elementary OS 官网', url: 'https://elementary.io/' },
  { name: 'EndeavourOS 官网', url: 'https://endeavouros.com/' },
  { name: 'Parrot OS 官网', url: 'https://www.parrotsec.org/' },
  { name: 'Tails 官网', url: 'https://tails.net/' },
];

const categories = [
  {
    key: 'mirrors',
    label: '镜像源',
    content: (
      <div>
        <div className="alert alert--info" style={{marginBottom: 24}}>
          <strong>提示：</strong> 镜像源是各大高校和云服务商为开源软件、开发工具等提供的高速下载节点，能有效提升国内用户的软件包下载速度，减少因网络原因导致的安装失败。常用于 Python、Node.js、Linux 发行版、Docker 等生态的包管理和系统更新。<br/>
          当前已收录 <b>清华大学镜像、阿里云镜像、中科大镜像、华为云镜像</b>，后续会不断补充更多主流镜像源，欢迎持续关注。
        </div>
        {mirrorVendors.map(vendor => (
          <div key={vendor.name} style={{marginBottom: 32}}>
            <h3 style={{marginBottom: 8}}>
              <a href={vendor.url} target="_blank" rel="noopener" style={{color: '#3578e5', textDecoration: 'none'}}>{vendor.name}</a>
            </h3>
            <table style={{width: '100%', borderCollapse: 'collapse', background: 'inherit'}}>
              <thead>
                <tr>
                  <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>镜像名称</th>
                  <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>说明</th>
                  <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>镜像地址-点击跳转</th>
                  <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>状态</th>
                </tr>
              </thead>
              <tbody>
                {vendor.mirrors
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
                  .map(mirror => (
                    <tr key={mirror.url}>
                      <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>{mirror.name}</td>
                      <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>{mirror.desc}</td>
                      <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>
                        <a href={mirror.url} target="_blank" rel="noopener">{mirror.url}</a>
                      </td>
                      <td style={{padding: '6px 12px', textAlign: 'center', color: mirror.status === '离线' ? 'red' : undefined, borderLeft: 'none', borderRight: 'none'}}>{mirror.status}</td>
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
    label: '操作系统',
    content: (
      <div>
        <div className="alert alert--info" style={{marginBottom: 24}}>
          <strong>提示：</strong> 本区收录主流操作系统的官方下载与第三方下载资源，涵盖 Windows、macOS、Linux 等，方便用户快速获取各系统镜像。部分老旧系统仅提供第三方下载，建议优先选择官方渠道或权威资源。
        </div>
        <div style={{marginBottom: 32}}>
          <h3>Windows</h3>
          <table style={{width: '100%', borderCollapse: 'collapse', background: 'inherit', marginBottom: 8, border: 'none'}}>
            <thead>
              <tr>
                <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>版本</th>
                <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>官方下载</th>
                <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>第三方下载(原版)</th>
                <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>维护状态</th>
                <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>最后更新时间</th>
              </tr>
            </thead>
            <tbody>
              {windowsList.map(item => (
                <tr key={item.version}>
                  <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>{item.version}</td>
                  <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>
                    {item.officialDown ? (
                      <a href={item.official} target="_blank" rel="noopener">官方下载</a>
                    ) : (
                      <span style={{color:'#aaa'}}>已下架</span>
                    )}
                  </td>
                  <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>
                    <a href={item.third} target="_blank" rel="noopener">点击使用迅雷下载</a>
                  </td>
                  <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>{item.status}</td>
                  <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>{item.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              fontSize: 13,
              color: (typeof window !== 'undefined' && document.documentElement.classList.contains('theme-dark')) ? 'black' : 'white',
              marginBottom: 16,
              lineHeight: 1.7
            }}
          >
            “最后更新时间”字段：若官方已停止维护，则为第三方资源的最后更新日期；若官方仍在维护，则为官方的最后更新时间。<br/>
            “第三方”资源指 <b>MSDN</b> 收录的原版非激活系统镜像，并非人为修改或激活后的系统。
          </div>
        </div>
        <div style={{marginBottom: 32}}>
          <h3>macOS</h3>
          <table style={{width: '100%', borderCollapse: 'collapse', background: 'inherit', marginBottom: 8, border: 'none'}}>
            <thead>
              <tr>
                <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>名称</th>
                <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>发布时间</th>
                <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>最新版本</th>
                <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>系统下载</th>
                <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>芯片要求</th>
                <th style={{textAlign: 'center', padding: '6px 12px', borderBottom: '1px solid #eee', borderLeft: 'none', borderRight: 'none'}}>备注</th>
              </tr>
            </thead>
            <tbody>
              {macosList.map(item => (
                <tr key={item.name}>
                  <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>{item.name}</td>
                  <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>{item.releaseDate}</td>
                  <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>{item.latestVersion}</td>
                  <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}><a href={item.download} target="_blank" rel="noopener">下载</a></td>
                  <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>{item.chip}</td>
                  <td style={{padding: '6px 12px', textAlign: 'center', borderLeft: 'none', borderRight: 'none'}}>{item.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              fontSize: 13,
              color: (typeof window !== 'undefined' && document.documentElement.classList.contains('theme-dark')) ? 'black' : 'white',
              marginBottom: 16,
              lineHeight: 1.7
            }}
          >
            系统镜像下载来源：sysin.org
          </div>
        </div>
        <div style={{marginBottom: 32}}>
          <h3>Linux</h3>
          <table style={{width: '100%', borderCollapse: 'collapse', background: 'inherit', marginBottom: 8, border: 'none'}}>
            <tbody>
              {Array.from({length: Math.ceil(linuxList.length / 5)}).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {linuxList.slice(rowIdx * 5, rowIdx * 5 + 5).map(item => (
                    <td key={item.url} style={{padding: '12px 8px', textAlign: 'center', borderLeft: '1px solid #eee', borderRight: '1px solid #eee', borderBottom: 'none', borderTop: 'none'}}>
                      <a href={item.url} target="_blank" rel="noopener">{item.name}</a>
                    </td>
                  ))}
                  {/* 补齐空单元格 */}
                  {Array.from({length: 5 - linuxList.slice(rowIdx * 5, rowIdx * 5 + 5).length}).map((_, i) => (
                    <td key={"empty-"+i} style={{padding: '12px 8px', borderLeft: '1px solid #eee', borderRight: '1px solid #eee', borderBottom: 'none', borderTop: 'none'}}></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              fontSize: 13,
              color: (typeof window !== 'undefined' && document.documentElement.classList.contains('theme-dark')) ? 'black' : 'white',
              marginBottom: 16,
              lineHeight: 1.7
            }}
          >
            由于 Linux 发行版本众多，这里只展示一些。
          </div>
        </div>
      </div>
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
