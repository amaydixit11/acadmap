import { Department } from "./courses";

export interface Filters {
    departments: (keyof typeof Department)[];
    levels: string[];
    searchQuery: string;
  }