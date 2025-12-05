'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  headline: 'Choose the Perfect Plan for Your Team',
  subheadline:
    'Start free and scale as you grow. All plans include our core automation features and 24/7 support.',
  billingToggle: {
    monthly: 'Monthly',
    yearly: 'Yearly',
  },
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      currency: '$',
      period: 'month',
      features: [
        'Up to 5 team members',
        'Basic automation workflows',
        'Email support',
        '5GB storage',
      ],
      ctaText: 'Get Started Free',
      ctaHref: '/signup',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'Advanced features for growing teams and businesses',
      monthlyPrice: 29,
      yearlyPrice: 290,
      currency: '$',
      period: 'month',
      features: [
        'Up to 25 team members',
        'Advanced automation workflows',
        'Priority support',
        '100GB storage',
        'Custom integrations',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      monthlyPrice: 99,
      yearlyPrice: 990,
      currency: '$',
      period: 'month',
      features: [
        'Unlimited team members',
        'Custom automation workflows',
        '24/7 phone support',
        'Unlimited storage',
        'Advanced security',
        'Dedicated account manager',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact',
      popular: false,
    },
  ],
  guarantee: '30-day money-back guarantee on all paid plans',
  faq: [
    {
      question: 'Can I change my plan at any time?',
      answer:
        'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.',
    },
    {
      question: 'What happens if I exceed my team member limit?',
      answer:
        "We'll notify you when you're approaching your limit. You can either upgrade your plan or remove team members to stay within your current limit.",
    },
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

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="headline">{config.headline}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="subheadline">{config.subheadline}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              <span data-editable="billingToggle.monthly">{config.billingToggle.monthly}</span>
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              role="switch"
              aria-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              <span data-editable="billingToggle.yearly">{config.billingToggle.yearly}</span>
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto mb-16">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
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
                    {isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    /<span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                  </span>
                  {isYearly && plan.yearlyPrice > 0 && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Billed annually ({plan.currency}
                      {plan.yearlyPrice})
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guarantee */}
        <div className="text-center mb-12">
          <p className="text-muted-foreground">
            <span data-editable="guarantee">{config.guarantee}</span>
          </p>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {config.faq.map((item, idx) => (
              <div key={idx} className="bg-card text-card-foreground p-6 rounded-lg">
                <h4 className="font-semibold mb-2">
                  <span data-editable={`faq[${idx}].question`}>{item.question}</span>
                </h4>
                <p className="text-muted-foreground">
                  <span data-editable={`faq[${idx}].answer`}>{item.answer}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
