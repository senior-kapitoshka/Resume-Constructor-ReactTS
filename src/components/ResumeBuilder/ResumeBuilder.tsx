import React from 'react';
import SectionSelector from '../SectionSelector/SectionSelector';
import SectionList from '../SectionList/SectionList';
import {
  SectionItem,
  SectionType,
  AboutData,
  ExperienceData,
  EducationData,
  SkillsData,
  CertificatesData,
  ContactsData
} from '../../types/resume';
import './styles.css';

type SectionData =
  | AboutData
  | ExperienceData
  | EducationData
  | SkillsData
  | CertificatesData
  |ContactsData;

const getEmptySection = (type: SectionType): SectionData => {
  switch (type) {
    case 'contacts':
      return {
        firstName: '',
        lastName: '',
        age: null,
        phone: '',
        email: ''
      };


    case 'experience':
        return {
          entries: [{
            position: '',
            company: '',
            period: { start: new Date(), end: new Date() },
            description: ''
          }]
        };

      case 'education':
        return {
          entries: [{
            university: '',
            discipline: '',
            period: { start: new Date(), end: new Date() }
          }]
        };
      
    case 'skills':
      return { skills: [''] };
    case 'certificates':
      return { descriptions: [''] };
    case 'about':
      return { about: '' };
    default:
      throw new Error(`Unsupported section type: ${type}`);
  }
};

interface ResumeBuilderProps {
  sections: SectionItem[];
  setSections: React.Dispatch<React.SetStateAction<SectionItem[]>>;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ sections, setSections }) => {
  const [newType, setNewType] = React.useState<SectionType>('experience');
  const [dragged, setDragged] = React.useState<number | null>(null);

  function addSection(): void {
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        type: newType,
        data: getEmptySection(newType)
      }
    ]);
  }

  function removeSection(id: string): void {
    setSections(sections.filter(s => s.id !== id));
  }

  function handleChange(id: string, field: string, value: any): void {
    setSections(sections.map(s =>
      s.id === id
        ? { ...s, data: { ...s.data, [field]: value } }
        : s
    ));
  }

  function onDragStart(index: number): void {
    setDragged(index);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  function onDrop(index: number): void {
    if (dragged === null || dragged === index) return;
    const copy = [...sections];
    const item = copy[dragged];
    copy.splice(dragged, 1);
    copy.splice(index, 0, item);
    setSections(copy);
    setDragged(null);
  }

  return (
    <div className="resumeBuilder">
      <SectionSelector
        newType={newType}
        setNewType={setNewType}
        addSection={addSection}
        addedTypes={sections.map(s => s.type)}
      />
      <SectionList
        sections={sections}
        onChange={handleChange}
        onRemove={removeSection}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        dragged={dragged}
      />
    </div>
  );
};

export default ResumeBuilder;
