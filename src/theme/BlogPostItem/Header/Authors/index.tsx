import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostItemHeaderAuthors(): React.ReactElement | null {
  const {
    metadata: {authors},
  } = useBlogPost();
  if (!authors || authors.length === 0) return null;
  return (
    <div>
      {authors.map((author, idx) => {
        const github = author.url && author.url.includes('github.com') ? author.url : null;
        return (
          <span key={author.name || idx}>
            {github ? (
              <a href={github} target="_blank" rel="noopener noreferrer">{author.name}</a>
            ) : (
              author.name
            )}
            {idx !== authors.length - 1 && ', '}
          </span>
        );
      })}
    </div>
  );
}
