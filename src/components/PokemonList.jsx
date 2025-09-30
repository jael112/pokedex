import PokemonCard from './PokemonCard';


export default function PokemonList({ items, onOpen }){
if(!items?.length) return (
<p className="text-center text-slate-500">No hay resultados.</p>
);
return (
<section className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
{items.map(p => (
<PokemonCard key={p.id} id={p.id} name={p.name} onClick={() => onOpen(p.id)} />
))}
</section>
);
}