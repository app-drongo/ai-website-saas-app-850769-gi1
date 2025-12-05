'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Choose Your Plan',
  subtitle: 'Scale your SaaS with confidence. Start free, upgrade when ready.',
  billingToggleText: 'Annual billing (save 20%)',
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      currency: '$',
      period: 'month',
      popular: false,
      features: ['Up to 3 projects', '5GB storage', 'Basic analytics', 'Email support'],
      ctaText: 'Get Started Free',
      ctaHref: '/signup',
    },
    {
      name: 'Professional',
      description: 'Ideal for growing teams and businesses',
      monthlyPrice: 29,
      yearlyPrice: 23,
      currency: '$',
      period: 'month',
      popular: true,
      features: [
        'Unlimited projects',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'Team collaboration',
        'API access',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=pro',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with advanced needs',
      monthlyPrice: 99,
      yearlyPrice: 79,
      currency: '$',
      period: 'month',
      popular: false,
      features: [
        'Everything in Professional',
        'Unlimited storage',
        'Custom integrations',
        '24/7 phone support',
        'SSO & advanced security',
        'Dedicated account manager',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact',
    },
  ],
  trustBadges: [
    { icon: 'shield', text: 'SOC 2 Compliant' },
    { icon: 'star', text: '99.9% Uptime' },
    { icon: 'zap', text: 'Lightning Fast' },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return Shield;
      case 'star':
        return Star;
      case 'zap':
        return Zap;
      default:
        return Check;
    }
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                isYearly ? 'bg-primary' : 'bg-muted'
              }`}
              role="switch"
              aria-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              <span data-editable="billingToggleText">{config.billingToggleText}</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto mb-16">
          {config.plans.map((plan, idx) => {
            const IconComponent = getIconComponent('check');
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <Card
                key={idx}
                className={`relative ${
                  plan.popular
                    ? 'border-primary bg-card shadow-lg scale-105'
                    : 'border-border bg-card'
                } transition-all duration-300 hover:shadow-lg`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">
                      <span data-editable={`plans[${idx}].currency`}>{plan.currency}</span>
                      {price}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      /<span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button
                    onClick={() => handlePlanSelect(plan.ctaHref)}
                    className={`w-full mb-6 ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                    data-editable-href={`plans[${idx}].ctaHref`}
                    data-href={plan.ctaHref}
                  >
                    <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                            {feature}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-center">
          {config.trustBadges.map((badge, idx) => {
            const IconComponent = getIconComponent(badge.icon);
            return (
              <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                <IconComponent className="h-5 w-5" />
                <span className="text-sm font-medium">
                  <span data-editable={`trustBadges[${idx}].text`}>{badge.text}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
