'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { WalletModal } from '@/components/wallet-modal';
import { useWallet } from '@/components/wallet-provider';
import { cn } from '@/lib/utils';
import {
  Hexagon,
  Menu,
  X,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const pathname = usePathname();
  const { isConnected, walletAddress, disconnectWallet } = useWallet();

  const navItems = [
    { href: '/', label: 'Home', icon: Hexagon },
    { href: '/explore', label: 'Explore', icon: Users },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const formatWalletAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Kairox
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative py-2 px-3 rounded-lg transition-all',
                    active
                      ? 'text-foreground bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  )}
                >
                  {item.label}
                  {active && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />

            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>

            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Get Started
              </Button>
            </Link>

            {/* Wallet section (AFTER Get Started) */}
            {isConnected && walletAddress ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {formatWalletAddress(walletAddress)}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={disconnectWallet}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#FF1CF7] to-[#0900FF] text-white"
                onClick={() => setIsWalletModalOpen(true)}
              >
                <Image src="/bag.png" alt="wallet" width={14} height={14} />
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 border-t border-border/40 pt-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-accent"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}

            <Link href="/login">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>

            <Link href="/signup">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                Get Started
              </Button>
            </Link>

            {/* Mobile Wallet */}
            {isConnected && walletAddress ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={disconnectWallet}
              >
                Disconnect ({formatWalletAddress(walletAddress)})
              </Button>
            ) : (
              <Button
                className="w-full bg-gradient-to-r from-[#FF1CF7] to-[#0900FF]"
                onClick={() => setIsWalletModalOpen(true)}
              >
                Connect Wallet
              </Button>
            )}
          </div>
        )}
      </div>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </nav>
  );
}
