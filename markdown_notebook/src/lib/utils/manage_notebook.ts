import type { NotebookType } from "$lib/types/notebook";

export function updateNotebook(
  notebooks: NotebookType[],
  new_notebook: NotebookType
): NotebookType[] {
  const i = notebooks.findIndex((t) => t.id === new_notebook.id);
  notebooks[i] = { ...notebooks[i], ...new_notebook };

  return notebooks;
}

export function removeNotebook(
  notebooks: NotebookType[],
  remove_notebook: NotebookType
): NotebookType[] {
  notebooks = notebooks.filter((t) => t.id !== remove_notebook.id);

  return notebooks;
}

export function createNotebook(notebooks: NotebookType[]): NotebookType[] {
  let new_notebook_id = 1;

  if (notebooks.length > 0) {
    new_notebook_id = Math.max(...notebooks.map((t) => t.id)) + 1;
  }

  let new_notebook: NotebookType = {
    id: new_notebook_id,
    name: "new notebook",
    text: "",
  };
  notebooks = [...notebooks, new_notebook];

  return notebooks;
}
