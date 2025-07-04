import { sectionTypes, SectionType } from '../../types/resume';
import AddButton from '../buttons/AddButton/AddButton';
import "./styles.css";
interface AddSectionProps {
  newType: SectionType;
  setNewType: (type: SectionType) => void;
  addSection: () => void;
  addedTypes: SectionType[];
}

const SectionSelector: React.FC<AddSectionProps> = ({
  newType,
  setNewType,
  addSection,
  addedTypes
}) => {
  const allTypesDisabled = sectionTypes.every(t => addedTypes.includes(t.value as SectionType));

  return (
    <div className='selector' >
      <select
        value={newType}
        onChange={(e) => setNewType(e.target.value as SectionType)}
        disabled={allTypesDisabled}
      >
        {sectionTypes.map((t) => (
          <option
            key={t.value}
            value={t.value}
            disabled={addedTypes.includes(t.value as SectionType)} // <-- ключевая строка
          >
            {t.label}
          </option>
        ))}
      </select>
      <AddButton onClick={addSection} title="Добавить секцию" disabled={addedTypes.includes(newType)} />

    </div>
  );
};

export default SectionSelector;
