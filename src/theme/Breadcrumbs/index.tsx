import React from 'react';
import DefaultBreadcrumbs from '@theme-original/Breadcrumbs';

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
}

export default function Breadcrumbs(props: any) {
  return <DefaultBreadcrumbs {...props} />;
} 