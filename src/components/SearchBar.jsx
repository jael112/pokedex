export default function SearchBar({ value, onChange, placeholder }){
return (
<div className="w-full flex justify-center">
<input
value={value}
onChange={(e)=>onChange(e.target.value)}
placeholder={placeholder}
className="w-full max-w-xl rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm outline-none focus:ring focus:ring-sky-200"
type="text"
/>
</div>
);
}