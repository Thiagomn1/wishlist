import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import logo from '../assets/logo-netshoes.png';
import { CiHeart } from 'react-icons/ci';
import { FaUserCircle } from 'react-icons/fa';

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="Abrir menu do usuário"
        className="flex cursor-pointer items-center transition hover:text-purple-400"
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaUserCircle className="h-8 w-8 md:h-10 md:w-10" />
      </button>

      {open && (
        <div className="absolute right-auto left-0 z-50 mt-4 w-44 rounded-xl bg-white py-3 text-black shadow-[3px_3px_12px_rgba(0,0,0,0.15)] md:right-0 md:left-auto">
          <div className="absolute -top-3 left-1 h-0 w-0 border-r-12 border-b-14 border-l-12 border-transparent border-b-white md:right-2 md:left-auto"></div>

          <ul className="flex flex-col space-y-2 px-4">
            <li className="hover:text-purple cursor-pointer">Entrar</li>
            <li className="hover:text-purple cursor-pointer">Minha Conta</li>
            <li className="hover:text-purple cursor-pointer">Endereços</li>
            <li className="hover:text-purple cursor-pointer">Minha Netshoes</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  return (
    <nav className="bg-purple relative flex items-center justify-between p-4 text-white">
      {/* Seção Esquerda*/}
      <div className="flex items-center">
        <div className="md:hidden">
          <ProfileDropdown />
        </div>

        <Link to="/" className="ml-4 hidden items-center md:flex lg:ml-8">
          <img src={logo} alt="Logo Netshoes" className="h-16" />
        </Link>
      </div>

      {/* Seção do Meio */}
      <Link
        to="/"
        className="absolute left-1/2 shrink-0 -translate-x-1/2 transform md:hidden"
      >
        <img
          src={logo}
          alt="Logo Netshoes"
          className="h-12 object-contain sm:h-16"
        />
      </Link>

      {/* Seção Direita */}
      <div className="flex items-center md:space-x-12">
        <Link
          to="/wishlist"
          aria-label="Ir para Wishlist"
          className="hidden cursor-pointer items-center space-x-1 transition hover:text-purple-400 md:flex"
        >
          <CiHeart className="" size={40} />
          <p className="text-xl font-bold">Wishlist</p>
        </Link>

        <Link
          to="/wishlist"
          aria-label="Ir para Wishlist"
          className="cursor-pointer transition hover:text-purple-400 md:hidden"
        >
          <CiHeart className="h-8 w-8" />
        </Link>

        <div className="mr-14 ml-8 hidden md:flex">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
