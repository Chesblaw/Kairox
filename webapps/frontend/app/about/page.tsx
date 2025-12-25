import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/layout/page-layout';
import { pageMetadata } from '@/lib/metadata';
import {
  Users,
  Target,
  Zap,
  Shield,
  Globe,
  Heart,
  ArrowRight,
  Award,
  TrendingUp,
  LinkedinIcon,
  TwitterIcon,
  GithubIcon,
} from 'lucide-react';
import Link from 'next/link';

export const metadata = pageMetadata.about;
import Image from 'next/image';

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description:
      'Smart contracts ensure fair payments and transparent transactions for all users.',
  },
  {
    icon: Globe,
    title: 'Global Accessibility',
    description:
      'Connecting talent and opportunities worldwide without geographical barriers.',
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description:
      'Pioneering the future of work with cutting-edge Web3 technology and tools.',
  },
  {
    icon: Heart,
    title: 'Community Driven',
    description:
      'Building a supportive ecosystem where freelancers and clients thrive together.',
  },
];

const team = [
  {
    name: 'Dawit Abebe',
    role: 'CEO & Founder',
    background:
      'Visionary Software Developer with 5+ years of experience building scalable applications and leading Web3 innovation. Passionate about creating decentralized solutions that empower global talent.',
    image: '/assets/images/me.webp',
  },
  {
    name: 'Samuel John',
    role: 'CTO & Backend Engineer',
    background:
      'Expert Backend Developer with 3+ years of experience architecting robust systems and blockchain infrastructure. Specializes in scalable backend solutions and smart contract integration.',
    image: '/assets/images/olufunbi.jpg',
  },
];

const stats = [
  {
    number: '10K+',
    label: 'Active Users',
    description: 'Freelancers and clients building the future',
  },
  {
    number: '$2M+',
    label: 'Paid Out',
    description: 'Total earnings by our community',
  },
  {
    number: '98.7%',
    label: 'Success Rate',
    description: 'Projects completed successfully',
  },
  {
    number: '150+',
    label: 'Countries',
    description: 'Global reach across continents',
  },
];

const milestones = [
  {
    year: '2023',
    title: 'Kairox Founded',
    description:
      'Started with a vision to revolutionize freelancing with Web3 technology',
  },
  {
    year: '2024 Q1',
    title: 'MVP Launch',
    description:
      'Released our first version with basic smart contract functionality',
  },
  {
    year: '2024 Q2',
    title: 'Community Growth',
    description:
      'Reached 1,000 active users and processed first $100K in payments',
  },
  {
    year: '2024 Q3',
    title: 'Starknet Integration',
    description:
      'Full integration with Starknet for scalable and cost-effective transactions',
  },
  {
    year: '2024 Q4',
    title: 'Advanced Features',
    description:
      'Launched AI matching, reputation NFTs, and governance features',
  },
  {
    year: '2025',
    title: 'Global Expansion',
    description: 'Scaling to serve the global Web3 workforce',
  },
];

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 px-6 border-b border-border/40">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Building the Future of{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Decentralized Work
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Kairox is revolutionizing the freelance economy by creating a
            trustless, transparent, and efficient marketplace powered by
            blockchain technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary"
            >
              <Users className="h-5 w-5 mr-2" />
              Join Our Mission
            </Button>
            <Button size="lg" variant="outline">
              <TrendingUp className="h-5 w-5 mr-2" />
              View Our Progress
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                To democratize access to global opportunities by creating a
                trustless marketplace where talent and clients can collaborate
                without intermediaries, ensuring fair compensation and
                transparent transactions.
              </p>

              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-secondary" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                A world where geographical boundaries don&apos;t limit
                opportunities, where reputation is verifiable and portable, and
                where the future of work is decentralized, fair, and accessible
                to everyone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-border/50">
                  <CardHeader className="pb-2">
                    <div className="text-3xl font-bold text-primary">
                      {stat.number}
                    </div>
                    <CardTitle className="text-lg">{stat.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 border-border/50"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 px-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us in Building the Future
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a talented freelancer or a company looking for
            top-tier expertise, be part of the decentralized work revolution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=freelancer">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary"
              >
                <Users className="h-4 w-4 mr-2" />
                Start as Freelancer
              </Button>
            </Link>
            <Link href="/signup?role=client">
              <Button size="lg" variant="outline">
                <ArrowRight className="h-4 w-4 mr-2" />
                Hire Top Talent
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
