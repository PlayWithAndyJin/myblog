export interface Project {
  title: string;
  date: string;
  description: string;
  link: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: 'Modern Blog',
    date: '2025-07-10',
    description: '一个自己DIY的博客网站',
    link: 'https://github.com/PlayWithAndyJin/MordenBlog',
    tags: ['Docusaurus', 'React', 'TypeScript', 'Vercel']
  },
  {
    title: 'PushToMeow',
    date: '2025-07-11',
    description: '一个基于专为 HarmonyOS 5+ 用户设计的智能推送服务Meow的DIY工具。',
    link: 'https://github.com/PlayWithAndyJin/PushToMeow',
    tags: ['HarmonyOS', 'API', 'Push', 'DIY']
  },
  {
    title: 'jxlang',
    date: '2024-11-20',
    description: '一个轻量级的自定义编程语言，专为简单性和交互式脚本设计而打造。',
    link: 'https://github.com/PlayWithAndyJin/jxlang',
    tags: ['Python', 'Programming Language', 'REPL']
  },
  {
    title: 'EasyEducationalAdministrationManagementSystem',
    date: '2023-09-05',
    description: '一个基于 Flask + Jinja2 +正方软件的现代化教务系统 Web 应用。',
    link: 'https://github.com/PlayWithAndyJin/EasyEducationalAdministrationManagementSystem',
    tags: ['Flask', 'Jinja2', 'Web', 'Python']
  },
  {
    title: 'EasyProjectsManagementSystem',
    date: '2023-06-15',
    description: '一个多功能 Web 管理平台，简化项目管理、文件共享和协作流程。',
    link: 'https://github.com/PlayWithAndyJin/EasyProjectsManagementSystem',
    tags: ['Web', 'Project Management', 'File Sharing']
  }
]; 