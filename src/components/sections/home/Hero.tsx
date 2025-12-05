'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, CheckCircle, Zap, Shield, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Transform Your Business with AI-Powered Analytics',
  subtitle:
    'Unlock actionable insights from your data with our cutting-edge SaaS platform. Make smarter decisions, faster.',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
  heroImageAlt: 'Analytics dashboard showing data visualization',
  trustBadge: 'Trusted by 10,000+ companies',
  features: ['Real-time data processing', 'Advanced ML algorithms', 'Enterprise-grade security'],
  stats: [
    { label: 'Data Points Processed', value: '50B+' },
    { label: 'Active Users', value: '100K+' },
    { label: 'Uptime', value: '99.9%' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % config.stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [config.stats.length]);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Trust Badge */}
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground px-4 py-2 text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
              <span data-editable="trustBadge">{config.trustBadge}</span>
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span
                  data-editable="title"
                  className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
                >
                  {config.title}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap gap-4">
              {config.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-card text-card-foreground px-4 py-2 rounded-lg border border-border"
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span data-editable={`features[${idx}]`} className="text-sm font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold group"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="px-8 py-6 text-lg font-semibold group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Animated Stats */}
            <Card className="bg-card text-card-foreground border-border">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  {config.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className={`text-center transition-all duration-500 ${
                        currentStat === idx ? 'scale-105 text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      <div className="text-2xl font-bold" data-editable={`stats[${idx}].value`}>
                        {stat.value}
                      </div>
                      <div className="text-sm" data-editable={`stats[${idx}].label`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <div className="relative">
              {/* Background Decorations */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>

              {/* Main Image */}
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={config.heroImageUrl}
                  alt={config.heroImageAlt}
                  data-editable-src="heroImageUrl"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />

                {/* Floating Elements */}
                <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold">+127% Growth</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold">Enterprise Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
