'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'FlowSync',
  description:
    'FlowSync helps teams automate workflows and boost productivity with intelligent automation and seamless integrations.',
  tagline: 'Streamline your workflow with intelligent automation and seamless team collaboration',
  copyright: '© 2024 FlowSync. All rights reserved.',

  // Company Links
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],

  // Legal Links
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],

  // Social Links
  socialLinks: [
    { platform: 'Twitter', href: 'https://twitter.com/flowsync', icon: 'twitter' },
    { platform: 'GitHub', href: 'https://github.com/flowsync', icon: 'github' },
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/flowsync', icon: 'linkedin' },
  ],

  // Newsletter
  newsletterTitle: 'Stay Updated',
  newsletterDescription: 'Get the latest updates on new features and productivity tips.',
  newsletterPlaceholder: 'Enter your email',
  newsletterButtonText: 'Subscribe',

  // Contact
  contactEmail: 'hello@flowsync.com',
  contactPhone: '+1 (555) 123-4567',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
    }
  };

  const renderSocialIcon = (iconType: string) => {
    switch (iconType) {
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer id="footer" className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-primary">
                <span data-editable="companyName">{config.companyName}</span>
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                <span data-editable="tagline">{config.tagline}</span>
              </p>
            </div>

            <p className="text-muted-foreground mb-6 max-w-md">
              <span data-editable="description">{config.description}</span>
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {config.socialLinks.map((social, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleLinkClick(social.href)}
                  data-editable-href={`socialLinks[${idx}].href`}
                  data-href={social.href}
                  aria-label={`Follow us on ${social.platform}`}
                >
                  {renderSocialIcon(social.icon)}
                </Button>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-normal text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`companyLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-normal text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`legalLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="max-w-md">
            <h4 className="font-semibold text-foreground mb-2">
              <span data-editable="newsletterTitle">{config.newsletterTitle}</span>
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              <span data-editable="newsletterDescription">{config.newsletterDescription}</span>
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={config.newsletterPlaceholder}
                className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                data-editable="newsletterPlaceholder"
              />
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <span data-editable="newsletterButtonText">{config.newsletterButtonText}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            <span data-editable="copyright">{config.copyright}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
            <a
              href={`mailto:${config.contactEmail}`}
              className="hover:text-foreground transition-colors"
              data-editable="contactEmail"
            >
              {config.contactEmail}
            </a>
            <span className="hidden sm:inline">•</span>
            <span data-editable="contactPhone">{config.contactPhone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
