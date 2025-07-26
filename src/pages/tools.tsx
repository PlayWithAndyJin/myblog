import React, {useState, useEffect} from 'react';
import Layout from '@theme/Layout';
import {useColorMode} from '@docusaurus/theme-common';
import {useLocation, useHistory} from '@docusaurus/router';

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
            {name: 'PyPI', url: 'https://pypi.tuna.tsinghua.edu.cn/simple', desc: 'Python 包管理', status: '正常'},
            {
                name: 'Anaconda',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/',
                desc: '科学计算包管理',
                status: '正常'
            },
            {
                name: 'Miniconda',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/',
                desc: '轻量级 Anaconda 发行版',
                status: '正常'
            },
            {
                name: 'Homebrew',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/',
                desc: 'macOS 包管理器',
                status: '正常'
            },
            {
                name: 'Ubuntu/Debian',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/',
                desc: 'Linux 软件源',
                status: '正常'
            },
            {
                name: 'CentOS',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/help/centos/',
                desc: 'Linux 软件源',
                status: '正常'
            },
            {
                name: 'Node.js',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/help/nodejs-release/',
                desc: 'Node.js 发行版',
                status: '正常'
            },
            {
                name: 'Docker',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/help/docker-ce/',
                desc: 'Docker 软件包加速',
                status: '正常'
            },
            {name: 'CRAN', url: 'https://mirrors.tuna.tsinghua.edu.cn/CRAN/', desc: 'R 语言包管理', status: '正常'},
            {name: 'CTAN', url: 'https://mirrors.tuna.tsinghua.edu.cn/CTAN/', desc: 'LaTeX 宏包', status: '正常'},
            {name: 'CPAN', url: 'https://mirrors.tuna.tsinghua.edu.cn/CPAN/', desc: 'Perl 包管理', status: '正常'},
            {
                name: 'EPEL',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/help/epel/',
                desc: '企业 Linux 附加包',
                status: '正常'
            },
            {
                name: 'Apache',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/apache/',
                desc: 'Apache HTTP Server 及相关项目',
                status: '正常'
            },
            {
                name: 'openSUSE',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/opensuse/',
                desc: 'openSUSE Linux 镜像',
                status: '正常'
            },
            {
                name: 'Deepin',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/deepin/',
                desc: '国产 Linux 发行版 Deepin 镜像',
                status: '正常'
            },
            {name: 'MySQL', url: 'https://mirrors.tuna.tsinghua.edu.cn/mysql/', desc: 'MySQL 数据库', status: '正常'},
            {name: 'Kali', url: 'https://mirrors.tuna.tsinghua.edu.cn/kali/', desc: 'Kali 软件库镜像', status: '正常'},
            {
                name: 'Kali Linux',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/kali-images/',
                desc: 'Kali 系统镜像',
                status: '正常'
            },
            {
                name: 'Arch Linux',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/archlinux/',
                desc: 'Arch Linux 镜像',
                status: '正常'
            },
            {
                name: 'MariaDB',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/mariadb/',
                desc: 'MariaDB 数据库',
                status: '正常'
            },
            {
                name: 'openBSD',
                url: 'https://mirrors.tuna.tsinghua.edu.cn/OpenBSD/',
                desc: 'openBSD 镜像',
                status: '离线'
            },
        ]
    },
    {
        name: '阿里云',
        url: 'https://developer.aliyun.com/mirror/',
        mirrors: [
            {name: 'PyPI', url: 'https://mirrors.aliyun.com/pypi', desc: 'Python 包管理', status: '正常'},
            {
                name: 'Ubuntu/Debian',
                url: 'https://developer.aliyun.com/mirror/ubuntu',
                desc: 'Linux 软件源',
                status: '正常'
            },
            {name: 'CentOS', url: 'https://developer.aliyun.com/mirror/centos', desc: 'Linux 软件源', status: '正常'},
            {name: 'Node.js', url: 'https://mirrors.aliyun.com/nodejs-release', desc: 'Node.js 发行版', status: '正常'},
            {name: 'npm', url: 'http://npmmirror.com', desc: 'Node.js 包管理', status: '正常'},
            {name: 'Homebrew', url: 'https://mirrors.aliyun.com/homebrew', desc: 'Homebrew 包管理', status: '正常'},
            {name: 'Maven', url: 'https://developer.aliyun.com/mirror/maven', desc: 'Java 包管理', status: '正常'},
            {
                name: 'Docker',
                url: 'https://developer.aliyun.com/mirror/docker-ce',
                desc: 'Docker 镜像加速',
                status: '正常'
            },
            {name: 'CRAN', url: 'https://mirrors.aliyun.com/CRAN/', desc: 'R 语言包管理', status: '正常'},
            {
                name: 'Apache',
                url: 'https://mirrors.aliyun.com/apache/',
                desc: 'Apache HTTP Server 及相关项目',
                status: '正常'
            },
            {
                name: 'OpenAnolis',
                url: 'https://mirrors.aliyun.com/anolis/',
                desc: '阿里云自研操作系统 OpenAnolis 镜像',
                status: '正常'
            },
            {
                name: 'openEuler',
                url: 'https://mirrors.aliyun.com/openeuler',
                desc: 'openEuler Linux 镜像',
                status: '正常'
            },
            {name: 'MySQL', url: 'https://mirrors.aliyun.com/mysql/', desc: 'MySQL 数据库', status: '正常'},
            {
                name: 'Kali Linux',
                url: 'https://mirrors.aliyun.com/kali-images',
                desc: 'Kali Linux 镜像',
                status: '正常'
            },
            {name: 'Kali 软件', url: 'https://mirrors.aliyun.com/kali', desc: 'Kali 官方软件库镜像', status: '正常'},
            {name: 'Arch Linux', url: 'https://mirrors.aliyun.com/archlinux/', desc: 'Arch Linux 镜像', status: '正常'},
            {name: 'MariaDB', url: 'https://mirrors.aliyun.com/mariadb/', desc: 'MariaDB 数据库', status: '正常'},
            {name: 'openBSD', url: 'https://mirrors.aliyun.com/openbsd/', desc: 'openBSD 镜像', status: '正常'},
            {name: 'openSUSE', url: 'https://mirrors.aliyun.com/opensuse', desc: 'openSUSE Linux 镜像', status: '正常'},
            {
                name: 'Deepin',
                url: 'https://mirrors.aliyun.com/deepin',
                desc: '国产 Linux 发行版 Deepin 镜像',
                status: '正常'
            },
        ]
    },
    {
        name: '中科大',
        url: 'https://mirrors.ustc.edu.cn/',
        mirrors: [
            {name: 'PyPI', url: 'https://pypi.mirrors.ustc.edu.cn/simple/', desc: 'Python 包管理', status: '正常'},
            {name: 'Anaconda', url: 'https://mirrors.ustc.edu.cn/anaconda/', desc: '科学计算包管理', status: '正常'},
            {name: 'Ubuntu/Debian', url: 'https://mirrors.ustc.edu.cn/ubuntu/', desc: 'Linux 软件源', status: '正常'},
            {
                name: 'CentOS',
                url: 'https://mirrors.ustc.edu.cn/centos-cloud/centos/',
                desc: 'Linux 软件源',
                status: '正常'
            },
            {name: 'Node.js', url: 'https://mirrors.ustc.edu.cn/node/', desc: 'Node.js 发行版', status: '正常'},
            {
                name: 'Homebrew',
                url: 'https://mirrors.ustc.edu.cn/homebrew-bottles/',
                desc: 'Homebrew 包管理',
                status: '正常'
            },
            {name: 'Docker', url: 'https://mirrors.ustc.edu.cn/docker-ce/', desc: 'Docker 镜像加速', status: '正常'},
            {name: 'CRAN', url: 'https://mirrors.ustc.edu.cn/CRAN/', desc: 'R 语言包管理', status: '正常'},
            {name: 'CTAN', url: 'https://mirrors.ustc.edu.cn/CTAN/', desc: 'LaTeX 宏包', status: '正常'},
            {name: 'CPAN', url: 'https://mirrors.ustc.edu.cn/CPAN/', desc: 'Perl 包管理', status: '正常'},
            {name: 'EPEL', url: 'https://mirrors.ustc.edu.cn/epel/', desc: '企业 Linux 附加包', status: '正常'},
            {
                name: 'Apache',
                url: 'https://mirrors.ustc.edu.cn/apache/',
                desc: 'Apache HTTP Server 及相关项目',
                status: '正常'
            },
            {
                name: 'openSUSE',
                url: 'https://mirrors.ustc.edu.cn/opensuse/',
                desc: 'openSUSE Linux 镜像',
                status: '正常'
            },
            {
                name: 'Deepin',
                url: 'https://mirrors.ustc.edu.cn/deepin/',
                desc: '国产 Linux 发行版 Deepin 镜像',
                status: '正常'
            },
            {name: 'MySQL', url: 'https://mirrors.ustc.edu.cn/mysql-repo/', desc: 'MySQL 数据库', status: '正常'},
            {name: 'Kali 软件', url: 'https://mirrors.ustc.edu.cn/kali/', desc: 'Kali 官方软件库', status: '正常'},
            {
                name: 'Kali Linux',
                url: 'https://mirrors.ustc.edu.cn/kali-images/',
                desc: 'Kali 系统镜像',
                status: '正常'
            },
            {
                name: 'Arch Linux',
                url: 'https://mirrors.ustc.edu.cn/archlinux/',
                desc: 'Arch Linux 镜像',
                status: '正常'
            },
            {name: 'MariaDB', url: 'https://mirrors.ustc.edu.cn/mariadb/', desc: 'MariaDB 数据库', status: '正常'},
            {name: 'openEuler', url: 'https://mirrors.ustc.edu.cn/openeuler/', desc: 'openEuler 镜像', status: '正常'},
        ]
    },
    {
        name: '华为云',
        url: 'https://mirrors.huaweicloud.com/',
        mirrors: [
            {
                name: 'PyPI',
                url: 'https://mirrors.huaweicloud.com/mirrorDetail/5ea148ce302e67c59c8fe161?mirrorName=pypi&catalog=language',
                desc: 'Python 包管理',
                status: '正常'
            },
            {
                name: 'Ubuntu/Debian',
                url: 'https://mirrors.huaweicloud.com/ubuntu/',
                desc: 'Linux 软件源',
                status: '正常'
            },
            {name: 'CentOS', url: 'https://mirrors.huaweicloud.com/centos/', desc: 'Linux 软件源', status: '正常'},
            {name: 'Node.js', url: 'https://mirrors.huaweicloud.com/nodejs/', desc: 'Node.js 发行版', status: '正常'},
            {name: 'npm', url: 'https://repo.huaweicloud.com/repository/npm/', desc: 'Node.js 包管理', status: '正常'},
            {
                name: 'Maven',
                url: 'https://mirrors.huaweicloud.com/mirrorDetail/5ea0025f2ab89b484a4dd5ce?mirrorName=maven&catalog=language',
                desc: 'Java 包管理',
                status: '正常'
            },
            {
                name: 'Docker',
                url: 'https://mirrors.huaweicloud.com/docker-ce/',
                desc: 'Docker 镜像加速',
                status: '正常'
            },
            {
                name: 'Apache',
                url: 'https://mirrors.huaweicloud.com/apache/',
                desc: 'Apache HTTP Server 及相关项目',
                status: '正常'
            },
            {
                name: 'openEuler',
                url: 'https://mirrors.huaweicloud.com/openeuler/',
                desc: '华为自研操作系统 openEuler 镜像',
                status: '正常'
            },
            {
                name: '华为鲲鹏-Maven',
                url: 'https://mirrors.huaweicloud.com/mirrorDetail/5fbb71cd07bbb121c2aded7b?mirrorName=kunpeng_maven&catalog=arm',
                desc: '华为鲲鹏平台 Maven 镜像',
                status: '正常'
            },
            {
                name: '华为鸿蒙编译器',
                url: 'https://mirrors.huaweicloud.com/harmonyos/compiler/',
                desc: '华为鸿蒙 HarmonyOS 编译器',
                status: '正常'
            },
            {
                name: 'Electron',
                url: 'https://mirrors.huaweicloud.com/electron/',
                desc: '跨平台桌面应用开发框架',
                status: '正常'
            },
            {name: 'Euler', url: 'https://mirrors.huaweicloud.com/euler/', desc: 'Euler Linux 镜像', status: '正常'},
            {
                name: 'HuaweiCloud SDK',
                url: 'https://mirrors.huaweicloud.com/mirrorDetail/5ea148ce302e67c59c8fe162?mirrorName=huaweicloudsdk_maven&catalog=sdk',
                desc: '华为云 SDK 镜像',
                status: '正常'
            },
            {
                name: 'openSUSE',
                url: 'https://mirrors.huaweicloud.com/opensuse/',
                desc: 'openSUSE Linux 镜像',
                status: '正常'
            },
            {name: 'openJDK', url: 'https://mirrors.huaweicloud.com/java/', desc: '开源 Java 运行环境', status: '正常'},
            {
                name: 'Deepin',
                url: 'https://mirrors.huaweicloud.com/deepin/',
                desc: '国产 Linux 发行版 Deepin 镜像',
                status: '正常'
            },
            {name: 'MySQL', url: 'https://mirrors.huaweicloud.com/mysql/', desc: 'MySQL 数据库', status: '正常'},
            {
                name: 'Kali 软件',
                url: 'https://mirrors.huaweicloud.com/kali/',
                desc: 'Kali 官方软件仓库',
                status: '正常'
            },
            {
                name: 'Kali Linux',
                url: 'https://mirrors.huaweicloud.com/kali-images/',
                desc: 'Kali 系统镜像',
                status: '正常'
            },
            {
                name: 'Arch Linux',
                url: 'https://mirrors.huaweicloud.com/archlinux/',
                desc: 'Arch Linux 镜像',
                status: '正常'
            },
            {name: 'MariaDB', url: 'https://mirrors.huaweicloud.com/mariadb/', desc: 'MariaDB 数据库', status: '正常'},
            {name: 'openBSD', url: 'https://mirrors.huaweicloud.com/OpenBSD/', desc: 'openBSD 镜像', status: '正常'},
            {
                name: '华为鲲鹏',
                url: 'https://mirrors.huaweicloud.com/mirrorDetail/5fbccd320332195e7de5b6b8?mirrorName=kunpeng_yum&catalog=arm',
                desc: '华为鲲鹏相关镜像（麒麟）',
                status: '正常'
            },
            {
                name: 'Ascend',
                url: 'https://mirrors.huaweicloud.com/ascend/autoarchive/',
                desc: '昇腾 AI 处理器相关镜像',
                status: '正常'
            },
            {
                name: 'ohpm',
                url: 'https://mirrors.huaweicloud.com/mirrorDetail/666c559aaf8ae249d7d18ed3?mirrorName=ohpm&catalog=language',
                desc: 'ohpm鸿蒙社区开源组件',
                status: '正常'
            },
        ]
    },
];

