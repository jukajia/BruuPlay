import { useEffect, useState } from 'react';
import Header from '../components/Header';
const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAdWoPmoRkA0ACkczvQSPvXmqNnVjJrxQuu_G46uDobY0t_rdW9pLFoREGbGqj92Q8a8QdW0uZJ5R6/pub?gid=533515857&single=true&output=csv';

export default function ReactPage() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch(SHEET_URL)
      .then(res => res.text())
      .then(csv => {
        const lines = csv.split('\n').slice(1); // remove cabeçalho
        const parsed = lines.map(line => {
          const cols = line.split(',');

          const nome = cols[2]?.trim();
          const cidade = cols[3]?.trim();
          const links = cols.slice(4, 9).map(link => link.trim()).filter(Boolean);
          const autorizou = cols[9]?.toLowerCase().includes('sim');

          return {
            nome,
            cidade,
            links,
            autorizado: autorizou,
          };
        });

        setMemes(parsed.filter(m => m.links.length > 0));
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-400">🎮 Memes da Galera</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {memes.map((meme, i) => (
          <div key={i} className="bg-gray-800 rounded-xl shadow p-4 hover:scale-[1.01] transition-all">
            <h2 className="text-xl font-semibold text-green-300">
              {meme.nome} {meme.autorizado && meme.cidade ? `de ${meme.cidade}` : ''}
            </h2>
            <ul className="mt-2 list-disc list-inside space-y-1">
              {meme.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    Link {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-400">🎮 Memes da Galera</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {memes.map((meme, i) => (
            <div key={i} className="bg-gray-800 rounded-xl shadow p-4 hover:scale-[1.01] transition-all">
              <h2 className="text-xl font-semibold text-green-300">
                {meme.nome} {meme.autorizado && meme.cidade ? `de ${meme.cidade}` : ''}
              </h2>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {meme.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline hover:text-blue-300"
                    >
                      Link {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
