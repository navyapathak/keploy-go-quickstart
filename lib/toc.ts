export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-alphanumeric except spaces and hyphens
    .trim()
    .replace(/\s+/g, "-");
}

export function extractHeadings(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const rawTitle = match[2].trim();
    // remove markdown links or formatting if any
    const cleanTitle = rawTitle.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[`*]/g, "");
    const id = slugify(cleanTitle);

    headings.push({
      id,
      title: cleanTitle,
      level,
    });
  }

  return headings;
}