// Windows 数据
const windowsList = [
    {
        version: 'Windows 11',
        official: 'https://www.microsoft.com/software-download/windows11',
        third: 'magnet:?xt=urn:btih:bc18d66c6105ef2e81ae8e253bdbc5467aca79e1&dn=zh-cn_windows_11_consumer_editions_version_24h2_updated_july_2025_x64_dvd_a1f0681d.iso&xl=7204851712',
        status: '维护中',
        officialDown: true,
        lastUpdate: '至今'
    },
    {
        version: 'Windows 10',
        official: 'https://www.microsoft.com/software-download/windows10',
        third: 'magnet:?xt=urn:btih:a07e6acd719e73aee87433a38c814955fec336e4&dn=zh-cn_windows_10_consumer_editions_version_22h2_updated_july_2025_x64_dvd_f841fba5.iso&xl=6969270272',
        status: '维护中',
        officialDown: true,
        lastUpdate: '至今'
    },
    {
        version: 'Windows 8.1',
        official: '',
        third: 'ed2k://|file|cn_windows_8.1_with_update_x64_dvd_6051473.iso|4504475648|D66BEF759548656EDA981D902A957545|/',
        status: '停止维护',
        officialDown: false,
        lastUpdate: '2014-12'
    },
    {
        version: 'Windows 8',
        official: '',
        third: 'ed2k://|file|cn_windows_8_x64_dvd_915407.iso|3652950016|5C7F8C212BD3A1827866563773A431C2|/',
        status: '停止维护',
        officialDown: false,
        lastUpdate: '2012-08'
    },
    {
        version: 'Windows 7 64位',
        official: '',
        third: 'magnet:?xt=urn:btih:E86414F638E11104248108B155BE9408A8362509&dn=cn_windows_7_ultimate_with_sp1_x64_dvd_u_677408.iso&xl=3420557312',
        status: '停止维护',
        officialDown: false,
        lastUpdate: '2019-02'
    },
    {
        version: 'Windows 7 32位',
        official: '',
        third: 'magnet:?xt=urn:btih:585DF592DE43A067C75CFE5A639B41FC3F24DA6F&dn=cn_windows_7_ultimate_with_sp1_x86_dvd_u_677486.iso&xl=2653276160',
        status: '停止维护',
        officialDown: false,
        lastUpdate: '2011-05'
    },
    {
        version: 'Windows Vista 32位',
        official: '',
        third: 'ed2k://|file|cn_windows_vista_with_sp2_x86_dvd_x15-36326.iso|2930489344|B6B6B6B6B6B6B6B6B6B6B6B6B6B6B6B6|/',
        status: '停止维护',
        officialDown: false,
        lastUpdate: '2012-04'
    },
    {
        version: 'Windows XP 32位',
        official: '',
        third: 'ed2k://|file|zh-hans_windows_xp_professional_with_service_pack_3_x86_cd_x14-80404.iso|630239232|CD0900AFA058ACB6345761969CBCBFF4|/',
        status: '停止维护',
        officialDown: false,
        lastUpdate: '2010-12'
    },
];

// macOS 数据
const macosList = [
    {
        name: 'macOS Tahoe',
        releaseDate: '2025',
        latestVersion: '26 Beta 4',
        download: 'https://sysin.org/blog/macos-tahoe/',
        chip: 'Apple Silicon/Intel',
        remark: '当前处于公测期，建议使用 macOS 15.5'
    },
    {
        name: 'macOS Sequoia',
        releaseDate: '2024',
        latestVersion: '15.5',
        download: 'https://sysin.org/blog/macOS-Sequoia/',
        chip: 'Apple Silicon/Intel',
        remark: '当前运行稳定，推荐使用'
    },
    {
        name: 'macOS Sonoma',
        releaseDate: '2023',
        latestVersion: '14.7.6',
        download: 'https://sysin.org/blog/macOS-Sonoma/',
        chip: 'Apple Silicon/Intel',
        remark: '当前运行稳定，推荐使用'
    },
    {
        name: 'macOS Ventura',
        releaseDate: '2022',
        latestVersion: '13.7.6',
        download: 'https://sysin.org/blog/macOS-Ventura/',
        chip: 'Apple Silicon/Intel',
        remark: '当前运行稳定，推荐使用'
    },
    {
        name: 'macOS Monterey',
        releaseDate: '2021',
        latestVersion: '12.7.6',
        download: 'https://sysin.org/blog/macOS-Monterey/',
        chip: 'Apple Silicon/Intel',
        remark: '当前运行稳定，推荐使用'
    },
    {
        name: 'macOS Big Sur',
        releaseDate: '2020',
        latestVersion: '11.7.10',
        download: 'https://sysin.org/blog/macOS-Big-Sur/',
        chip: 'Apple Silicon/Intel',
        remark: '当前运行稳定，推荐使用'
    },
    {
        name: 'macOS Catalina',
        releaseDate: '2019',
        latestVersion: '10.15.7',
        download: 'https://sysin.org/blog/macOS-Catalina/',
        chip: 'Intel',
        remark: ''
    },
    {
        name: 'macOS Mojave',
        releaseDate: '2018',
        latestVersion: '10.14.6',
        download: 'https://sysin.org/blog/macOS-Mojave/',
        chip: 'Intel',
        remark: ''
    },
    {
        name: 'macOS High Sierra',
        releaseDate: '2017',
        latestVersion: '10.13.6',
        download: 'https://sysin.org/blog/macOS-High-Sierra/',
        chip: 'Intel',
        remark: ''
    },
    {
        name: 'macOS Sierra',
        releaseDate: '2016',
        latestVersion: '10.12.6',
        download: 'https://sysin.org/blog/macOS-Sierra/',
        chip: 'Intel',
        remark: ''
    },
    {
        name: 'OS X El Capitan',
        releaseDate: '2015',
        latestVersion: '10.11.6',
        download: 'https://sysin.org/blog/os-x',
        chip: 'Intel',
        remark: ''
    },
    {
        name: 'OS X Yosemite',
        releaseDate: '2014',
        latestVersion: '10.10.5',
        download: 'https://sysin.org/blog/os-x',
        chip: 'Intel',
        remark: ''
    },
    {
        name: 'OS X Mavericks',
        releaseDate: '2013',
        latestVersion: '10.9.5',
        download: 'https://sysin.org/blog/os-x',
        chip: 'Intel',
        remark: ''
    },
    {
        name: 'OS X Mountain Lion',
        releaseDate: '2012',
        latestVersion: '10.8.5',
        download: 'https://sysin.org/blog/os-x',
        chip: 'Intel',
        remark: ''
    },
    {
        name: 'Mac OS X Lion',
        releaseDate: '2010',
        latestVersion: '10.7.5',
        download: 'https://sysin.org/blog/mac-os-x',
        chip: 'Intel',
        remark: ''
    },
];

// Linux 数据
const linuxList = [
    {name: 'Ubuntu 官网', url: 'https://ubuntu.com/'},
    {name: 'Debian 官网', url: 'https://www.debian.org/'},
    {name: 'CentOS 官网', url: 'https://www.centos.org/'},
    {name: 'Arch Linux 官网', url: 'https://www.archlinux.org/'},
    {name: 'Deepin 官网', url: 'https://www.deepin.org/'},
    {name: '统信UOS 官网', url: 'https://www.chinauos.com/'},
    {name: 'openEuler 官网', url: 'https://www.openeuler.org/'},
    {name: 'Fedora 官网', url: 'https://getfedora.org/'},
    {name: 'Kali Linux 官网', url: 'https://www.kali.org/'},
    {name: 'AlmaLinux 官网', url: 'https://almalinux.org/'},
    {name: 'Rocky Linux 官网', url: 'https://rockylinux.org/'},
    {name: 'Manjaro 官网', url: 'https://manjaro.org/'},
    {name: 'openSUSE 官网', url: 'https://www.opensuse.org/'},
    {
        name: 'Red Hat Enterprise Linux 官网',
        url: 'https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux'
    },
    {name: 'Linux Mint 官网', url: 'https://linuxmint.com/'},
    {name: 'Zorin OS 官网', url: 'https://zorin.com/os/'},
    {name: 'elementary OS 官网', url: 'https://elementary.io/'},
    {name: 'EndeavourOS 官网', url: 'https://endeavouros.com/'},
    {name: 'Parrot OS 官网', url: 'https://www.parrotsec.org/'},
    {name: 'Tails 官网', url: 'https://tails.net/'},
];

