// src/store.ts
import { writable } from 'svelte/store';
export const theme = writable(localStorage.getItem('theme') || 'light');
theme.subscribe((value) => {
    localStorage.setItem('theme', value);
    document.documentElement.classList.toggle('dark', value === 'dark');
});
