'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp } from 'lucide-react';
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
  imageUrl:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center',
  imageAlt: 'Analytics dashboard showing data visualization',
  features: ['Real-time data processing', 'Advanced machine learning', 'Enterprise-grade security'],
  trustBadge: 'Trusted by 10,000+ companies',
  announcement: '🎉 New: AI-powered forecasting now available',
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % config.features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [config.features.length]);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Announcement Banner */}
        <div className="text-center mb-8">
          <Badge
            variant="secondary"
            className="bg-accent text-accent-foreground px-4 py-2 text-sm font-medium"
          >
            <span data-editable="announcement">{config.announcement}</span>
          </Badge>
        </div>

        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span data-editable="title">{config.title}</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {config.features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 transition-all duration-500 ${
                    currentFeature === idx ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span
                    data-editable={`features[${idx}]`}
                    className="text-sm sm:text-base font-medium"
                  >
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
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base font-semibold group"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-3 text-base font-semibold"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground font-medium">
                <span data-editable="trustBadge">{config.trustBadge}</span>
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <Card className="bg-card border-border shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={config.imageUrl}
                    alt={config.imageAlt}
                    data-editable-src="imageUrl"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />

                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">+24% Growth</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">
                        Enterprise Secure
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