// 华为开发者工具数据
const huaweiDevTools = [
    {
        name: 'DevEco Studio 5.1.1 Release',
        url: 'https://developer.harmonyos.com/cn/develop/deveco-studio',
        desc: '面向 HarmonyOS 应用及元服务开发者提供的集成开发环境（IDE），助力高效开发。',
        os: 'Windows/macOS',
        winUrl: 'https://developer.huawei.com/consumer/cn/download/deveco-studio',
        macArmUrl: 'https://developer.huawei.com/consumer/cn/download/deveco-studio',
        macX64Url: 'https://developer.huawei.com/consumer/cn/download/deveco-studio',
        linuxUrl: '',
    },
    {
        name: 'DevEco CodeGenie 5.1.0 Release',
        url: 'https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-codegenie',
        desc: 'AI 辅助编程工具提供智能知识问答、代码生成、代码解释、元服务卡片生成的能力，新增 UT 代码生成功能，帮助你高效开发鸿蒙应用及元服务。',
        os: 'Windows/macOS',
        winUrl: 'https://developer.huawei.com/consumer/cn/download/deveco-codegenie',
        macArmUrl: 'https://developer.huawei.com/consumer/cn/download/deveco-codegenie',
        macX64Url: 'https://developer.huawei.com/consumer/cn/download/deveco-codegenie',
        linuxUrl: '',
    },
    {
        name: 'Command Line Tools 5.1.1 Release',
        url: 'https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-commandline-get',
        desc: '集合了 HarmonyOS 应用开发所用到的系列工具，包括代码检查 codelinter、三方库包管理 ohpm、命令行解析 hstack、编译构建 hvigorw。',
        os: 'Windows/macOS/Linux',
        winUrl: 'https://developer.huawei.com/consumer/cn/download/command-line-tools-for-hmos',
        macArmUrl: 'https://developer.huawei.com/consumer/cn/download/command-line-tools-for-hmos',
        macX64Url: 'https://developer.huawei.com/consumer/cn/download/command-line-tools-for-hmos',
        linuxUrl: 'https://developer.huawei.com/consumer/cn/download/command-line-tools-for-hmos',
    },
    {
        name: 'ohpm-repo 5.1.5',
        url: 'https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-ohpm-repo-overview',
        desc: '一个搭建轻量级的 HarmonyOS 三方库私有仓服务的工具。它与 ohpm 包管理器兼容，用来存储和管理你独有的三方库，以保证这些三方包的私有性。此外，它还方便你在开发团队内部共享和复用这些三方库，从而提高团队的开发效率。',
        os: 'Windows/macOS/Linux',
        winUrl: 'https://developer.huawei.com/consumer/cn/download/ohpm-repo',
        macArmUrl: 'https://developer.huawei.com/consumer/cn/download/ohpm-repo',
        macX64Url: 'https://developer.huawei.com/consumer/cn/download/ohpm-repo',
        linuxUrl: 'https://developer.huawei.com/consumer/cn/download/ohpm-repo',
    },
    {
        name: 'DevEco Testing 5.1.5.300 Release',
        url: 'https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/devecotesting',
        desc: 'DevEco Testing 是一站式的应用测试服务平台。为开发者提供稳定性、性能、功耗等专项测试服务，覆盖应用测试全周期，助力打造高品质应用。此版本支持创建多种应用包格式的任务，可以选择 hap/app/zip 格式的应用包开展测试。',
        os: 'Windows/macOS',
        winUrl: 'https://developer.huawei.com/consumer/cn/download/deveco-testing',
        macArmUrl: 'https://developer.huawei.com/consumer/cn/download/deveco-testing',
        macX64Url: 'https://developer.huawei.com/consumer/cn/download/deveco-testing',
        linuxUrl: '',
    },
    {
        name: 'DevEco Testing Hypium',
        url: 'https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hypium-python-guidelines',
        desc: 'HarmonyOS NEXT 配套UI自动化测试框架，支持开发者使用 Python 语言为应用编写UI自动化测试脚本，覆盖全场景多形态设备上的自动化用例编写需求。',
        os: 'Windows/macOS',
        winUrl: 'https://developer.huawei.com/consumer/cn/download/deveco-testing-hypium',
        macArmUrl: 'https://developer.huawei.com/consumer/cn/download/deveco-testing-hypium',
        macX64Url: 'https://developer.huawei.com/consumer/cn/download/deveco-testing-hypium',
        linuxUrl: '',
    },
    {
        name: 'DevEco Studio-Cangjie Plugin 5.0.13.210 Canary',
        url: 'https://developer.huawei.com/consumer/cn/doc/cangjie-guides-V5/cj-ide-tools-overview-V5',
        desc: '提供了仓颉编程语言在 HarmonyOS NEXT 应用开发的开发套件。',
        os: 'Windows/macOS/Linux',
        winUrl: 'https://developer.huawei.com/consumer/cn/download/deveco-studio-cangjie-plugin',
        macArmUrl: 'https://developer.huawei.com/consumer/cn/download/deveco-studio-cangjie-plugin',
        macX64Url: 'https://developer.huawei.com/consumer/cn/download/deveco-studio-cangjie-plugin',
        linuxUrl: 'https://developer.huawei.com/consumer/cn/download/deveco-studio-cangjie-plugin',
    },
    {
        name: 'ASCF Plugin',
        url: 'https://developer.huawei.com/consumer/cn/doc/atomic-ascf/use-ide',
        desc: '提供了在 HarmonyOS NEXT 使用 ASCF 框架开发元服务的开发套件，包括创建 ASCF 元服务项目、转换小程序、编译 ASCF 源代码等能力。',
        os: 'Windows/macOS/Linux',
        winUrl: 'https://developer.huawei.com/consumer/cn/download/ascf-plugin',
        macArmUrl: 'https://developer.huawei.com/consumer/cn/download/ascf-plugin',
        macX64Url: 'https://developer.huawei.com/consumer/cn/download/ascf-plugin',
        linuxUrl: 'https://developer.huawei.com/consumer/cn/download/ascf-plugin',
    },
    {
        name: 'HiSmartPerf',
        url: 'https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/smartperf-tool-overview-0000001581304157',
        desc: '是华为推出的游戏性能调优工具。工具依托华为在操作系统的技术积累，具备 HarmonyOS NEXT、HarmonyOS 3.1/4.0及以下、Android、快游戏平台性能的测试、分析能力，无需 ROOT 设备，即可通过工具监测，准确、高效地采集到游戏运行时的 CPU、GPU 等性能数据，了解游戏的性能状况。',
        os: 'Windows/macOS',
        winUrl: 'https://developer.huawei.com/consumer/cn/download/hismartperf',
        macArmUrl: 'https://developer.huawei.com/consumer/cn/download/hismartperf',
        macX64Url: 'https://developer.huawei.com/consumer/cn/download/hismartperf',
        linuxUrl: '',
    },
    {
        name: 'ArkGraphics Editor',
        url: 'https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkgraphics-editor',
        desc: '3D 编辑器 ArkGraphicsEditor 已具备 3D 模型、动画、ShaderGraph 等核心编辑能力，可让设计师、开发者快速接入使用，通过拖拽等操作，完成 3D 场景开发，无代码编写提升效率，利用 3D 编辑器可视化能力，3D 设计效果所见即所得，从 PC 到移动端设备的快速流转，大幅提升 3D 应用开发效率。',
        os: 'Windows',
        winUrl: 'https://developer.huawei.com/consumer/cn/download/ark-graphics-editor',
        macArmUrl: '',
        macX64Url: '',
        linuxUrl: '',
    }
];

// 微信开发者工具数据
const wechatDevTools = [
    {
        name: '微信开发者工具 稳定版 1.06',
        url: 'https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html',
        desc: '测试版缺陷收敛后转为稳定版。Stable版本从 1.06 开始不支持Windows7，建议开发者升级Windows版本。',
        os: 'Windows/macOS',
        win32Url: 'https://servicewechat.com/wxa-dev-logic/download_redirect?type=win32_ia32&from=mpwiki&download_version=1062504010&version_type=1',
        win64Url: 'https://servicewechat.com/wxa-dev-logic/download_redirect?type=win32_x64&from=mpwiki&download_version=1062504010&version_type=1',
        macArmUrl: 'https://servicewechat.com/wxa-dev-logic/download_redirect?type=darwin_arm64&from=mpwiki&download_version=1062504010&version_type=1',
        macX64Url: 'https://servicewechat.com/wxa-dev-logic/download_redirect?type=darwin_x64&from=mpwiki&download_version=1062504010&version_type=1',
    },
    {
        name: '微信开发者工具 预发布版 1.06',
        url: 'https://developers.weixin.qq.com/miniprogram/dev/devtools/rc.html',
        desc: '预发布版，包含大的特性；通过内部测试，稳定性尚可。RC版本从 1.06 开始不支持Windows7，建议开发者升级Windows版本。',
        os: 'Windows/macOS',
        win32Url: 'https://servicewechat.com/wxa-dev-logic/download_redirect?type=win32_ia32&from=mpwiki&download_version=1062503281&version_type=1',
        win64Url: 'https://servicewechat.com/wxa-dev-logic/download_redirect?type=win32_x64&from=mpwiki&download_version=1062503281&version_type=1',
        macArmUrl: 'https://servicewechat.com/wxa-dev-logic/download_redirect?type=darwin_arm64&from=mpwiki&download_version=1062503281&version_type=1',
        macX64Url: 'https://servicewechat.com/wxa-dev-logic/download_redirect?type=darwin_x64&from=mpwiki&download_version=1062503281&version_type=1',
    },
    {
        name: '微信开发者工具 开发版 1.06',
        url: 'https://developers.weixin.qq.com/miniprogram/dev/devtools/nightly.html',
        desc: '日常构建版本(基于 NW.js 0.54.1) ，用于尽快修复缺陷和敏捷上线小的特性；开发自测验证，稳定性欠佳。Nightly版本从 1.06 开始不支持Windows7，建议开发者升级Windows版本。',
        os: 'Windows/macOS',
        win32Url: 'https://dldir1.qq.com/WechatWebDev/nightly/p-3bd19c2db3a642a0b39af853efaf67f8/0.54.1/wechat_devtools_1.06.2507212_win32_ia32.exe',
        win64Url: 'https://dldir1.qq.com/WechatWebDev/nightly/p-3bd19c2db3a642a0b39af853efaf67f8/0.54.1/wechat_devtools_1.06.2507212_win32_x64.exe',
        macArmUrl: 'https://dldir1.qq.com/WechatWebDev/nightly/p-3bd19c2db3a642a0b39af853efaf67f8/0.54.1/wechat_devtools_1.06.2507212_darwin_arm64.dmg',
        macX64Url: 'https://dldir1.qq.com/WechatWebDev/nightly/p-3bd19c2db3a642a0b39af853efaf67f8/0.54.1/wechat_devtools_1.06.2507212_darwin_x64.dmg',
    }
]

// Windows Server 数据
const windowsServerList = [
    {
        name: 'Windows Server 2025',
        version: '标准版',
        arch: '64位',
        releaseDate: '2024',
        download: 'magnet:?xt=urn:btih:69f35c09f7c5fb778a528d445840aae1b4bb7f03&dn=zh-cn_windows_server_2025_updated_july_2025_x64_dvd_a1f0681d.iso&xl=7510183936',
        status: '维护中'
    },
    {
        name: 'Windows Server 2022',
        version: '标准版',
        arch: '64位',
        releaseDate: '2021',
        download: 'magnet:?xt=urn:btih:40810feeda21cb5fbcfa2f4eebf2fd9356378412&dn=zh-cn_windows_server_2022_updated_sep_2024_x64_dvd_cab4e960.iso&xl=6155229184',
        status: '维护中'
    },
    {
        name: 'Windows Server 2019',
        version: '精华版',
        arch: '64位',
        releaseDate: '2018',
        download: 'ed2k://|file|cn_windows_server_2019_essentials_x64_dvd_5b386b0b.iso|4836911104|CBA4E3F0C66107AD6B64E4DA077D004F|/',
        status: '维护中'
    },
    {
        name: 'Windows Server 2019',
        version: '标准版',
        arch: '64位',
        releaseDate: '2018',
        download: 'magnet:?xt=urn:btih:22A410DEA1B0886354A34D19E995BECBB7EBA15E&dn=cn_windows_server_2019_updated_july_2020_x64_dvd_2c9b67da.iso&xl=5675251712',
        status: '维护中'
    },
    {
        name: 'Windows Server 2016',
        version: '精华版',
        arch: '64位',
        releaseDate: '2016',
        download: 'ed2k://|file|cn_windows_server_2016_essentials_x64_dvd_9327779.iso|4902592512|4693ECE5FEEDE3FE349FC9E7AB467CE4|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2016',
        version: '标准版',
        arch: '64位',
        releaseDate: '2016',
        download: 'ed2k://|file|cn_windows_server_2016_updated_feb_2018_x64_dvd_11636703.iso|6294265856|4077CEBEBB40AFA5A66017D2EC7A9CD5|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2012 R2',
        version: '数据中心版',
        arch: '64位',
        releaseDate: '2013',
        download: 'ed2k://|file|cn_windows_server_2012_r2_datacenter_preview_x64_dvd_2358525.iso|4239566848|F2E4A8A6DDC8F225F04333F7E0F6110D|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2012 R2',
        version: '精华版',
        arch: '64位',
        releaseDate: '2013',
        download: 'ed2k://|file|cn_windows_server_2012_r2_essentials_with_update_x64_dvd_6052796.iso|5201313792|C6E9486A9364E9A918830940EF5A1946|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2012 R2',
        version: '标准版',
        arch: '64位',
        releaseDate: '2013',
        download: 'ed2k://|file|cn_windows_server_2012_r2_with_update_x64_dvd_6052725.iso|5545705472|121EC13B53882E501C1438237E70810D|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2012',
        version: '基础版',
        arch: '64位',
        releaseDate: '2012',
        download: 'ed2k://|file|cn_windows_server_2012_storage_server_and_foundation_x64_dvd_916117.iso|3694643200|2F727F6199870ED1A3865EF864FBF0C8|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2012',
        version: '标准版',
        arch: '64位',
        releaseDate: '2012',
        download: 'ed2k://|file|cn_windows_server_2012_x64_dvd_915588.iso|3826081792|6A56281311F9FE6973F66CF36E2F50BE|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2008 R2',
        version: ' 标准/企业/数据中心/Web集合版',
        arch: '64位',
        releaseDate: '2011',
        download: 'ed2k://|file|cn_windows_server_2008_r2_standard_enterprise_datacenter_and_web_with_sp1_x64_dvd_617598.iso|3368839168|D282F613A80C2F45FF23B79212A3CF67|/',
        status: '停止维护'
    },
    {
        name: 'Windows Web Server 2008',
        version: '标准版',
        arch: '64位',
        releaseDate: '2009',
        download: 'ed2k://|file|cn_windows_web_server_2008_with_sp2_x64_dvd_x15-51046.iso|2495262720|BC46231E88E87ED9D7A307C7BEB94D89|/',
        status: '停止维护'
    },
    {
        name: 'Windows Web Server 2008',
        version: '标准版',
        arch: '32位',
        releaseDate: '2009',
        download: 'ed2k://|file|cn_windows_web_server_2008_with_sp2_x86_dvd_x15-51050.iso|1860190208|EBEA302ED2A76C4B435697F321E65804|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2008',
        version: '数据中心/企业/标准集合版',
        arch: '64位',
        releaseDate: '2008',
        download: 'ed2k://|file|cn_windows_server_2008_standard_enterprise_and_datacenter_with_sp2_x64_dvd_x15-41319.iso|2952992768|5F2CA73C9DA296CB05E7C0319F7D0E62|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2008',
        version: '数据中心/企业/标准集合版',
        arch: '32位',
        releaseDate: '2008',
        download: 'ed2k://|file|cn_windows_server_standard_enterprise_and_datacenter_with_sp2_x86_dvd_x15-41045.iso|2190057472|E93B029C442F19024AA9EF8FB02AC90B|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2003 R2',
        version: '企业版',
        arch: '64位',
        releaseDate: '2005',
        download: 'ed2k://|file|cn_win_srv_2003_r2_enterprise_x64_with_sp2_vl_cd1_X13-47314.iso|647686144|107F10D2A7FF12FFF0602FF60602BB37|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2003 R2',
        version: '标准版',
        arch: '64位',
        releaseDate: '2005',
        download: 'ed2k://|file|cn_win_srv_2003_r2_standard_x64_with_sp2_cd1_X13-28810.iso|646285312|E72B80540955703098E6AEF1DE434BAF|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2003 R2',
        version: '企业版',
        arch: '32位',
        releaseDate: '2005',
        download: 'ed2k://|file|cn_win_srv_2003_r2_enterprise_with_sp2_vl_cd1_X13-46432.iso|637917184|284DC0E76945125035B9208B9199E465|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2003 R2',
        version: '标准版',
        arch: '32位',
        releaseDate: '2005',
        download: 'ed2k://|file|cn_win_srv_2003_r2_standard_with_sp2_cd1_X13-13927.iso|636440576|E4657FA463E5BAF6367AC9B888731E95|/',
        status: '停止维护'
    },
    {
        name: 'Windows Server 2003',
        version: '标准版',
        arch: '32位',
        releaseDate: '2003',
        download: 'ed2k://|file|cn_windows_server_2003_sp2_x86_cd.iso|390135808|4C38E53EF100F80683810CAC1044CA70|/',
        status: '停止维护'
    },
];

