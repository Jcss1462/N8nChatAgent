import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full min-h-[80px]  h-[10vh] shadow-sm bg-[var(--color-brand-dark)] border-b flex items-center justify-between px-6">
      {/* Sección izquierda: logo + texto */}
      <div className="flex items-center gap-4">
        <img src="/semilloArtificialLogo.png" alt="Logo Izquierdo" className="h-17 w-auto" />
        <Link
          to="/"
          className="text-3xl font-bold text-brand-white hover:text-brand-accent transition-colors"
        >
          Semillo Artificial
        </Link>
      </div>

      {/* Sección derecha: logo derecho */}
      <img src="/openLogoWhite.png" alt="Logo Derecho" className="h-12 w-auto" />
    </header>
  );
}
