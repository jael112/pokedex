import { artworkUrl } from '../lib/pokeapi';
import { capitalize, pad3 } from '../utils/format';

export default function PokemonCard({ id, name, onClick }) {
  const img = artworkUrl(id);

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="group cursor-pointer rounded-3xl border border-slate-100 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[4/3] grid place-items-center bg-slate-50">
        <img
          src={img}
          alt={name}
          className="h-5/6 w-5/6 object-contain drop-shadow-md group-hover:scale-105 transition"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <span className="text-sm text-slate-500">#{pad3(id)}</span>
        <h3 className="mt-1 text-lg font-bold text-slate-800 md:text-xl">
          {capitalize(name)}
        </h3>
      </div>
    </article>
  );
}
