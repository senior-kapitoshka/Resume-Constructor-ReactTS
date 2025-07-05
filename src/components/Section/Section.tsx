import { ContactsData,SectionItem, sectionTypes, AboutData, ExperienceData, EducationData, SkillsData, CertificatesData } from '../../types/resume';

import About from '../forms/About';
import Experience from '../forms/Experience';
import Education from '../forms/Education';
import Skills from '../forms/Skills';
import Certificates from '../forms/Certificates';
import Contacts from '../forms/Contacts';
import DeleteButton from '../buttons/DeleteButton/DeleteButton';
import "./styles.css";

interface SectionProps {
  section: SectionItem;
  onChange: (id: string, field: string, value: any) => void;
  onRemove: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (index: number) => void;
  dragged: number | null;
  index: number;
}

const Section: React.FC<SectionProps> = ({
  section,
  onChange,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  dragged,
  index,
}) => {
  const label = sectionTypes.find(t => t.value === section.type)?.label ?? section.type;

  const renderForm = () => {
    switch (section.type) {
      case 'contacts':
        return (
          <Contacts
            data={section.data as ContactsData}
            onChange={(field, value) => onChange(section.id, field, value)}
          />
        );
      case 'about':
        return (
          <About
            data={section.data as AboutData}
            onChange={(field, value) => onChange(section.id, field, value)}
          />
        );
      case 'experience':
        return (
          <Experience
            data={section.data as ExperienceData}
            onChange={(field, value) => onChange(section.id, field, value)}
          />
        );
      case 'education':
        return (
          <Education
            data={section.data as EducationData}
            onChange={(field, value) => onChange(section.id, field, value)}
          />
        );
      case 'skills':
        return (
          <Skills
            data={section.data as SkillsData}
            onChange={(field, value) => onChange(section.id, field, value)}
          />
        );
      case 'certificates':
        return (
          <Certificates
            data={section.data as CertificatesData}
            onChange={(field, value) => onChange(section.id, field, value)}
          />
        );
      default:
        return <div>---</div>;
    }
  };

  return (
    <div
      className="section"
      
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(index)}
    >
      <div className='sectionLabel'>
        <b>{label}</b>
        <DeleteButton onClick={() => onRemove(section.id)} />

      </div>
      <div className='sectionBody' >
          {renderForm()}
      </div>
    </div>
  );
};

export default Section;
