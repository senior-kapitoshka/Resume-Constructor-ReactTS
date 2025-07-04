import { EducationData, ExperienceData, SectionItem } from "../types/resume";

function reviveEntries<T extends { period: { start: string | Date; end: string | Date } }>(entries: T[]): T[] {
  return entries.map(entry => ({
    ...entry,
    period: {
      start: typeof entry.period.start === "string" ? new Date(entry.period.start) : entry.period.start,
      end: typeof entry.period.end === "string" ? new Date(entry.period.end) : entry.period.end,
    },
  }));
}



export const saveToLocalStorage = (data: SectionItem[]) => {
  try {
    localStorage.setItem("resumeData", JSON.stringify(data));
  } catch (error) {
    console.error("Ошибка сохранения в localStorage", error);
  }
};

export const loadFromLocalStorage = (): SectionItem[] | null => {
  try {
    const data = localStorage.getItem("resumeData");
    if (!data) return null;

    const parsed: SectionItem[] = JSON.parse(data);

    return parsed.map(section => {
      // Если у секции есть entries с периодами (например, education, experience)
      if (
        (section.type === "education" || section.type === "experience") &&
        Array.isArray((section.data as any).entries)
      ) {
        // Восстанавливаем даты в записях
        const entries = reviveEntries((section.data as any).entries);

        return {
          ...section,
          data: {
            ...section.data,
            entries,
          } as EducationData | ExperienceData, // правильно указываем тип
        };
      }

      // Если у секции один period (не массив), тоже восстанавливаем
      if (
        section.data &&
        (section.data as any).period &&
        typeof (section.data as any).period.start === "string"
      ) {
        return {
          ...section,
          data: {
            ...section.data,
            period: {
              start: new Date((section.data as any).period.start),
              end: new Date((section.data as any).period.end),
            },
          },
        };
      }

      return section;
    });
  } catch (error) {
    console.error("Ошибка загрузки из localStorage", error);
    return null;
  }
};

