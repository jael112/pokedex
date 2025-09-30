import { useEffect, useState } from 'react';
import { artworkUrl, getPokemon } from '../lib/pokeapi';
import { capitalize, pad3 } from '../utils/format';

const typeColors = {
  grass: 'from-green-500 to-emerald-400 text-white',
  fire: 'from-orange-500 to-red-500 text-white',
  water: 'from-blue-500 to-sky-400 text-white',
  bug: 'from-lime-700 to-lime-500 text-white',
  normal: 'from-stone-400 to-stone-300 text-white',
  poison: 'from-purple-600 to-fuchsia-600 text-white',
  electric: 'from-yellow-300 to-amber-300 text-slate-900',
  ground: 'from-amber-500 to-yellow-400 text-slate-900',
  fairy: 'from-pink-300 to-rose-300 text-slate-900',
  fighting: 'from-red-600 to-orange-600 text-white',
  psychic: 'from-fuchsia-500 to-pink-500 text-white',
  rock: 'from-yellow-800 to-amber-700 text-white',
  ghost: 'from-indigo-700 to-violet-700 text-white',
  ice: 'from-cyan-300 to-sky-300 text-slate-900',
  dragon: 'from-violet-700 to-indigo-700 text-white',
  dark: 'from-stone-700 to-stone-600 text-white',
  steel: 'from-slate-400 to-slate-300 text-slate-900',
};

export default function PokemonModal({ id, onClose }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const [err, setErr] = useState('');

  useEffect(() => {
    let ignore = false;
    (async () => {
      setStatus('loading'); setErr('');
      try {
        const full = await getPokemon(id);
        if (ignore) return;
        setData(full); setStatus('done');
      } catch (e) {
        if (ignore) return;
        setStatus('error'); setErr('No se pudo cargar el detalle', e);
      }
    })();
    return () => { ignore = true };
  }, [id]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-lg p-3 animate-fade"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-[22px] bg-gradient-to-br from-sky-400/40 via-transparent to-fuchsia-400/40 p-[1px] shadow-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-[21px] bg-white shadow-xl animate-in-pop">
          <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-[21px] border-b border-slate-100 bg-white/80 px-4 py-3 backdrop-blur">
            <h2 className="text-lg font-semibold">Detalle</h2>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-lg bg-slate-100 text-xl leading-none hover:bg-slate-200"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>

          <div className="p-6">
            {status === 'loading' && (
              <p className="text-center text-slate-500">Cargando…</p>
            )}

            {status === 'error' && (
              <p className="mx-auto max-w-sm rounded-lg bg-amber-50 p-2 text-center text-amber-800">
                ⚠️ {err}
              </p>
            )}

            {status === 'done' && data && (
              <div className="space-y-8 text-center">
                <div className="relative flex flex-col items-center gap-3">
                  <div className="pointer-events-none absolute -left-12 top-1/2 -z-10 h-40 w-40 -translate-y-1/2 rounded-full bg-sky-200 blur-3xl opacity-60" />
                  <div className="pointer-events-none absolute -right-12 top-0 -z-10 h-44 w-44 rounded-full bg-fuchsia-200 blur-3xl opacity-60" />

                  <img
                    src={artworkUrl(data.id)}
                    alt={data.name}
                    className="h-40 w-40 object-contain drop-shadow-md md:h-44 md:w-44 animate-float-slow"
                  />

                  <h3 className="text-2xl font-semibold tracking-tight">
                    {capitalize(data.name)}{' '}
                    <span className="text-slate-400">#{pad3(data.id)}</span>
                  </h3>

                  <div className="mb-1 flex flex-wrap justify-center gap-2">
                    {data.types.map((t) => (
                      <span
                        key={t.type.name}
                        className={`inline-block rounded-full bg-gradient-to-r px-3 py-1 text-xs font-medium capitalize shadow-sm ${typeColors[t.type.name] ?? 'from-slate-200 to-slate-300 text-slate-800'}`}
                      >
                        {t.type.name}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-slate-600">
                    Altura: {data.height / 10} m • Peso: {data.weight / 10} kg
                  </p>
                </div>

                <section>
                  <h4 className="mb-3 text-sm font-semibold text-slate-700">Habilidades</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {data.abilities.map((a) => (
                      <span
                        key={a.ability.name}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-sm"
                      >
                        {a.ability.name}
                      </span>
                    ))}
                  </div>
                </section>
                <section>
                  <h4 className="mb-3 text-sm font-semibold text-slate-700">Stats</h4>
                  <div className="mx-auto max-w-md space-y-3">
                    {data.stats.map((s) => {
                      const pct = Math.min(100, (s.base_stat / 160) * 100);
                      return (
                        <div key={s.stat.name} className="flex items-center justify-between gap-3">
                          <span className="w-32 text-left text-sm capitalize text-slate-700">
                            {s.stat.name.replace('-', ' ')}
                          </span>
                          <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 transition-[width] duration-700 ease-out"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-10 text-right tabular-nums text-sm text-slate-700">
                            {s.base_stat}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
