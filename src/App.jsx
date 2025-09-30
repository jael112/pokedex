import { useEffect, useMemo, useRef, useState } from 'react';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';
import PokemonModal from './components/PokemonModal';
import useDebounced from './hooks/useDebounced';
import { listPokemons, getPokemon } from './lib/pokeapi';

export default function App(){
  const [items, setItems] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [query, setQuery] = useState('');
  const q = useDebounced(query, 350);

  const [selected, setSelected] = useState(null);
  const cacheRef = useRef(new Map());

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { items: page, next } = await listPokemons();
        setItems(page); setNextUrl(next);
      } catch(e){ setError(e.message || 'Error'); }
      finally { setLoading(false); }
    })();
  }, []);

  async function loadMore(){
    if(!nextUrl || loading) return;
    setLoading(true); setError('');
    try {
      const { items: page, next } = await listPokemons(nextUrl);
      setItems(prev => [...prev, ...page]); setNextUrl(next);
    } catch(e){ setError(e.message || 'Error'); }
    finally { setLoading(false); }
  }

  // búsqueda directa a /pokemon/{id|name}
  const [searchState, setSearchState] = useState({ state: 'idle', item: null, message: '' });
  useEffect(() => {
    let ignore = false;
    (async () => {
      if(!q){ setSearchState({ state: 'idle', item: null, message: '' }); return; }
      setSearchState({ state: 'loading', item: null, message: '' });
      try {
        const key = String(q).toLowerCase();
        if(cacheRef.current.has(key)){
          const full = cacheRef.current.get(key);
          if(!ignore) setSearchState({ state: 'done', item: full, message: '' });
          return;
        }
        const full = await getPokemon(key);
        cacheRef.current.set(full.id, full);
        cacheRef.current.set(full.name.toLowerCase(), full);
        if(!ignore) setSearchState({ state: 'done', item: full, message: '' });
      } catch(e){
        if(!ignore) setSearchState({ state: 'error', item: null, message: 'No se encontró ese Pokémon' });
      }
    })();
    return () => { ignore = true };
  }, [q]);

  const visible = useMemo(()=>{
    if(searchState.state === 'done' && searchState.item){
      const it = searchState.item;
      return [{ id: it.id, name: it.name, url: `https://pokeapi.co/api/v2/pokemon/${it.id}/` }];
    }
    if(searchState.state === 'loading') return [];
    return items;
  }, [searchState, items]);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* Capa del fondo con pokéballs y movimiento */}
      <div className="pointer-events-none absolute inset-0 bg-pokeballs animate-bg-pan-slow" />

      {/* Capa de contenido */}
      <div className="relative min-h-dvh bg-gradient-to-b from-sky-50/70 to-white/90">
        <header className="px-4 pb-4 pt-7 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Pokédex</h1>
          <p className="mt-1 text-slate-500">PokeAPI</p>
          <div className="mt-3">
            <SearchBar value={query} onChange={setQuery} placeholder="Buscar por nombre o id" />
          </div>
        </header>

        {searchState.state === 'error' && (
          <div className="mx-auto w-fit rounded-xl bg-amber-50 px-3 py-2 text-amber-800">{searchState.message}</div>
        )}

        <main className="mx-auto max-w-6xl px-3 pb-10">
          <PokemonList items={visible} onOpen={setSelected} />

          {searchState.state !== 'done' && (
            <div className="mt-5 flex justify-center">
              <button
                onClick={loadMore}
                disabled={!nextUrl || loading}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? 'Cargando…' : nextUrl ? 'Cargar más' : 'No hay más resultados'}
              </button>
            </div>
          )}

          {error && <p className="mt-2 rounded-xl bg-amber-50 p-2 text-amber-800">{error}</p>}
        </main>

        {selected && (
          <PokemonModal id={selected} onClose={()=>setSelected(null)} />
        )}

        <footer className="pb-6 pt-2 text-center text-sm text-slate-400">
          usando <a className="underline" href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokeAPI</a>
        </footer>
      </div>
    </div>
  );
}
