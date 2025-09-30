const API_BASE = 'https://pokeapi.co/api/v2';


export const PAGE_SIZE = 24;


export function getIdFromUrl(url = '') {
const m = url.match(/\/(\d+)\/?$/);
return m ? Number(m[1]) : null;
}


export function artworkUrl(id){
return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}


export async function listPokemons(nextUrl){
const url = nextUrl ?? `${API_BASE}/pokemon?limit=${PAGE_SIZE}&offset=0`;
const res = await fetch(url);
if(!res.ok) throw new Error('No se pudo cargar la lista');
const data = await res.json();
const items = data.results.map(p => ({ id: getIdFromUrl(p.url), name: p.name, url: p.url }));
return { items, next: data.next };
}


export async function getPokemon(idOrName){
const key = String(idOrName).toLowerCase();
const res = await fetch(`${API_BASE}/pokemon/${key}`);
if(!res.ok) throw new Error('Pokémon no encontrado');
return await res.json();
}