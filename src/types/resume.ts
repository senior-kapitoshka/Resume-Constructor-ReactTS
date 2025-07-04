export type SectionType = "contacts" |"about" | "experience" | "education" | "skills" | "certificates";

export interface SectionItem {
    id: string;
    type: SectionType;
    data: ContactsData|AboutData | ExperienceData | EducationData|SkillsData|CertificatesData;
  }

  export interface ContactsData {
    firstName: string;
    lastName: string;
    age: number | null;
    phone: string;
    email: string;
    photo?: string;
  }
  

export interface AboutData{
    about:string;
}


export interface ExperienceEntry {
    position: string;
    company: string;
    period: TimePeriod;
    description: string;
  }
  
export interface ExperienceData {
    entries: ExperienceEntry[];
}


export interface EducationEntry {
    university: string;
    discipline: string;
    period: TimePeriod;
  }
  
export interface EducationData {
    entries: EducationEntry[];
}
  
export interface SkillsData{
    skills:string[];
}

export interface CertificatesData{
    descriptions:string[];
}

export interface TimePeriod {
    start: Date;
    end: Date;
}

export const sectionTypes = [
  { value: 'contacts', label: 'Данные' },
  { value: 'education', label: 'Образование' },
  { value: 'experience', label: 'Опыт работы' },
  { value: 'certificates', label: 'Сертификаты' },
    { value: 'skills', label: 'Навыки' },
    { value: 'about', label: 'О себе' },
  ];
  