'use client';

import { useState } from 'react';
import Link from 'next/link';

const WHATSAPP_NUMBER = '51999999999';

const menuItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Catálogo', href: '/catalogo' },
  { label: 'Disponibilidad', href: '/disponibilidad' },
  { label: 'Aprende', href: '/aprende' },
  { label: 'Videos', href: '/videos' },
  { label: 'Contacto', href: '/contacto' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded text-lg font-bold text-gray-900 transition-all duration-300 hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 active:text-green-800"
          aria-label="Misti Cuy - Ir a inicio"
          onClick={closeMenu}
        >
          <span aria-hidden="true" className="text-2xl">
            🐹
          </span>
          <span className="hidden sm:inline">Misti Cuy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex md:items-center md:gap-8"
          aria-label="Navegación principal"
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-1 py-0.5 text-sm font-medium text-gray-700 transition-all duration-300 hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 active:text-green-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: WhatsApp button + Mobile menu toggle */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20cotizar%20cuyes`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 active:bg-green-800 active:scale-95"
            aria-label="Cotizar por WhatsApp"
          >
            <span className="hidden sm:inline">Cotizar por WhatsApp</span>
            <span className="sm:hidden" aria-hidden="true">
              💬 Cotizar
            </span>
          </a>

          {/* Hamburger button (mobile only) */}
          <button
            type="button"
            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-all duration-300 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 active:bg-gray-200 md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={toggleMenu}
          >
            {/* Hamburger icon: 3 lines -> X */}
            <span className="sr-only">
              {mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            </span>

            <span className="relative h-5 w-6">
              {/* Top line */}
              <span
                className={`absolute left-0 top-0 block h-0.5 w-6 rounded bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'top-2 rotate-45' : 'top-0'
                }`}
              />
              {/* Middle line */}
              <span
                className={`absolute left-0 top-2 block h-0.5 w-6 rounded bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {/* Bottom line */}
              <span
                className={`absolute left-0 block h-0.5 w-6 rounded bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed left-0 top-[72px] z-40 w-full bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
        role="navigation"
        aria-label="Menú móvil"
      >
        <div className="flex flex-col space-y-2 px-4 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-md px-4 py-3 text-base font-medium text-gray-900 transition-all duration-300 hover:bg-green-50 hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 active:bg-green-100 active:text-green-800"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}