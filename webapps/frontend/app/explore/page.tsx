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
  Code,
  Palette,
  PenTool,
  TrendingUp,
  Brain,
  Globe,
  Shield,
  Search,
  Filter,
  Star,
  Users,
  Award,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const talentCategories = [
  {
    icon: Code,
    title: 'Development & IT',
    count: '12,450+',
    rating: '4.9',
    description: 'Web developers, mobile app creators, DevOps engineers',
    skills: ['React', 'Python', 'Node.js', 'Smart Contracts'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    count: '3,280+',
    rating: '4.8',
    description: 'AI specialists, data scientists, ML engineers',
    skills: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Palette,
    title: 'Design & Creative',
    count: '8,750+',
    rating: '4.9',
    description: 'UI/UX designers, graphic artists, brand creators',
    skills: ['Figma', 'Adobe Suite', 'Branding', '3D Design'],
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: TrendingUp,
    title: 'Marketing & Sales',
    count: '6,890+',
    rating: '4.7',
    description: 'Digital marketers, growth hackers, sales experts',
    skills: ['SEO', 'Content Marketing', 'Growth Hacking', 'Analytics'],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: PenTool,
    title: 'Writing & Content',
    count: '5,420+',
    rating: '4.8',
    description: 'Content writers, copywriters, technical writers',
    skills: ['Technical Writing', 'Content Strategy', 'Copywriting', 'Editing'],
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Shield,
    title: 'Blockchain & Web3',
    count: '2,150+',
    rating: '4.9',
    description: 'Smart contract developers, DeFi experts, Web3 specialists',
    skills: ['Solidity', 'Cairo', 'DeFi', 'NFTs'],
    gradient: 'from-violet-500 to-purple-500',
  },
];

const featuredTalent = [
  {
    name: 'Sarah Chen',
    title: 'Senior Full-Stack Developer',
    location: 'Singapore',
    rating: '5.0',
    reviews: 127,
    hourlyRate: '$85',
    skills: ['React', 'Node.js', 'TypeScript', 'Cairo'],
    specialization: 'DeFi Applications',
    profileImage: null,
    badges: ['Top Rated', 'Web3 Expert'],
  },
  {
    name: 'Marcus Rodriguez',
    title: 'UI/UX Designer',
    location: 'Barcelona, Spain',
    rating: '4.9',
    reviews: 89,
    hourlyRate: '$70',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'Web3 UX'],
    specialization: 'Web3 Interface Design',
    profileImage: null,
    badges: ['Rising Talent', 'Design Pro'],
  },
  {
    name: 'Alex Kumar',
    title: 'Smart Contract Developer',
    location: 'Bangalore, India',
    rating: '5.0',
    reviews: 156,
    hourlyRate: '$65',
    skills: ['Cairo', 'Solidity', 'Rust', 'Security Audits'],
    specialization: 'Starknet Development',
    profileImage: null,
    badges: ['Top Rated', 'Security Expert'],
  },
];

export default function ExplorePage() {
  return (
    <PageLayout>
      {/* Header */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Top{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Web3 Talent
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover skilled freelancers and agencies ready to bring your Web3
              projects to life
            </p>

            {/* Search Bar */}
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search for skills, services, or freelancers..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Browse by Category */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
              <p className="text-muted-foreground">
                Find the perfect talent for your project
              </p>
            </div>
            <Button variant="outline">View All Categories</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talentCategories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {category.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {category.count} freelancers
                        <Star className="h-3 w-3 text-yellow-500 ml-2" />
                        {category.rating}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {category.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Talent */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Talent</h2>
              <p className="text-muted-foreground">
                Top-rated professionals ready to start
              </p>
            </div>
            <Button variant="outline">View All Talent</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTalent.map((talent, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                      {talent.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate group-hover:text-primary transition-colors">
                        {talent.name}
                      </CardTitle>
                      <CardDescription className="font-medium">
                        {talent.title}
                      </CardDescription>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Globe className="h-3 w-3" />
                        {talent.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">{talent.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        ({talent.reviews} reviews)
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        {talent.hourlyRate}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        per hour
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">
                      Specialization
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {talent.specialization}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {talent.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {talent.badges.map((badge, badgeIndex) => (
                      <Badge
                        key={badgeIndex}
                        className="text-xs bg-gradient-to-r from-primary to-secondary"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full" variant="outline">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 px-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have found success with Kairox
            talent
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary"
              >
                <Zap className="h-4 w-4 mr-2" />
                Post Your First Job
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="outline">
                Browse Available Jobs
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
