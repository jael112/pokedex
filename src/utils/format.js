export function pad3(n){
return String(n).padStart(3, '0');
}


export function capitalize(s=''){
return s.charAt(0).toUpperCase() + s.slice(1);
}