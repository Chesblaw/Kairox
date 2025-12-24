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
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  Briefcase,
  Calendar,
  Zap,
  Star,
  Eye,
  BookmarkPlus,
} from 'lucide-react';
import Link from 'next/link';

const jobCategories = [
  { name: 'Development & IT', count: 2847, icon: '💻' },
  { name: 'Design & Creative', count: 1562, icon: '🎨' },
  { name: 'AI & Machine Learning', count: 893, icon: '🤖' },
  { name: 'Marketing & Sales', count: 1247, icon: '📈' },
  { name: 'Blockchain & Web3', count: 567, icon: '⛓️' },
  { name: 'Writing & Content', count: 834, icon: '✏️' },
  { name: 'Business & Finance', count: 492, icon: '💼' },
  { name: 'Data & Analytics', count: 378, icon: '📊' },
];

const featuredJobs = [
  {
    id: 1,
    title: 'Senior React Developer for DeFi Platform',
    company: 'CryptoFlow Labs',
    companyLogo: null,
    location: 'Remote',
    postedTime: '2 hours ago',
    budget: '$5,000 - $8,000',
    budgetType: 'Fixed Price',
    duration: '1-3 months',
    experienceLevel: 'Expert',
    description:
      "We're looking for an experienced React developer to build the frontend for our new DeFi platform on Starknet. You'll work with our team to create intuitive interfaces for complex financial products.",
    skills: ['React', 'TypeScript', 'Web3', 'DeFi', 'Starknet'],
    applicants: 12,
    views: 156,
    featured: true,
    urgent: false,
    verified: true,
  },
  {
    id: 2,
    title: 'UI/UX Designer for Web3 Gaming Platform',
    company: 'GameChain Studios',
    companyLogo: null,
    location: 'Remote',
    postedTime: '4 hours ago',
    budget: '$3,500 - $5,500',
    budgetType: 'Fixed Price',
    duration: '2-4 weeks',
    experienceLevel: 'Intermediate',
    description:
      'Design engaging user interfaces for our blockchain-based gaming platform. Experience with gaming UX and understanding of Web3 concepts preferred.',
    skills: ['UI/UX Design', 'Figma', 'Gaming', 'Web3', 'Prototyping'],
    applicants: 8,
    views: 89,
    featured: false,
    urgent: true,
    verified: true,
  },
  {
    id: 3,
    title: 'Smart Contract Developer - Cairo/Starknet',
    company: 'DeFi Innovations',
    companyLogo: null,
    location: 'Remote',
    postedTime: '6 hours ago',
    budget: '$80 - $120',
    budgetType: 'Hourly',
    duration: '3-6 months',
    experienceLevel: 'Expert',
    description:
      'Develop and audit smart contracts for our lending protocol on Starknet. Must have extensive experience with Cairo and understanding of DeFi protocols.',
    skills: ['Cairo', 'Smart Contracts', 'Starknet', 'DeFi', 'Security'],
    applicants: 5,
    views: 67,
    featured: true,
    urgent: false,
    verified: true,
  },
  {
    id: 4,
    title: 'Content Writer - Blockchain & Web3',
    company: 'Crypto Media Hub',
    companyLogo: null,
    location: 'Remote',
    postedTime: '1 day ago',
    budget: '$2,000 - $3,000',
    budgetType: 'Fixed Price',
    duration: '1-2 months',
    experienceLevel: 'Intermediate',
    description:
      'Create engaging content about blockchain technology, DeFi, and Web3 for our publication. Strong understanding of the crypto space required.',
    skills: [
      'Content Writing',
      'Blockchain',
      'SEO',
      'Research',
      'Technical Writing',
    ],
    applicants: 23,
    views: 234,
    featured: false,
    urgent: false,
    verified: false,
  },
  {
    id: 5,
    title: 'Full-Stack Developer - NFT Marketplace',
    company: 'ArtChain',
    companyLogo: null,
    location: 'Remote',
    postedTime: '2 days ago',
    budget: '$6,000 - $10,000',
    budgetType: 'Fixed Price',
    duration: '2-3 months',
    experienceLevel: 'Expert',
    description:
      'Build a comprehensive NFT marketplace with advanced features like auctions, royalties, and collection management. Experience with IPFS and metadata standards required.',
    skills: ['React', 'Node.js', 'MongoDB', 'IPFS', 'NFTs'],
    applicants: 31,
    views: 289,
    featured: true,
    urgent: false,
    verified: true,
  },
];

const filters = [
  'All Categories',
  'Development & IT',
  'Design & Creative',
  'AI & Machine Learning',
  'Marketing & Sales',
  'Blockchain & Web3',
];

export default function JobsPage() {
  return (
    <PageLayout>
      {/* Header */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Next{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Web3 Project
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover opportunities from startups to Fortune 500 companies
              building the future
            </p>

            {/* Search Bar */}
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search for jobs, skills, or companies..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {jobCategories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <h3 className="font-semibold mb-3">Experience Level</h3>
                  <div className="space-y-2">
                    {['Entry Level', 'Intermediate', 'Expert'].map(
                      (level, index) => (
                        <label
                          key={index}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{level}</span>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                {/* Budget Type */}
                <div>
                  <h3 className="font-semibold mb-3">Budget Type</h3>
                  <div className="space-y-2">
                    {['Hourly', 'Fixed Price'].map((type, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="budget-type"
                          className="rounded"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h3 className="font-semibold mb-3">Project Duration</h3>
                  <div className="space-y-2">
                    {[
                      'Less than 1 month',
                      '1-3 months',
                      '3-6 months',
                      'More than 6 months',
                    ].map((duration, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort and View Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  Showing <strong>1,247</strong> jobs
                </span>
                <div className="flex gap-2">
                  {filters.slice(0, 4).map((filter, index) => (
                    <Badge
                      key={index}
                      variant={index === 0 ? 'default' : 'outline'}
                      className="cursor-pointer"
                    >
                      {filter}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="border border-border rounded-lg px-3 py-1 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>Most Recent</option>
                  <option>Highest Budget</option>
                  <option>Most Relevant</option>
                  <option>Fewest Applicants</option>
                </select>
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-6">
              {featuredJobs.map((job) => (
                <Card
                  key={job.id}
                  className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${job.featured ? 'border-primary/30 bg-primary/5' : ''}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {job.featured && (
                            <Badge className="bg-gradient-to-r from-primary to-secondary text-xs">
                              Featured
                            </Badge>
                          )}
                          {job.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                          {job.verified && (
                            <Badge variant="outline" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Verified Client
                            </Badge>
                          )}
                        </div>

                        <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                          {job.title}
                        </CardTitle>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.postedTime}
                          </div>
                        </div>

                        <CardDescription className="mb-4 line-clamp-2">
                          {job.description}
                        </CardDescription>

                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="ml-6 text-right">
                        <div className="font-bold text-lg text-primary mb-1">
                          {job.budget}
                        </div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {job.budgetType}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {job.experienceLevel}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {job.applicants} applicants
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {job.views} views
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {job.duration}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <BookmarkPlus className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-primary to-secondary"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="text-center py-16 px-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl mt-16">
          <h2 className="text-3xl font-bold mb-4">
            Can&apos;t Find the Perfect Job?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Set up job alerts and get notified when opportunities matching your
            skills become available
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/job-alerts">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary"
              >
                <Zap className="h-4 w-4 mr-2" />
                Create Job Alert
              </Button>
            </Link>
            <Link href="/talent-profile">
              <Button size="lg" variant="outline">
                Complete Your Profile
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
