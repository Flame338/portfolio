import { profile } from '../data/portfolio.ts';
import type { ProjectRecord } from './projectModel.ts';

export function personJsonLd(home: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: home,
    email: profile.email,
    jobTitle: 'Intermediate Software Engineer',
    worksFor: { '@type': 'Organization', name: 'Equifax' },
    address: { '@type': 'PostalAddress', addressLocality: 'Thiruvananthapuram', addressCountry: 'IN' },
    alumniOf: 'Mar Baselios College of Engineering and Technology',
    sameAs: profile.sameAs,
  };
}

export function projectJsonLd(project: ProjectRecord, url: string, home: string) {
  const { data, meta } = project;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: data.title,
    description: data.summary,
    url,
    programmingLanguage: data.language,
    author: { '@type': 'Person', name: profile.name, url: home },
    ...(data.source ? { codeRepository: data.source } : {}),
    ...(meta.lastCommit ? { dateModified: meta.lastCommit.toISOString() } : {}),
  };
}
