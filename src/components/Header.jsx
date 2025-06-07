import { useEffect, useState } from 'react';
import { FaYoutube, FaTiktok, FaInstagram, FaTwitch } from 'react-icons/fa';

const SOCIALS_CSV =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAdWoPmoRkA0ACkczvQSPvXmqNnVjJrxQuu_G46uDobY0t_rdW9pLFoREGbGqj92Q8a8QdW0uZJ5R6/pub?gid=898081298&single=true&output=csv';

const iconMap = {
  youtube: <FaYoutube className="text-red-500" />,
  tiktok: <FaTiktok className="text-white" />,
  instagram: <FaInstagram className="text-pink-400" />,
  twitch: <FaTwitch className="text-purple-500" />,
};

export default function Header() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch(SOCIALS_CSV)
      .then(res => res.text())
      .then(csv => {
        const lines = csv.split('\n').slice(1); // ignora cabeçalho
        const parsed = lines.map(line => {
          const [plataforma, url] = line.split(',');
          return {
            nome: plataforma?.toLowerCase().trim(),
            url: url?.trim(),
          };
        });
        setLinks(parsed.filter(l => l.url));
      });
  }, []);

  return (
    <header className="flex items-center justify-between bg-gray-950 px-6 py-4 border-b border-gray-700">
      <div className="flex items-center space-x-3">
        <img src="/logobruuplay.png" alt="Logo BruuPlay" className="h-12 rounded" />
        <h1 className="text-2xl text-green-400 font-bold">BruuPlay</h1>
      </div>
      <nav className="flex space-x-4 text-2xl">
        {links.map(({ nome, url }) => (
          <a
            key={nome}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={nome}
            className="hover:scale-110 transition-transform"
          >
            {iconMap[nome] || '🌐'}
          </a>
        ))}
      </nav>
    </header>
  );
}
