import Link from "next/link";

const navigationLinks = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Aprende", href: "/aprende" },
  { label: "Contacto", href: "/contacto" },
];

const socialLinks = [
  { label: "TikTok", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="bg-gray-900 text-gray-300"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Pie de página
      </h2>
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Marca */}
          <div>
            <h3 className="text-lg font-semibold text-white">Misti Cuy</h3>
            <p className="mt-4 text-sm leading-relaxed">
              Crianza tecnificada de cuyes con calidad, compromiso y asesoría
              para productores.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-lg font-semibold text-white">Navegación</h3>
            <ul className="mt-4 space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>WhatsApp</li>
              <li>Arequipa, Perú</li>
            </ul>
          </div>

          {/* Columna 4: Síguenos */}
          <div>
            <h3 className="text-lg font-semibold text-white">Síguenos</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="transition-colors duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2026 Misti Cuy. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
