import type { Metadata } from 'next';

interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
}

export function generatePageMetadata(page: PageMetadata): Metadata {
  const baseUrl = 'https://kairox.dev'; // Update to your actual domain
  const defaultTitle = 'Kairox | Decentralized Web3 Job Marketplace';
  const defaultDescription =
    'Connect recruiters, companies, and freelancers on Starknet. Secure smart contract payments, on-chain reputation, and AI-driven job matching.';

  const title = page.title ? `${page.title} | Kairox` : defaultTitle;
  const description = page.description || defaultDescription;
  const url = page.path ? `${baseUrl}${page.path}` : baseUrl;
  const imageUrl = page.image || '/api/og-image';

  return {
    title,
    description,
    keywords:
      page.keywords?.join(', ') ||
      'web3, blockchain, jobs, freelance, starknet, smart contracts, decentralized',
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Kairox',
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@cybermaxi7',
      site: '@Kairox',
    },
    alternates: {
      canonical: url,
    },
  };
}

// Pre-defined metadata for common pages
export const pageMetadata = {
  home: generatePageMetadata({
    title: 'The Future of Decentralized Work',
    description:
      'Join the Web3 revolution! Connect with top talent and exciting projects on Starknet. Secure payments, on-chain reputation, and AI-powered matching.',
    keywords: [
      'web3 jobs',
      'starknet',
      'decentralized work',
      'blockchain freelance',
      'smart contracts',
    ],
    path: '/',
  }),

  about: generatePageMetadata({
    title: 'About Us - Building the Future of Work',
    description:
      'Meet the Kairox team revolutionizing freelance work with Web3 technology. Founded by Moses Agbe and Olufunbi Ibrahim.',
    keywords: [
      'about kairox',
      'web3 team',
      'blockchain founders',
      'decentralized work mission',
    ],
    path: '/about',
  }),

  jobs: generatePageMetadata({
    title: 'Browse Web3 Jobs & Projects',
    description:
      'Discover amazing Web3 projects and freelance opportunities on Starknet. From smart contract development to DeFi protocols.',
    keywords: [
      'web3 jobs',
      'blockchain projects',
      'starknet jobs',
      'crypto freelance',
      'defi jobs',
    ],
    path: '/jobs',
  }),

  explore: generatePageMetadata({
    title: 'Explore Top Web3 Talent',
    description:
      'Find skilled Web3 developers, designers, and specialists. Browse portfolios and hire the best talent for your Starknet projects.',
    keywords: [
      'web3 talent',
      'blockchain developers',
      'starknet developers',
      'crypto freelancers',
    ],
    path: '/explore',
  }),

  login: generatePageMetadata({
    title: 'Sign In to Your Account',
    description:
      'Access your Kairox dashboard. Manage projects, applications, and payments on the decentralized job marketplace.',
    keywords: ['kairox login', 'web3 login', 'blockchain job platform'],
    path: '/login',
  }),

  signup: generatePageMetadata({
    title: 'Join the Web3 Revolution',
    description:
      "Create your Kairox account today. Whether you're a freelancer or recruiter, start building the future of work.",
    keywords: [
      'kairox signup',
      'web3 registration',
      'join blockchain platform',
    ],
    path: '/signup',
  }),
};
