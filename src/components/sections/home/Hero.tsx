'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, CheckCircle, Zap, Users, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  headline: "Transform Your Team's Productivity with Intelligent Workflow Automation",
  subheadline:
    'FlowSync eliminates manual tasks, connects your favorite tools, and gives you real-time insights to help your team work smarter, not harder. Join 10,000+ teams already saving 15+ hours per week.',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  trustBadge: 'Trusted by 10,000+ teams',
  features: ['No credit card required', 'Setup in under 5 minutes', 'Cancel anytime'],
  heroImageUrl:
    'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  heroImageAlt: 'Team collaboration dashboard interface',
  stats: [
    { icon: 'Zap', value: '15+', label: 'Hours saved per week' },
    { icon: 'Users', value: '10K+', label: 'Active teams' },
    { icon: 'BarChart3', value: '99.9%', label: 'Uptime guarantee' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    setIsVideoPlaying(true);
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    const icons = { Zap, Users, BarChart3 };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              <span data-editable="trustBadge">{config.trustBadge}</span>
            </Badge>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span data-editable="headline">{config.headline}</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                <span data-editable="subheadline">{config.subheadline}</span>
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-3">
              {config.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground" data-editable={`features[${idx}]`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="primaryCtaHref"
                data-href={config.primaryCtaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold"
              >
                <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="px-8 py-6 text-lg font-semibold border-border hover:bg-accent hover:text-accent-foreground"
              >
                <Play className="mr-2 h-5 w-5" />
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {config.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-2 text-primary">{getIcon(stat.icon)}</div>
                  <div
                    className="text-2xl font-bold text-foreground"
                    data-editable={`stats[${idx}].value`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm text-muted-foreground"
                    data-editable={`stats[${idx}].label`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className="relative">
            <Card className="bg-card border-border overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={config.heroImageUrl}
                    alt={config.heroImageAlt}
                    data-editable-src="heroImageUrl"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-background/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="lg"
                      onClick={handleSecondaryClick}
                      className="bg-primary/90 text-primary-foreground hover:bg-primary rounded-full p-6"
                    >
                      <Play className="h-8 w-8 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              ✨ New Features
            </div>

            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              🚀 Free Trial
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
