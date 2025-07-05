import Section from '../Section/Section';
import { SectionItem } from '../../types/resume';
import './styles.css';

interface SectionListProps {
  sections: SectionItem[];
  onChange: (id: string, field: string, value: any) => void;
  onRemove: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (index: number) => void;
  dragged: number | null;
}

const SectionList: React.FC<SectionListProps> = ({
  sections,
  onChange,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  dragged
}) => {
  return (
    <div className='list'>
      {sections.map((section, i) => (
        <Section
          key={section.id}
          section={section}
          onChange={onChange}
          onRemove={onRemove}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          dragged={dragged}
          index={i}
        />
      ))}
    </div>
  );
};

export default SectionList;
