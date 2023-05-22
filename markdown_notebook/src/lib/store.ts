import { writable } from "svelte/store";
import { localStore } from "./localStore";
import type { NotebookType } from "./types/notebook";

export const initialNotebooks: NotebookType[] = [
  {
    id: 1,
    name: "Notebook Name 1",
    text: "This is the content inside of notebook 1",
  },
  {
    id: 2,
    name: "Notebook Name 2",
    text: "This is the content inside notebook 2",
  },
  {
    id: 3,
    name: "Notebook Name 3",
    text: "This is the content inside notebook 3",
  },
];

export const notebooks = localStore<NotebookType[]>(
  "demo-markdown-notebook",
  initialNotebooks
);
