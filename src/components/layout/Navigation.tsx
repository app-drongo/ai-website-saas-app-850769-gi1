'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  logo: 'TechFlow',
  logoHref: '/',
  navItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Pricing', href: '#pricing' },
  ],
  ctaText: 'Get Started',
  ctaHref: '/signup',
  mobileMenuLabel: 'Open navigation menu',
  closeMenuLabel: 'Close navigation menu',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    navigate(config.logoHref);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
    setIsOpen(false);
  };

  return (
    <section
      id="navigation"
      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              className="text-xl font-bold text-foreground hover:text-primary p-0 h-auto"
              onClick={handleLogoClick}
              data-editable-href="logoHref"
              data-href={config.logoHref}
            >
              <span data-editable="logo">{config.logo}</span>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block" role="navigation" aria-label="Main navigation">
            <ul className="flex items-center space-x-8">
              {config.navItems.map((item, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => handleNavClick(item.href)}
                    data-editable-href={`navItems[${idx}].href`}
                    data-href={item.href}
                  >
                    <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleCtaClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground"
                  aria-label={config.mobileMenuLabel}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      className="text-xl font-bold text-foreground p-0 h-auto"
                      onClick={handleLogoClick}
                      data-editable-href="logoHref"
                      data-href={config.logoHref}
                    >
                      <span data-editable="logo">{config.logo}</span>
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <nav role="navigation" aria-label="Mobile navigation">
                    <ul className="flex flex-col space-y-4">
                      {config.navItems.map((item, idx) => (
                        <li key={idx}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-muted-foreground hover:text-foreground text-lg"
                            onClick={() => handleNavClick(item.href)}
                            data-editable-href={`navItems[${idx}].href`}
                            data-href={item.href}
                          >
                            <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mobile CTA */}
                  <div className="pt-4 border-t border-border">
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleCtaClick}
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                    >
                      <span data-editable="ctaText">{config.ctaText}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
}
