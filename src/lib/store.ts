import { writable } from "svelte/store";

// cursor store
export enum CursorTypes {
  default = "default",
  hamburger = "hamburger",
  sliderDrag = "sliderDrag",
}

export const CursorStore = writable<CursorTypes>(CursorTypes.default);

export const setCursorToDefault = () => CursorStore.set(CursorTypes.default);

export const setCursorToHamburger = () =>
  CursorStore.set(CursorTypes.hamburger);

export const setCursorToSlider = () => CursorStore.set(CursorTypes.sliderDrag);

// menu store
export const MenuStore = writable<boolean>(false);

export const setMenuToggler = () => MenuStore.update((t) => !t);
