import { create } from "zustand";
import type { ShopTag } from "../types/ShopTag";

export interface SearchCondition {
  selectArea: string | null;
  setSelectArea: (area: string | null) => void;

  tagList: ShopTag[];
  addTag: (t: ShopTag) => void;
  clearTags: () => void;
}

export const searchConditionStore = create<SearchCondition>((set) => ({
  
  selectArea: null,
  tagList: [],

  setSelectArea: (area) => set({ selectArea: area }),

  addTag: (t) =>
    set((state) => {
      const exists = state.tagList.some((tag) => tag.id === t.id);
      if (exists) return state;
      return { tagList: [...state.tagList, t] };
    }),

  clearTags: () => set({ tagList: [] }),

}));
