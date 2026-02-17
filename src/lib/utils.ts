export const cn = (...classes: (string | false | undefined | null)[]): string =>
  classes.filter(Boolean).join(" ");

export const slugify = (name: string): string =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