// JetBrains 全家桶数据
const jetbrainsList = [
    {name: 'IntelliJ IDEA', url: 'https://www.jetbrains.com/idea/'},
    {name: 'PyCharm', url: 'https://www.jetbrains.com/pycharm/'},
    {name: 'WebStorm', url: 'https://www.jetbrains.com/webstorm/'},
    {name: 'PhpStorm', url: 'https://www.jetbrains.com/phpstorm/'},
    {name: 'CLion', url: 'https://www.jetbrains.com/clion/'},
    {name: 'GoLand', url: 'https://www.jetbrains.com/go/'},
    {name: 'DataGrip', url: 'https://www.jetbrains.com/datagrip/'},
    {name: 'Rider', url: 'https://www.jetbrains.com/rider/'},
    {name: 'RubyMine', url: 'https://www.jetbrains.com/ruby/'},
    {name: 'AppCode', url: 'https://www.jetbrains.com/objc/'},
    {name: 'ReSharper', url: 'https://www.jetbrains.com/resharper/'},
    {name: 'TeamCity', url: 'https://www.jetbrains.com/teamcity/'},
    {name: 'YouTrack', url: 'https://www.jetbrains.com/youtrack/'},
    {name: 'Space', url: 'https://www.jetbrains.com/space/'},
    {name: 'Datalore', url: 'https://www.jetbrains.com/datalore/'},
];

// Docker 国内实时有效源
const dockerMirrorList = [
    {vendor: '一米云', url: 'https://docker.1ms.run'},
    {vendor: '轩辕云', url: 'https://docker.xuanyuan.me'},
];

// Office办公套件数据
const officeList = [
    {gen: 'Office 365', version: '专业增强版', arch: '64位', download: '', status: '长期维护', os: 'Windows'},
    {gen: 'Office 365', version: '专业增强版', arch: '', download: '', status: '长期维护', os: 'macOS'},
    {gen: 'Office 2024', version: '专业增强版', arch: '64位', download: '', status: '维护中', os: 'Windows'},
    {gen: 'Office 2021', version: '专业增强版', arch: '32/64位', download: '', status: '维护中', os: 'Windows'},
    {
        gen: 'Office 2019',
        version: '专业增强版',
        arch: '32/64位',
        download: 'ed2k://|file|cn_office_professional_plus_2019_x86_x64_dvd_5e5be643.iso|3775004672|1E4FFA5240F21F60DC027F73F1C62FF4|/',
        status: '维护中',
        os: 'Windows'
    },
    {
        gen: 'Office 2016',
        version: '专业增强版',
        arch: '32/64位',
        download: 'ed2k://|file|cn_office_professional_plus_2016_x86_x64_dvd_6969182.iso|2588266496|27EEA4FE4BB13CD0ECCDFC24167F9E01|/',
        status: '停止维护',
        os: 'Windows'
    },
    {
        gen: 'Office 2016',
        version: '家庭和商业多集合版',
        arch: '',
        download: 'ed2k://|file|mu_office_home_and_business_2016_for_mac_mac_dvd_7027756.iso|1214924800|D6FA02597D30709949C4FEA6AA0F9D6B|/',
        status: '停止维护',
        os: 'macOS'
    },
    {
        gen: 'Office 2013',
        version: '专业增强 SP1 补丁版',
        arch: '32/64位',
        download: 'ed2k://|file|cn_office_professional_plus_2013_with_sp1_x86_and_x64_dvd_3921921.iso|1838749696|C2C7DCB43293252480A32F91F21DE3B3|/',
        status: '停止维护',
        os: 'Windows'
    },
    {
        gen: 'Office 2011',
        version: 'SP1 补丁版',
        arch: '',
        download: 'ed2k://|file|cn_office_for_mac_2011_with_sp1_mac_dvd_671939.iso|1229187072|4F13E440C6243FB9C1877222B1C38745|/',
        status: '停止维护',
        os: 'macOS'
    },
    {
        gen: 'Office 2010',
        version: '专业增强 SP1 补丁版',
        arch: '32/64位',
        download: 'ed2k://|file|cn_office_professional_plus_2010_with_sp1_x86_x64_732114.iso|2939512832|7A118C7E70D022C54D27E6C3B9C72C36|/',
        status: '停止维护',
        os: 'Windows'
    },
    {
        gen: 'Office 2007',
        version: '专业增强版',
        arch: '32位',
        download: 'ed2k://|file|cn_office_professional_plus_2007_dvd_X12-38713.iso|694059008|CFAE350F8A9028110D12D61D9AEC1315|/',
        status: '停止维护',
        os: 'Windows'
    },
    {
        gen: 'Office 2003',
        version: 'SP3 补丁版',
        arch: '32位',
        download: 'ed2k://|file|zh-Hans_office_2003_service_pack_3_x86.exe|142028200|93157828F4CDA043AD266EC492599111|/',
        status: '停止维护',
        os: 'Windows'
    },
];

// UI资源数据
const uiResourceList = [
    {name: 'Iconfont', url: 'https://www.iconfont.cn/', desc: '阿里巴巴矢量图标库'},
    {name: 'Font Awesome', url: 'https://fontawesome.com/', desc: '全球知名图标库'},
    {name: 'unDraw', url: 'https://undraw.co/illustrations', desc: '免费可商用插画库'},
    {name: 'LottieFiles', url: 'https://lottiefiles.com/', desc: '动画素材库'},
    {name: 'UI8', url: 'https://ui8.net/', desc: '高质量UI设计资源'},
    {name: 'Figma Community', url: 'https://www.figma.com/community', desc: 'Figma官方社区资源'},
    {name: 'Dribbble', url: 'https://dribbble.com/', desc: '设计师作品展示平台'},
    {name: 'Behance', url: 'https://www.behance.net/', desc: 'Adobe旗下设计作品平台'},
    {name: 'Freepik', url: 'https://www.freepik.com/', desc: '免费矢量、插画、图片资源'},
    {name: 'Pexels', url: 'https://www.pexels.com/', desc: '免费高清图片/视频素材'},
    {name: 'Unsplash', url: 'https://unsplash.com/', desc: '高质量免费图片库'},
    {name: 'Shields.io', url: 'https://shields.io/', desc: '开源项目徽章生成'},
];

// 字体资源数据
const fontResourceList = [
    // OPPO
    {
        name: 'OPPO Sans 粗体',
        file: '/fonts/OPPO/OPPOSans-Bold.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'OPPO Sans 中等',
        file: '/fonts/OPPO/OPPOSans-Medium.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'OPPO Sans 常规体',
        file: '/fonts/OPPO/OPPOSans-Regular.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    // Alibaba
    {
        name: '淘宝买菜体 常规体',
        file: '/fonts/Alibaba/TaoBaoMaiCaiTi-Regular.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: '阿里妈妈方圆体 纤细',
        file: '/fonts/Alibaba/AlimamaFangYuanTiVF-Thin.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: '阿里妈妈刀隶体',
        file: '/fonts/Alibaba/AlimamaDaoLiTi.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: '阿里妈妈东方大楷 常规体',
        file: '/fonts/Alibaba/AlimamaDongFangDaKai-Regular.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: '阿里妈妈数黑体 粗体',
        file: '/fonts/Alibaba/AlimamaShuHeiTi-Bold.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: '阿里巴巴普惠体 常规体',
        file: '/fonts/Alibaba/Alibaba-PuHuiTi-Regular.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    // HarmonyOS
    {
        name: 'HarmonyOS Sans TC 常规体',
        file: '/fonts/HarmonyOS/HarmonyOS_SansTC_Regular.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'HarmonyOS Sans SC 常规体',
        file: '/fonts/HarmonyOS/HarmonyOS_SansSC_Regular.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'HarmonyOS Sans Condensed 常规体',
        file: '/fonts/HarmonyOS/HarmonyOS_Sans_Condensed_Regular.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    {
        name: 'HarmonyOS Sans Italic 斜体',
        file: '/fonts/HarmonyOS/HarmonyOS_SansItalic_Regular.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    {
        name: 'HarmonyOS Sans 常规体',
        file: '/fonts/HarmonyOS/HarmonyOS_Sans_Regular.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    {
        name: 'HarmonyOS Sans Naskh ArabicUI',
        file: '/fonts/HarmonyOS/HarmonyOS_Sans_Naskh_ArabicUI_Regular.ttf',
        sample: 'السلام عليكم',
        lang: 'ar',
    },
    {
        name: 'HarmonyOS Sans Naskh Arabic',
        file: '/fonts/HarmonyOS/HarmonyOS_Sans_Naskh_Arabic_Regular.ttf',
        sample: 'السلام عليكم',
        lang: 'ar',
    },
    {
        name: '钉钉进步体 常规体',
        file: '/fonts/Alibaba/DingTalkJinBuTi-Regular.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    // HONOR
    {
        name: 'HONOR Sans CN 常规体',
        file: '/fonts/HONOR/HONORSansCN-Regular.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'HONOR Sans TC 常规体',
        file: '/fonts/HONOR/HONORSansTC-Regular.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'HONOR Sans 常规体',
        file: '/fonts/HONOR/HONORSans-Regular.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    {
        name: 'HONOR Sans ArabicUI',
        file: '/fonts/HONOR/HONORSansArabicUI-R.ttf',
        sample: 'السلام عليكم',
        lang: 'ar',
    },
    {
        name: 'HarmonyOS Sans SC 细体 (本站使用)',
        file: '/fonts/HarmonyOS/HarmonyOS_SansSC_Light.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'Alibaba Sans 斜体',
        file: '/fonts/Alibaba/AlibabaSans-Italic.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    {
        name: 'Alibaba Sans 常规体',
        file: '/fonts/Alibaba/AlibabaSans-Regular.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    {
        name: '阿里妈妈灵动体 纤细',
        file: '/fonts/Alibaba/AlimamaAgileVF-Thin.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    // vivo
    {
        name: 'vivo Sans ENVF（可变字体）',
        file: '/fonts/vivo/vivoSansENVF.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
        vivo: true,
    },
    {
        name: 'vivo Sans 简体中文 L3 (生僻字)',
        file: '/fonts/vivo/vivo Sans SC L3.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
        vivo: true,
    },
    {
        name: 'vivo Sans Global 常规体',
        file: '/fonts/vivo/vivoSansGlobal-Regular.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
        vivo: true,
    },
    {
        name: 'vivo Sans 常规体',
        file: '/fonts/vivo/vivoSans-Regular.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
        vivo: true,
    },
    {
        name: 'vivo Sans 紧凑斜体 VF',
        file: '/fonts/vivo/vivoSansCompItalicVF.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
        vivo: true,
    },
    {
        name: 'vivo Sans 扩展斜体 VF',
        file: '/fonts/vivo/vivoSansExpItalicVF.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
        vivo: true,
    },
    {
        name: 'vivo Sans 扩展 VF',
        file: '/fonts/vivo/vivoSansExpVF.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
        vivo: true,
    },
    {
        name: 'vivo Sans 紧凑斜体 VF',
        file: '/fonts/vivo/vivoSansCondItalicVF.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
        vivo: true,
    },
    {
        name: 'vivo Sans 紧凑 VF',
        file: '/fonts/vivo/vivoSansCondVF.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
        vivo: true,
    },
    {
        name: 'vivo Sans 紧凑 VF',
        file: '/fonts/vivo/vivoSansCompVF.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
        vivo: true,
    },
    {
        name: 'vivo Sans 标准斜体 VF',
        file: '/fonts/vivo/vivoSansStdItalicVF.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
        vivo: true,
    },
    {
        name: 'vivo Sans 标准 VF',
        file: '/fonts/vivo/vivoSansStdVF.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
        vivo: true,
    },
    {
        name: 'MiSans 极细',
        file: '/fonts/xiaomi/MiSans-Thin.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'MiSans 特细',
        file: '/fonts/xiaomi/MiSans-ExtraLight.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'MiSans 细',
        file: '/fonts/xiaomi/MiSans-Light.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'MiSans 常规',
        file: '/fonts/xiaomi/MiSans-Normal.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'MiSans 标准',
        file: '/fonts/xiaomi/MiSans-Regular.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'MiSans 中等',
        file: '/fonts/xiaomi/MiSans-Medium.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'MiSans 半粗',
        file: '/fonts/xiaomi/MiSans-Demibold.ttf',
        sample: '世界你好 123456 Hello World',
        lang: 'zh',
    },
    {
        name: 'MiSans Latin 极细',
        file: '/fonts/xiaomi/MiSansLatin-Thin.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    {
        name: 'MiSans Latin 特细',
        file: '/fonts/xiaomi/MiSansLatin-ExtraLight.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    {
        name: 'MiSans Latin 细',
        file: '/fonts/xiaomi/MiSansLatin-Light.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    {
        name: 'MiSans Latin 常规',
        file: '/fonts/xiaomi/MiSansLatin-Normal.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    {
        name: 'MiSans Latin 标准',
        file: '/fonts/xiaomi/MiSansLatin-Regular.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    {
        name: 'MiSans Latin 中等',
        file: '/fonts/xiaomi/MiSansLatin-Medium.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
    {
        name: 'MiSans Latin 半粗',
        file: '/fonts/xiaomi/MiSansLatin-Demibold.ttf',
        sample: 'The quick brown fox jumps over the lazy dog',
        lang: 'en',
    },
];

function FontsPanel({ isMobile, setModal }: { isMobile: boolean; setModal: (modal: any) => void }) {
    const defaultSample = '世界你好 123456 Hello World';
    const [sample, setSample] = React.useState(defaultSample);
    return (
        <div>
            <div className="alert alert--info" style={{marginBottom: 24}}>
                <strong>提示：</strong> 这里收录OPPO、vivo、荣耀、华为、小米、阿里巴巴等主流品牌字体，点击右侧按钮可下载字体文件。下方样句已用对应字体渲染，供预览效果参考。浏览该界面我建议用户关闭设备的深色模式并将本站调至亮色模式，这样阅览字体的感受会好些。
            </div>
            <div style={{margin: '0 0 24px 0', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2}}>
                <span style={{fontSize: 15, color: '#222', whiteSpace: 'nowrap'}}>自定义样例：</span>
                <input
                    type="text"
                    value={sample}
                    onChange={e => setSample(e.target.value)}
                    placeholder="所有字体将同步显示"
                    style={{
                        width: '100%',
                        maxWidth: 480,
                        padding: '10px 16px',
                        fontSize: 16,
                        borderRadius: 8,
                        border: '1px solid #ddd',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                        outline: 'none',
                        margin: '0 auto',
                    }}
                />
            </div>
            {/* OPPO 字体 */}
            <div style={{marginTop: 32, marginBottom: 32, background: '#f6f8fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24}}>
                <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>OPPO</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: 32}}>
                    {fontResourceList.filter(f => f.file.startsWith('/fonts/OPPO/')).map(font => (
                        <div key={font.name} style={{marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 16}}>
                            <style>{`
              @font-face {
                font-family: '${font.name}';
                src: url('${font.file}');
                font-display: swap;
              }
            `}</style>
                            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                                <span style={{fontWeight: 600, fontSize: 18}}>{font.name}</span>
                                {isMobile ? (
                                    <button
                                        onClick={() => setModal({ 
                                            url: '', 
                                            sys: '', 
                                            expect: '', 
                                            id: 'font-download-' + font.name, 
                                            type: 'mobile-reminder' 
                                        })}
                                        style={{padding: '8px', background: 'rgba(53, 120, 229, 0.9)', color: '#fff', borderRadius: '50%', textDecoration: 'none', fontSize: 16, border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(53, 120, 229, 0.3)'}}
                                        title="下载字体"
                                    >⬇</button>
                                ) : (
                                    <a href={font.file} download style={{padding: '4px 16px', background: '#3578e5', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 14}}>下载</a>
                                )}
                            </div>
                            <div className="force-black" style={{marginTop: 8, fontSize: 20, fontFamily: `'${font.name}', sans-serif`}}>{sample || font.sample}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* 阿里巴巴字体 */}
            <div style={{marginTop: 32, marginBottom: 32, background: '#f6f8fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24}}>
                <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>阿里巴巴</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: 32}}>
                    {fontResourceList.filter(f => f.file.startsWith('/fonts/Alibaba/')).map(font => (
                        <div key={font.name} style={{marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 16}}>
                            <style>{`
              @font-face {
                font-family: '${font.name}';
                src: url('${font.file}');
                font-display: swap;
              }
            `}</style>
                            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                                <span style={{fontWeight: 600, fontSize: 18}}>{font.name}</span>
                                {isMobile ? (
                                    <button
                                        onClick={() => setModal({ 
                                            url: '', 
                                            sys: '', 
                                            expect: '', 
                                            id: 'font-download-' + font.name, 
                                            type: 'mobile-reminder' 
                                        })}
                                        style={{padding: '8px', background: 'rgba(53, 120, 229, 0.9)', color: '#fff', borderRadius: '50%', textDecoration: 'none', fontSize: 16, border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(53, 120, 229, 0.3)'}}
                                        title="下载字体"
                                    >⬇</button>
                                ) : (
                                    <a href={font.file} download style={{padding: '4px 16px', background: '#3578e5', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 14}}>下载</a>
                                )}
                            </div>
                            <div className="force-black" style={{marginTop: 8, fontSize: 20, fontFamily: `'${font.name}', sans-serif`}}>{sample || font.sample}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* 华为 HarmonyOS 字体 */}
            <div style={{marginTop: 32, marginBottom: 32, background: '#f6f8fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24}}>
                <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>华为（HarmonyOS）</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: 32}}>
                    {fontResourceList.filter(f => f.file.startsWith('/fonts/HarmonyOS/')).map(font => (
                        <div key={font.name} style={{marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 16}}>
                            <style>{`
              @font-face {
                font-family: '${font.name}';
                src: url('${font.file}');
                font-display: swap;
              }
            `}</style>
                            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                                <span style={{fontWeight: 600, fontSize: 18}}>{font.name}</span>
                                {isMobile ? (
                                    <button
                                        onClick={() => setModal({ 
                                            url: '', 
                                            sys: '', 
                                            expect: '', 
                                            id: 'font-download-' + font.name, 
                                            type: 'mobile-reminder' 
                                        })}
                                        style={{padding: '8px', background: 'rgba(53, 120, 229, 0.9)', color: '#fff', borderRadius: '50%', textDecoration: 'none', fontSize: 16, border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(53, 120, 229, 0.3)'}}
                                        title="下载字体"
                                    >⬇</button>
                                ) : (
                                    <a href={font.file} download style={{padding: '4px 16px', background: '#3578e5', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 14}}>下载</a>
                                )}
                            </div>
                            <div className="force-black" style={{marginTop: 8, fontSize: 20, fontFamily: `'${font.name}', sans-serif`}}>{sample || font.sample}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* 荣耀 HONOR 字体 */}
            <div style={{marginTop: 32, marginBottom: 32, background: '#f6f8fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24}}>
                <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>荣耀 HONOR</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: 32}}>
                    {fontResourceList.filter(f => f.file.startsWith('/fonts/HONOR/')).map(font => (
                        <div key={font.name} style={{marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 16}}>
                            <style>{`
              @font-face {
                font-family: '${font.name}';
                src: url('${font.file}');
                font-display: swap;
              }
            `}</style>
                            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                                <span style={{fontWeight: 600, fontSize: 18}}>{font.name}</span>
                                {isMobile ? (
                                    <button
                                        onClick={() => setModal({ 
                                            url: '', 
                                            sys: '', 
                                            expect: '', 
                                            id: 'font-download-' + font.name, 
                                            type: 'mobile-reminder' 
                                        })}
                                        style={{padding: '8px', background: 'rgba(53, 120, 229, 0.9)', color: '#fff', borderRadius: '50%', textDecoration: 'none', fontSize: 16, border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(53, 120, 229, 0.3)'}}
                                        title="下载字体"
                                    >⬇</button>
                                ) : (
                                    <a href={font.file} download style={{padding: '4px 16px', background: '#3578e5', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 14}}>下载</a>
                                )}
                            </div>
                            <div className="force-black" style={{marginTop: 8, fontSize: 20, fontFamily: `'${font.name}', sans-serif`}}>{sample || font.sample}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* vivo 字体 */}
            <div style={{marginTop: 32, marginBottom: 32, background: '#f6f8fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24}}>
                <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>vivo</h3>
                <div className="force-black" style={{marginBottom: 16, fontSize: 15, background: '#fffbe6', borderRadius: 8, padding: '10px 16px', lineHeight: 1.7}}>
                  由于 vivo 官方限制字体包再分发，本站仅供预览，下载请前往 vivo 开发者官网获取授权与字体包。
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 32}}>
                    {fontResourceList.filter(f => f.file.startsWith('/fonts/vivo/')).map(font => (
                        <div key={font.name} style={{marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 16}}>
                            <style>{`@font-face { font-family: '${font.name}'; src: url('${font.file}'); font-display: swap; }`}</style>
                            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                                <span style={{fontWeight: 600, fontSize: 18}}>{font.name}</span>
                                {isMobile ? (
                                    <button
                                        onClick={() => setModal({ 
                                            url: '', 
                                            sys: '', 
                                            expect: '', 
                                            id: 'font-download-vivo', 
                                            type: 'mobile-reminder' 
                                        })}
                                        style={{padding: '8px', background: 'rgba(53, 120, 229, 0.9)', color: '#fff', borderRadius: '50%', textDecoration: 'none', fontSize: 16, border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(53, 120, 229, 0.3)'}}
                                        title="去官网下载"
                                    >⬇</button>
                                ) : (
                                    <a href="https://developers.vivo.com/doc/d/314fa33cbaec4a93be351cd44757d9d9" target="_blank" rel="noopener" style={{padding: '4px 16px', background: '#3578e5', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 14}}>去官网下载</a>
                                )}
                            </div>
                            <div className="force-black" style={{marginTop: 8, fontSize: 20, fontFamily: `'${font.name}', sans-serif`}}>
                              {font.name.includes('L3') ? '龘 䶮 麤 黷 鱻 灥 鸂 纛' : (sample || font.sample)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* 思源黑体 */}
            <div style={{marginTop: 32, marginBottom: 32, background: '#f6f8fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24}}>
                <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>思源黑体</h3>
                <style>{`
                  @font-face { font-family: 'Source Han Sans SC'; font-weight: 100; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-sans/1.001/SourceHanSansSC-ExtraLight.otf') format('opentype'); font-display: swap; }
                  @font-face { font-family: 'Source Han Sans SC'; font-weight: 200; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-sans/1.001/SourceHanSansSC-Light.otf') format('opentype'); font-display: swap; }
                  @font-face { font-family: 'Source Han Sans SC'; font-weight: 300; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-sans/1.001/SourceHanSansSC-Normal.otf') format('opentype'); font-display: swap; }
                  @font-face { font-family: 'Source Han Sans SC'; font-weight: 400; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-sans/1.001/SourceHanSansSC-Regular.otf') format('opentype'); font-display: swap; }
                  @font-face { font-family: 'Source Han Sans SC'; font-weight: 500; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-sans/1.001/SourceHanSansSC-Medium.otf') format('opentype'); font-display: swap; }
                  @font-face { font-family: 'Source Han Sans SC'; font-weight: 600; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-sans/1.001/SourceHanSansSC-Bold.otf') format('opentype'); font-display: swap; }
                  @font-face { font-family: 'Source Han Sans SC'; font-weight: 700; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-sans/1.001/SourceHanSansSC-Heavy.otf') format('opentype'); font-display: swap; }
                  @font-face { font-family: 'Source Han Sans SC'; font-weight: 900; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-sans/1.001/SourceHanSansSC-Black.otf') format('opentype'); font-display: swap; }
                `}</style>
                <div style={{display: 'flex', flexDirection: 'column', gap: 32}}>
                  {[{name: '极细', weight: 100}, {name: '特细', weight: 200}, {name: '细', weight: 300}, {name: '常规', weight: 400}, {name: '中等', weight: 500}, {name: '粗', weight: 600}, {name: '特粗', weight: 700}, {name: '黑体', weight: 900}].map(font => (
                    <div key={font.name} style={{marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 16}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                        <span style={{fontWeight: 600, fontSize: 18}}>思源黑体 {font.name}</span>
                        {isMobile ? (
                            <button
                                onClick={() => setModal({ 
                                    url: '', 
                                    sys: '', 
                                    expect: '', 
                                    id: 'font-download-source-han-sans', 
                                    type: 'mobile-reminder' 
                                })}
                                style={{padding: '8px', background: 'rgba(53, 120, 229, 0.9)', color: '#fff', borderRadius: '50%', textDecoration: 'none', fontSize: 16, border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(53, 120, 229, 0.3)'}}
                                title="下载字体"
                            >⬇</button>
                        ) : (
                            <a href="https://github.com/adobe-fonts/source-han-sans/releases/download/2.005R/09_SourceHanSansSC.zip" target="_blank" rel="noopener" style={{padding: '4px 16px', background: '#3578e5', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 14}}>下载</a>
                        )}
                      </div>
                      <div className="force-black" style={{marginTop: 8, fontSize: 20, fontFamily: 'Source Han Sans SC, sans-serif', fontWeight: font.weight}}>{sample || defaultSample}</div>
                    </div>
                  ))}
                </div>
            </div>
            {/* 思源宋体 */}
            <div style={{marginTop: 32, marginBottom: 32, background: '#f6f8fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24}}>
              <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>思源宋体</h3>
              <style>{`
                @font-face { font-family: 'Source Han Serif SC'; font-weight: 200; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-serif/1.001/SourceHanSerifSC-ExtraLight.otf') format('opentype'); font-display: swap; }
                @font-face { font-family: 'Source Han Serif SC'; font-weight: 300; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-serif/1.001/SourceHanSerifSC-Light.otf') format('opentype'); font-display: swap; }
                @font-face { font-family: 'Source Han Serif SC'; font-weight: 400; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-serif/1.001/SourceHanSerifSC-Regular.otf') format('opentype'); font-display: swap; }
                @font-face { font-family: 'Source Han Serif SC'; font-weight: 500; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-serif/1.001/SourceHanSerifSC-Medium.otf') format('opentype'); font-display: swap; }
                @font-face { font-family: 'Source Han Serif SC'; font-weight: 600; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-serif/1.001/SourceHanSerifSC-SemiBold.otf') format('opentype'); font-display: swap; }
                @font-face { font-family: 'Source Han Serif SC'; font-weight: 700; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-serif/1.001/SourceHanSerifSC-Bold.otf') format('opentype'); font-display: swap; }
                @font-face { font-family: 'Source Han Serif SC'; font-weight: 900; src: url('https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/source-han-serif/1.001/SourceHanSerifSC-Heavy.otf') format('opentype'); font-display: swap; }
              `}</style>
              <div style={{display: 'flex', flexDirection: 'column', gap: 32}}>
                {[{name: '极细', weight: 200}, {name: '特细', weight: 300}, {name: '常规', weight: 400}, {name: '中等', weight: 500}, {name: '半粗', weight: 600}, {name: '粗', weight: 700}, {name: '特粗', weight: 900}].map(font => (
                  <div key={font.name} style={{marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 16}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                      <span style={{fontWeight: 600, fontSize: 18}}>思源宋体 {font.name}</span>
                      {isMobile ? (
                          <button
                              onClick={() => setModal({ 
                                  url: '', 
                                  sys: '', 
                                  expect: '', 
                                  id: 'font-download-source-han-serif', 
                                  type: 'mobile-reminder' 
                              })}
                              style={{padding: '8px', background: 'rgba(53, 120, 229, 0.9)', color: '#fff', borderRadius: '50%', textDecoration: 'none', fontSize: 16, border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(53, 120, 229, 0.3)'}}
                              title="下载字体"
                          >⬇</button>
                      ) : (
                          <a href="https://github.com/adobe-fonts/source-han-serif/releases/download/2.003R/09_SourceHanSerifSC.zip" target="_blank" rel="noopener" style={{padding: '4px 16px', background: '#3578e5', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 14}}>下载</a>
                      )}
                    </div>
                    <div className="force-black" style={{marginTop: 8, fontSize: 20, fontFamily: 'Source Han Serif SC, serif', fontWeight: font.weight}}>{sample || defaultSample}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* 小米字体 */}
            <div style={{marginTop: 32, marginBottom: 32, background: '#f6f8fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24}}>
                <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>小米</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: 32}}>
                    {fontResourceList.filter(f => f.file.startsWith('/fonts/xiaomi/') && !f.name.includes('L3')).map(font => (
                        <div key={font.name} style={{marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 16}}>
                            <style>{`
              @font-face {
                font-family: '${font.name}';
                src: url('${font.file}');
                font-display: swap;
              }
            `}</style>
                            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                                <span style={{fontWeight: 600, fontSize: 18}}>{font.name}</span>
                                {isMobile ? (
                                    <button
                                        onClick={() => setModal({ 
                                            url: '', 
                                            sys: '', 
                                            expect: '', 
                                            id: 'font-download-' + font.name, 
                                            type: 'mobile-reminder' 
                                        })}
                                        style={{padding: '8px', background: 'rgba(53, 120, 229, 0.9)', color: '#fff', borderRadius: '50%', textDecoration: 'none', fontSize: 16, border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(53, 120, 229, 0.3)'}}
                                        title="下载字体"
                                    >⬇</button>
                                ) : (
                                    <a href={font.file} download style={{padding: '4px 16px', background: '#3578e5', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 14}}>下载</a>
                                )}
                            </div>
                            <div className="force-black" style={{marginTop: 8, fontSize: 20, fontFamily: `'${font.name}', sans-serif`}}>{sample || font.sample}</div>
                        </div>
                    ))}
                    {/* L3 特殊展示 */}
                    {fontResourceList.filter(f => f.file.startsWith('/fonts/xiaomi/') && f.name.includes('L3')).map(font => (
                        <div key={font.name} style={{marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 16}}>
                            <style>{`
              @font-face {
                font-family: '${font.name}';
                src: url('${font.file}');
                font-display: swap;
              }
            `}</style>
                            <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                                <span style={{fontWeight: 600, fontSize: 18}}>{font.name}（生僻字专用）</span>
                                {isMobile ? (
                                    <button
                                        onClick={() => setModal({ 
                                            url: '', 
                                            sys: '', 
                                            expect: '', 
                                            id: 'font-download-' + font.name, 
                                            type: 'mobile-reminder' 
                                        })}
                                        style={{padding: '8px', background: 'rgba(53, 120, 229, 0.9)', color: '#fff', borderRadius: '50%', textDecoration: 'none', fontSize: 16, border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(53, 120, 229, 0.3)'}}
                                        title="下载字体"
                                    >⬇</button>
                                ) : (
                                    <a href={font.file} download style={{padding: '4px 16px', background: '#3578e5', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 14}}>下载</a>
                                )}
                            </div>
                            <div className="force-black" style={{marginTop: 8, fontSize: 20, fontFamily: `'${font.name}', sans-serif`}}>龘 䶮 麤 黷 鱻 灥 鸂 纛</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



const categories = [
    {
        key: 'mirrors',
        label: '镜像源',
        content: (
            <div>
                <div className="alert alert--info" style={{marginBottom: 24}}>
                    <strong>提示：</strong> 镜像源是各大高校和云服务商为开源软件、开发工具等提供的高速下载节点，能有效提升国内用户的软件包下载速度，减少因网络原因导致的安装失败。常用于
                    Python、Node.js、Linux 发行版、Docker 等生态的包管理和系统更新。<br/>
                    当前已收录 <b>清华大学镜像、阿里云镜像、中科大镜像、华为云镜像</b>，后续会不断补充更多主流镜像源，欢迎持续关注。
                </div>
                {mirrorVendors.map(vendor => (
                    <div key={vendor.name} style={{
                        marginTop: 32,
                        marginBottom: 32,
                        background: '#f6f8fa',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        padding: 24
                    }}>
                        <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>
                            <a href={vendor.url} target="_blank" rel="noopener"
                               style={{color: '#3578e5', textDecoration: 'none'}}>{vendor.name}</a>
                        </h3>
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
                            {vendor.mirrors
                                .slice()
                                .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
                                .map(mirror => (
                                    <div key={mirror.url} style={{
                                        background: '#fff',
                                        borderRadius: 8,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                        padding: 20,
                                        minWidth: 260,
                                        flex: '1 1 260px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 8
                                    }}>
                                        <div style={{
                                            fontWeight: 700,
                                            fontSize: 16,
                                            color: '#3578e5'
                                        }}>{mirror.name}</div>
                                        <div className="force-black" style={{fontSize: 14}}>{mirror.desc}</div>
                                        <div style={{fontSize: 14, wordBreak: 'break-all'}}>
                                            <a href={mirror.url} target="_blank" rel="noopener"
                                               style={{color: '#3578e5', textDecoration: 'none'}}>{mirror.url}</a>
                                        </div>
                                        <div style={{
                                            fontSize: 14,
                                            color: mirror.status === '离线' ? 'red' : '#3578e5',
                                            fontWeight: 600
                                        }}>{mirror.status}</div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        ),
    },
    {
        key: 'os',
        label: '操作系统',
        content: null, // 由 ToolsContent 内部渲染
    },
    {
        key: 'software',
        label: '软件资源',
        content: null, // 由 ToolsContent 内部渲染
    },
    {
        key: 'others',
        label: '其他资源',
        content: (
            <div>
                <div className="alert alert--info" style={{marginBottom: 24}}>
                    <strong>提示：</strong> 这里收录杂七杂八的实用工具，包括开发辅助、数据分析、团队协作等资源。
                </div>
                {/* Docker 国内实时有效源卡片分组 */}
                <div style={{
                    marginTop: 32,
                    marginBottom: 32,
                    background: '#f6f8fa',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    padding: 24
                }}>
                    <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>Docker
                        国内实时有效源</h3>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
                        {dockerMirrorList.map(item => (
                            <div key={item.vendor} style={{
                                background: '#fff',
                                borderRadius: 8,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                padding: 20,
                                minWidth: 220,
                                flex: '1 1 220px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 8
                            }}>
                                <div style={{fontWeight: 700, fontSize: 16, color: '#3578e5'}}>{item.vendor}</div>
                                <a href={item.url} target="_blank" rel="noopener"
                                   style={{color: '#3578e5', textDecoration: 'none', fontSize: 14}}>{item.url}</a>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="os-table-note" style={{fontSize: 13, lineHeight: 1.7}}>
                    会根据实测不定时每日更新
                </div>
            </div>
        ),
    },
    {
        key: 'fonts',
        label: '字体资源',
        content: null, // 由 ToolsContent 内部渲染
    },
    {
        key: 'ui',
        label: 'UI资源',
        content: (
            <div>
                <div className="alert alert--info" style={{marginBottom: 24}}>
                    <strong>提示：</strong> 这里收录主流UI设计、图标、插画、图片等资源网站，助力开发者和设计师高效获取优质素材。
                </div>
                {/* UI资源卡片分组 */}
                <div style={{
                    marginTop: 32,
                    marginBottom: 32,
                    background: '#f6f8fa',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    padding: 24
                }}>
                    <h3 style={{
                        marginTop: 0,
                        marginBottom: 16,
                        fontWeight: 700,
                        fontSize: 22,
                        color: '#3578e5'
                    }}>UI/设计/图标/插画/图片资源</h3>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
                        {uiResourceList.map(item => (
                            <div key={item.url} style={{
                                background: '#fff',
                                borderRadius: 8,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                padding: 20,
                                minWidth: 220,
                                flex: '1 1 220px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 8
                            }}>
                                <div style={{fontWeight: 700, fontSize: 16, color: '#3578e5'}}>{item.name}</div>
                                <div className="force-black" style={{fontSize: 14, marginBottom: 4}}>{item.desc}</div>
                                <a href={item.url} target="_blank" rel="noopener"
                                   style={{color: '#3578e5', textDecoration: 'none', fontSize: 14}}>{item.url}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    {
        key: 'original',
        label: '原创资源',
        content: (
            <div>
                <div className="alert alert--info" style={{marginBottom: 24}}>
                    <strong>提示：</strong> 这里收录我个人原创的软件、工具、脚本等资源，都是经过实际项目验证的实用作品。
                </div>
                {/* 原创软件数据 */}
                {(() => {
                    const originalSoftware = [
                        {
                            name: 'MyBlog',
                            logo: '/img/MyBlog.png', 
                            desc: '基于 Docusaurus 构建的现代化个人博客应用',
                            downloads: {
                                android: 'https://gitee.com/JXX_CODE/MyBlog/releases/download/v1.0.0/myblog-1.0.0.apk',
                                ios: null,
                                harmonyos: null
                            }
                        }
                    ];

                    return (
                        <div style={{
                            marginTop: 32,
                            marginBottom: 32,
                            background: '#f6f8fa',
                            borderRadius: 12,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            padding: 24
                        }}>
                            <h3 style={{
                                marginTop: 0,
                                marginBottom: 16,
                                fontWeight: 700,
                                fontSize: 22,
                                color: '#3578e5'
                            }}>软件</h3>
                            <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
                                {originalSoftware.map((software, index) => (
                                    <div key={index} style={{
                                        background: '#fff',
                                        borderRadius: 8,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                        padding: 20,
                                        minWidth: 280,
                                        flex: '1 1 280px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 12
                                    }}>
                                        <div style={{fontWeight: 700, fontSize: 16, color: '#3578e5'}}>{software.name}</div>
                                        {software.logo && (
                                            <div style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 12,
                                                overflow: 'hidden',
                                                marginBottom: 8,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: '#f8f9fa',
                                                border: '1px solid #e9ecef'
                                            }}>
                                                <img 
                                                    src={software.logo} 
                                                    alt={`${software.name} logo`}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="force-black" style={{fontSize: 14, marginBottom: 8, textAlign: 'center'}}>{software.desc}</div>
                                        <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center'}}>
                                            <a 
                                                href={software.downloads.android} 
                                                target="_blank" 
                                                rel="noopener"
                                                style={{
                                                    padding: '6px 12px',
                                                    background: software.downloads.android ? '#3578e5' : '#ccc',
                                                    color: '#fff',
                                                    textDecoration: 'none',
                                                    borderRadius: 4,
                                                    fontSize: 12,
                                                    cursor: software.downloads.android ? 'pointer' : 'not-allowed',
                                                    opacity: software.downloads.android ? 1 : 0.6
                                                }}
                                                onClick={!software.downloads.android ? (e) => e.preventDefault() : undefined}
                                            >
                                                Android 下载
                                            </a>
                                            <a 
                                                href={software.downloads.ios} 
                                                target="_blank" 
                                                rel="noopener"
                                                style={{
                                                    padding: '6px 12px',
                                                    background: software.downloads.ios ? '#3578e5' : '#ccc',
                                                    color: '#fff',
                                                    textDecoration: 'none',
                                                    borderRadius: 4,
                                                    fontSize: 12,
                                                    cursor: software.downloads.ios ? 'pointer' : 'not-allowed',
                                                    opacity: software.downloads.ios ? 1 : 0.6
                                                }}
                                                onClick={!software.downloads.ios ? (e) => e.preventDefault() : undefined}
                                            >
                                                iOS 下载
                                            </a>
                                            <a 
                                                href={software.downloads.harmonyos} 
                                                target="_blank" 
                                                rel="noopener"
                                                style={{
                                                    padding: '6px 12px',
                                                    background: software.downloads.harmonyos ? '#3578e5' : '#ccc',
                                                    color: '#fff',
                                                    textDecoration: 'none',
                                                    borderRadius: 4,
                                                    fontSize: 12,
                                                    cursor: software.downloads.harmonyos ? 'pointer' : 'not-allowed',
                                                    opacity: software.downloads.harmonyos ? 1 : 0.6
                                                }}
                                                onClick={!software.downloads.harmonyos ? (e) => e.preventDefault() : undefined}
                                            >
                                                HarmonyOS NEXT 下载
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })()}
            </div>
        ),
    },
];

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        setIsMobile(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);
    return isMobile;
}

function ToolsContent({selected, setSelected}: { selected: string; setSelected: (key: string) => void }) {
    const {colorMode} = useColorMode();
    const [showSidebar, setShowSidebar] = useState(false);
    const isMobile = typeof window !== 'undefined' ? useIsMobile() : false;
    const current = categories.find(c => c.key === selected);

    // 自定义弹窗状态
    const [modal, setModal] = useState<null | { url: string; sys: string; expect: string; id?: string; type?: 'system' | 'link' | 'mobile-reminder' }>(null);

    // 切换tab时自动关闭侧边栏
    useEffect(() => {
        if (showSidebar) setShowSidebar(false);
        // eslint-disable-next-line
    }, [selected]);

    // Docusaurus navbar高度，默认60px
    const navbarHeight = 60;

    // 1. 增加复制成功状态
    const [copySuccess, setCopySuccess] = useState(false);

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                margin: 0,
                background: colorMode === 'dark' ? '#23272f' : '#fff',
                borderRadius: 0,
                boxShadow: 'none',
                position: 'relative',
            }}
        >
            {/* 移动端菜单按钮 */}
            {isMobile && !showSidebar && (
                <button
                    onClick={() => setShowSidebar(true)}
                    style={{
                        position: 'fixed',
                        top: navbarHeight + 16,
                        left: -20, // 只露半个圆
                        zIndex: 1051,
                        background: '#3578e5',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 22,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        cursor: 'pointer',
                        borderLeft: '2px solid #fff', // 增强半圆视觉
                        transition: 'left .2s',
                    }}
                    aria-label="打开菜单"
                >
                    <style>{`
                        @keyframes arrowMove {
                            0%, 100% { transform: translateX(4px) translateY(-1px); }
                            50% { transform: translateX(14px) translateY(-1px); }
                        }
                    `}</style>
                    <span style={{
                        display: 'block', 
                        lineHeight: 1, 
                        fontSize: 18, 
                        fontWeight: 600, 
                        animation: 'arrowMove 2s ease-in-out infinite'
                    }}>›</span>
                </button>
            )}
            {/* 侧边栏：桌面端始终显示，移动端抽屉显示 */}
            {(!isMobile || showSidebar) && (
                <nav
                    style={{
                        width: 180,
                        borderRight: '1px solid #eee',
                        padding: '2rem 0',
                        background: colorMode === 'dark' ? '#181a20' : '#fafbfc',
                        borderRadius: '12px 0 0 12px',
                        position: isMobile ? 'fixed' : 'static',
                        top: isMobile ? navbarHeight : 0,
                        left: 0,
                        height: isMobile ? `calc(100vh - ${navbarHeight}px)` : '100vh',
                        zIndex: 90,
                        boxShadow: isMobile ? '2px 0 16px rgba(0,0,0,0.15)' : 'none',
                        transition: 'transform .3s',
                        transform: isMobile && !showSidebar ? 'translateX(-100%)' : 'none',
                    }}
                >
                    {/* 移动端关闭按钮 */}
                    {isMobile && (
                        <button
                            onClick={() => setShowSidebar(false)}
                            style={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                background: 'none',
                                border: 'none',
                                fontSize: 22,
                                color: '#888',
                                cursor: 'pointer',
                            }}
                            aria-label="关闭菜单"
                        >
                            ×
                        </button>
                    )}
                    <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                        {categories.map(cat => (
                            <li key={cat.key}>
                                <button
                                    onClick={() => {
                                        setSelected(cat.key);
                                        if (isMobile) setShowSidebar(false);
                                    }}
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
            )}
            <main style={{flex: 1, padding: '2rem', width: '100%'}}>
                <h2 style={{marginTop: 0}}>{current?.label}</h2>
                {selected === 'software' ? (
                  <div>
                    {/* Office办公套件卡片分组（已存在） */}
                    <div style={{marginTop: 32, marginBottom: 32, background: '#f6f8fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24}}>
                      <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>Office 办公套件</h3>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
                        {officeList.map(item => (
                          <div key={item.gen + item.version + item.os} style={{
                              background: '#fff',
                              borderRadius: 8,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                              padding: 20,
                              minWidth: 220,
                              flex: '1 1 220px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 8
                          }}>
                              <div style={{fontWeight: 700, fontSize: 16, color: '#3578e5'}}>{item.gen} {item.version}</div>
                              <div style={{fontSize: 14}}>位数：{item.arch}</div>
                              <div style={{fontSize: 14}}>适配系统：{item.os}</div>
                              <div style={{fontSize: 14}}>维护状态：{item.status}</div>
                              <div style={{marginTop: 8}}>
                                  {item.download
                                      ? <a
                                          id={'office-download-' + item.gen + item.version + item.os}
                                          href={item.download}
                                          rel="noopener"
                                          style={{color: '#3578e5', textDecoration: 'none'}}
                                          onClick={e => {
                                            e.preventDefault();
                                            let sys = '';
                                            if (typeof window !== 'undefined') {
                                              const ua = window.navigator.userAgent;
                                              if (/Windows/i.test(ua)) sys = 'Windows';
                                              else if (/Macintosh|Mac OS X/i.test(ua)) sys = 'macOS';
                                              else if (/Linux/i.test(ua)) sys = 'Linux';
                                            }
                                            if (item.os && sys && item.os !== sys) {
                                              setModal({ url: item.download, sys, expect: item.os, id: 'office-download-' + item.gen + item.version + item.os, type: 'system' });
                                            } else {
                                              setModal({ url: item.download, sys, expect: item.os, id: 'office-download-' + item.gen + item.version + item.os, type: 'link' });
                                            }
                                          }}
                                      >下载</a>
                                      : <span style={{color: '#aaa'}}>本站暂未收录，请前往官网购买/下载</span>
                                  }
                              </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* JetBrains 全家桶卡片分组 */}
                    <div style={{marginTop: 32, marginBottom: 32, background: '#f6f8fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24}}>
                      <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>JetBrains 全家桶</h3>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
                        {jetbrainsList.map(item => (
                          <div key={item.url} style={{
                            background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 20, minWidth: 180, flex: '1 1 180px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
                          }}>
                            <a href={item.url} target="_blank" rel="noopener" style={{fontWeight: 700, fontSize: 16, color: '#3578e5', textDecoration: 'none', marginBottom: 4}}>{item.name}</a>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* 华为开发者工具卡片分组 */}
                    <div style={{marginTop: 32, marginBottom: 32, background: '#f6f8fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24}}>
                      <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>华为开发者工具</h3>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
                        {huaweiDevTools.map(tool => (
                          <div key={tool.name} style={{
                            background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 20, minWidth: 220, flex: '1 1 220px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
                          }}>
                            <a href={tool.url} target="_blank" rel="noopener" style={{fontWeight: 700, fontSize: 16, color: '#3578e5', textDecoration: 'none', marginBottom: 4}}>{tool.name}</a>
                            <div className="force-black" style={{fontSize: 14}}>{tool.desc}</div>
                            <div className="force-black" style={{fontSize: 13}}>{tool.os}</div>
                            <div style={{display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', minHeight: 0}}>
                              <a href={tool.winUrl || undefined} target="_blank" rel="noopener" style={{padding: '2px 12px', background: tool.winUrl ? '#3578e5' : '#ccc', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 13, height: 26, lineHeight: '22px', minWidth: 90, textAlign: 'center', pointerEvents: tool.winUrl ? 'auto' : 'none', opacity: tool.winUrl ? 1 : 0.6, border: 'none', margin: 0}}>Windows下载</a>
                              <a href={tool.macArmUrl || undefined} target="_blank" rel="noopener" style={{padding: '2px 12px', background: tool.macArmUrl ? '#3578e5' : '#ccc', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 13, height: 26, lineHeight: '22px', minWidth: 100, textAlign: 'center', pointerEvents: tool.macArmUrl ? 'auto' : 'none', opacity: tool.macArmUrl ? 1 : 0.6, border: 'none', margin: 0}}>macOS Arm下载</a>
                              <a href={tool.macX64Url || undefined} target="_blank" rel="noopener" style={{padding: '2px 12px', background: tool.macX64Url ? '#3578e5' : '#ccc', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 13, height: 26, lineHeight: '22px', minWidth: 100, textAlign: 'center', pointerEvents: tool.macX64Url ? 'auto' : 'none', opacity: tool.macX64Url ? 1 : 0.6, border: 'none', margin: 0}}>macOS x64下载</a>
                              <a href={tool.linuxUrl || undefined} target="_blank" rel="noopener" style={{padding: '2px 12px', background: tool.linuxUrl ? '#3578e5' : '#ccc', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 13, height: 26, lineHeight: '22px', minWidth: 90, textAlign: 'center', pointerEvents: tool.linuxUrl ? 'auto' : 'none', opacity: tool.linuxUrl ? 1 : 0.6, border: 'none', margin: 0}}>Linux下载</a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* 微信开发者工具卡片分组 */}
                    <div style={{marginTop: 32, marginBottom: 32, background: '#f6f8fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24}}>
                      <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>微信开发者工具</h3>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
                        {wechatDevTools.map(tool => (
                          <div key={tool.name} style={{
                            background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 20, minWidth: 220, flex: '1 1 220px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8
                          }}>
                            <a href={tool.url} target="_blank" rel="noopener" style={{fontWeight: 700, fontSize: 16, color: '#3578e5', textDecoration: 'none', marginBottom: 4}}>{tool.name}</a>
                            <div className="force-black" style={{fontSize: 14}}>{tool.desc}</div>
                            <div className="force-black" style={{fontSize: 13}}>{tool.os}</div>
                            <div style={{display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', minHeight: 0}}>
                              <a href={tool.win32Url || undefined} target="_blank" rel="noopener" style={{padding: '2px 12px', background: tool.win32Url ? '#3578e5' : '#ccc', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 13, height: 26, lineHeight: '22px', minWidth: 90, textAlign: 'center', pointerEvents: tool.win32Url ? 'auto' : 'none', opacity: tool.win32Url ? 1 : 0.6, border: 'none', margin: 0}}>Windows 32下载</a>
                              <a href={tool.win64Url || undefined} target="_blank" rel="noopener" style={{padding: '2px 12px', background: tool.win64Url ? '#3578e5' : '#ccc', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 13, height: 26, lineHeight: '22px', minWidth: 90, textAlign: 'center', pointerEvents: tool.win64Url ? 'auto' : 'none', opacity: tool.win64Url ? 1 : 0.6, border: 'none', margin: 0}}>Windows 64下载</a>
                              <a href={tool.macArmUrl || undefined} target="_blank" rel="noopener" style={{padding: '2px 12px', background: tool.macArmUrl ? '#3578e5' : '#ccc', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 13, height: 26, lineHeight: '22px', minWidth: 100, textAlign: 'center', pointerEvents: tool.macArmUrl ? 'auto' : 'none', opacity: tool.macArmUrl ? 1 : 0.6, border: 'none', margin: 0}}>macOS Arm下载</a>
                              <a href={tool.macX64Url || undefined} target="_blank" rel="noopener" style={{padding: '2px 12px', background: tool.macX64Url ? '#3578e5' : '#ccc', color: '#fff', borderRadius: 4, textDecoration: 'none', fontSize: 13, height: 26, lineHeight: '22px', minWidth: 100, textAlign: 'center', pointerEvents: tool.macX64Url ? 'auto' : 'none', opacity: tool.macX64Url ? 1 : 0.6, border: 'none', margin: 0}}>macOS x64下载</a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ) : selected === 'os' ? (
                  <>
                    <div className="alert alert--info" style={{marginBottom: 1}}>
                      <strong>提示：</strong> 本区收录主流操作系统的官方下载与第三方下载资源，涵盖<strong> Windows、Windows
                      Server、macOS、Linux </strong>等，方便用户快速获取各系统镜像。部分老旧系统仅提供第三方下载，建议优先选择官方渠道或权威资源。下载Windows
                      Server的用户请提前安装迅雷，下载链接将使用迅雷进行下载。
                    </div>
                    <div className="alert alert--warning" style={{marginTop: 1, marginBottom: 24}}>
                      <strong>提示：</strong> 本站提供的系统镜像均为原版非激活系统镜像，且未经人为修改，请勿用于非法用途。
                    </div>
                    {/* Windows 卡片分组 */}
                    <div style={{
                      marginTop: 32,
                      marginBottom: 32,
                      background: '#f6f8fa',
                      borderRadius: 12,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      padding: 24
                    }}>
                      <h3 style={{
                        marginTop: 0,
                        marginBottom: 16,
                        fontWeight: 700,
                        fontSize: 22,
                        color: '#3578e5'
                      }}>Windows</h3>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
                        {windowsList.map(item => (
                          <div key={item.version} style={{
                            background: '#fff',
                            borderRadius: 8,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            padding: 20,
                            minWidth: 260,
                            flex: '1 1 260px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8
                          }}>
                            <div style={{fontWeight: 700, fontSize: 18, color: '#3578e5'}}>{item.version}</div>
                            <div style={{fontSize: 14}}>维护状态：{item.status}</div>
                            <div style={{fontSize: 14}}>最后更新时间：{item.lastUpdate}</div>
                            <div style={{marginTop: 8, display: 'flex', gap: 12, alignItems: 'center'}}>
                              {item.officialDown
                                ? <a href={item.official} target="_blank" rel="noopener"
                                     style={{color: '#3578e5', textDecoration: 'none'}}>官方下载</a>
                                : <span style={{color: '#aaa'}}>已下架</span>
                              }
                              <span style={{color: '#bbb'}}>|</span>
                              {isMobile ? (
                                <a
                                  href={item.third}
                                  rel="noopener"
                                  style={{color: '#3578e5', textDecoration: 'none'}}
                                  onClick={e => {
                                    e.preventDefault();
                                    setModal({ url: item.third, sys: '', expect: '', id: 'windows-download-' + item.version, type: 'link' });
                                  }}
                                >迅雷下载</a>
                              ) : (
                                <a href={item.third} target="_blank" rel="noopener"
                                   style={{color: '#3578e5', textDecoration: 'none'}}>迅雷下载</a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="os-table-note" style={{fontSize: 13, lineHeight: 1.7, marginTop: 20}}>
                        "最后更新时间"字段：若官方已停止维护，则为第三方资源的最后更新日期；若官方仍在维护，则为官方的最后更新时间。<br/>
                      </div>
                    </div>
                    {/* macOS 卡片分组 */}
                    <div style={{
                      marginTop: 32,
                      marginBottom: 32,
                      background: '#f6f8fa',
                      borderRadius: 12,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      padding: 24
                    }}>
                      <h3 style={{
                        marginTop: 0,
                        marginBottom: 16,
                        fontWeight: 700,
                        fontSize: 22,
                        color: '#3578e5'
                      }}>macOS</h3>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
                        {macosList.map(item => (
                          <div key={item.name} style={{
                            background: '#fff',
                            borderRadius: 8,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            padding: 20,
                            minWidth: 260,
                            flex: '1 1 260px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8
                          }}>
                            <div style={{fontWeight: 700, fontSize: 18, color: '#3578e5'}}>{item.name}</div>
                            <div style={{fontSize: 14}}>发布时间：{item.releaseDate}</div>
                            <div style={{fontSize: 14}}>最新版本：{item.latestVersion}</div>
                            <div style={{fontSize: 14}}>芯片要求：{item.chip}</div>
                            {item.remark && <div className="force-black" style={{fontSize: 14}}>备注：{item.remark}</div>}
                            <div style={{marginTop: 8}}>
                              <a href={item.download} target="_blank" rel="noopener"
                                 style={{color: '#3578e5', textDecoration: 'none'}}>下载</a>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="os-table-note" style={{fontSize: 13, lineHeight: 1.7, marginTop: 20}}>
                        系统镜像下载来源：sysin.org
                      </div>
                    </div>
                    {/* Linux 卡片分组 */}
                    <div style={{
                      marginTop: 32,
                      marginBottom: 32,
                      background: '#f6f8fa',
                      borderRadius: 12,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      padding: 24
                    }}>
                      <h3 style={{
                        marginTop: 0,
                        marginBottom: 16,
                        fontWeight: 700,
                        fontSize: 22,
                        color: '#3578e5'
                      }}>Linux</h3>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
                        {linuxList.map(item => (
                          <div key={item.url} style={{
                            background: '#fff',
                            borderRadius: 8,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            padding: 20,
                            minWidth: 220,
                            flex: '1 1 220px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                            alignItems: 'center'
                          }}>
                            <a href={item.url} target="_blank" rel="noopener" style={{
                              fontWeight: 700,
                              fontSize: 16,
                              color: '#3578e5',
                              textDecoration: 'none',
                              marginBottom: 4
                            }}>{item.name}</a>
                          </div>
                        ))}
                      </div>
                      <div className="os-table-note" style={{fontSize: 13, lineHeight: 1.7, marginTop: 20}}>
                        由于 Linux 发行版本众多，这里只展示一些。
                      </div>
                    </div>
                    {/* Windows Server 卡片分组 */}
                    <div style={{
                      marginTop: 32,
                      marginBottom: 32,
                      background: '#f6f8fa',
                      borderRadius: 12,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      padding: 24
                    }}>
                      <h3 style={{marginTop: 0, marginBottom: 16, fontWeight: 700, fontSize: 22, color: '#3578e5'}}>Windows Server</h3>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: 24}}>
                        {windowsServerList.map(item => (
                          <div key={item.name + item.version + item.arch} style={{
                            background: '#fff',
                            borderRadius: 8,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            padding: 20,
                            minWidth: 260,
                            flex: '1 1 260px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8
                          }}>
                            <div style={{fontWeight: 700, fontSize: 18, color: '#3578e5'}}>{item.name}</div>
                            <div style={{fontSize: 14}}>发布时间：{item.releaseDate}</div>
                            <div style={{fontSize: 14}}>版本：{item.version}</div>
                            <div style={{fontSize: 14}}>位数：{item.arch}</div>
                            <div style={{fontSize: 14}}>维护状态：{item.status}</div>
                            <div style={{marginTop: 8}}>
                              {item.download
                                ? <a
                                    id={'server-download-' + item.name + item.version + item.arch}
                                    href={item.download}
                                    rel="noopener"
                                    style={{color: '#3578e5', textDecoration: 'none'}}
                                    onClick={e => {
                                      e.preventDefault();
                                      setModal({ url: item.download, sys: '', expect: '', id: 'server-download-' + item.name + item.version + item.arch, type: 'link' });
                                    }}
                                  >下载</a>
                                : <span style={{color: '#aaa'}}>本站暂未收录</span>
                              }
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{fontSize: 13, lineHeight: 1.7, marginTop: 20}}>
                        为了提高维护的效率，本站不提供Windows Server的官方下载直链，仅提供第三方资源。<br/>
                        "维护状态"代表微软官方的支持状态，该状态本站可能更新不及时，仅供参考。<br/>
                        系统镜像来源于MSDN，下载链接直链到MSDN相应的链接。若遇到下载失败，可能是删除了该资源。
                      </div>
                    </div>
                  </>
                ) : selected === 'fonts' ? <FontsPanel isMobile={isMobile} setModal={setModal} /> : current?.content}
                {/* 弹窗 */}
                {modal && (
                  <div style={{
                    position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh',
                    background: 'rgba(0,0,0,0.35)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <div style={{
                      background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, boxShadow: '0 4px 24px rgba(0,0,0,0.15)', textAlign: 'center'
                    }}>
                      {modal.type === 'system' ? (
                        <>
                          <div style={{fontSize: 22, fontWeight: 600, marginBottom: 16, fontFamily: 'Alibaba Dongfangdakai Regular, serif'}}>
                            版本选择提醒
                          </div>
                          <div style={{fontSize: 18, marginBottom: 24, fontFamily: 'Alimama FangYuanTiVF Thin, serif'}}>
                            检测到您当前系统为 <b>{modal.sys}</b>，而该 Office 套件适合 <b>{modal.expect}</b>。<br/>
                            确定要继续下载吗？
                          </div>
                          <div style={{display: 'flex', justifyContent: 'center', gap: 24}}>
                            <button
                              style={{padding: '8px 24px', background: '#3578e5', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer'}}
                              onClick={() => setModal(modal && { ...modal, type: 'link' })}
                            >确定</button>
                            <button
                              style={{padding: '8px 24px', background: '#eee', color: '#333', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer'}}
                              onClick={() => setModal(null)}
                            >取消</button>
                          </div>
                        </>
                      ) : modal.type === 'mobile-reminder' ? (
                        <>
                          <div style={{fontSize: 22, fontWeight: 600, marginBottom: 16, fontFamily: 'Alibaba Dongfangdakai Regular, serif'}}>
                            下载提醒
                          </div>
                          <div style={{fontSize: 18, marginBottom: 24, fontFamily: 'Alimama FangYuanTiVF Thin, serif'}}>
                            检测到您正在使用移动端设备。<br/>
                            为了更好的下载体验，建议您移步至网页端下载。
                          </div>
                          <div style={{display: 'flex', justifyContent: 'center', gap: 24}}>
                            <button
                              style={{padding: '8px 24px', background: '#3578e5', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer'}}
                              onClick={() => setModal(null)}
                            >知道了</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{fontSize: 22, fontWeight: 600, marginBottom: 16, fontFamily: 'Alibaba Dongfangdakai Regular, serif'}}>
                            下载链接
                          </div>
                          <div style={{fontSize: 18, marginBottom: 16, color: '#d46b08', fontFamily: 'Alimama FangYuanTiVF Thin, serif'}}>
                            建议使用 <b>迅雷</b> 或 <b>电驴</b> 等下载工具打开下方链接。<br/>
                            如浏览器无法识别，请手动复制到下载工具中。
                          </div>
                          <input
                            value={modal.url}
                            readOnly
                            style={{width: '100%', fontSize: 14, fontFamily: 'DingTalk JinBuTi Regular, serif', padding: 8, marginBottom: 16, border: '1px solid #eee', borderRadius: 6}}
                            onFocus={e => e.target.select()}
                          />
                          <div style={{display: 'flex', justifyContent: 'center', gap: 24}}>
                            <button
                              style={{padding: '8px 24px', background: '#3578e5', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer'}}
                              onClick={() => {
                                navigator.clipboard.writeText(modal.url);
                                setCopySuccess(true);
                                setTimeout(() => setCopySuccess(false), 2000);
                              }}
                            >复制链接</button>
                            {copySuccess && <div style={{color: '#52c41a', marginTop: 8, fontSize: 15}}>复制成功！</div>}
                            <button
                              style={{padding: '8px 24px', background: '#eee', color: '#333', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer'}}
                              onClick={() => setModal(null)}
                            >关闭</button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
            </main>
        </div>
    );
}

export default function Tools() {
    const location = useLocation();
    const history = useHistory();

    // 读取 tab 参数
    const params = new URLSearchParams(location.search);
    const initialTab = params.get('tab') || 'mirrors';

    const [selected, setSelected] = useState(initialTab);

    // 切换 tab 时，更新 URL
    const handleSetSelected = (key: string) => {
        setSelected(key);
        const newParams = new URLSearchParams(location.search);
        newParams.set('tab', key);
        history.replace({search: newParams.toString()});
    };

    return (
        <Layout title="工具库" description="常用镜像源、开发工具、教程网站等资源大全">
            <style>{`
              @font-face {
                font-family: 'Alibaba Dongfangdakai Regular';
                src: url('/fonts/Alibaba/AlimamaDongFangDaKai-Regular.ttf') format('truetype');
                font-display: swap;
              }
              @font-face {
                font-family: 'Alimama FangYuanTiVF Thin';
                src: url('/fonts/Alibaba/AlimamaFangYuanTiVF-Thin.ttf') format('truetype');
                font-display: swap;
              }
              @font-face {
                font-family: 'DingTalk JinBuTi Regular';
                src: url('/fonts/Alibaba/DingTalkJinBuTi-Regular.ttf') format('truetype');
                font-display: swap;
              }
            `}</style>
            <ToolsContent selected={selected} setSelected={handleSetSelected}/>
        </Layout>
    );
}
