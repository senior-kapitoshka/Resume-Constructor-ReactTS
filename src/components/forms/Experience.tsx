import React from "react";
import { ExperienceData, TimePeriod, ExperienceEntry } from "../../types/resume";
import DeleteButton from "../buttons/DeleteButton/DeleteButton";
import AddButton from "../buttons/AddButton/AddButton";
import './styles.css';

interface ExperienceProps {
  data: ExperienceData;
  onChange: (field: string, value: any) => void;
}

const Experience: React.FC<ExperienceProps> = ({ data, onChange }) => {
  const formatDate = (date: Date) =>
    date ? date.toISOString().substring(0, 10) : "";

  const parseDate = (value: string) => (value ? new Date(value) : new Date());

  const handleFieldChange = (index: number, field: keyof ExperienceEntry, value: any) => {
    const updated = [...data.entries];
    updated[index] = { ...updated[index], [field]: value };
    onChange("entries", updated);
  };

  const handlePeriodChange = (index: number, subfield: "start" | "end", value: string) => {
    const updated = [...data.entries];
    const entry = updated[index];
    const newPeriod: TimePeriod = {
      start: subfield === "start" ? parseDate(value) : entry.period.start,
      end: subfield === "end" ? parseDate(value) : entry.period.end,
    };
    updated[index] = { ...entry, period: newPeriod };
    onChange("entries", updated);
  };

  const addEntry = () => {
    const updated = [
      ...data.entries,
      {
        position: '',
        company: '',
        period: { start: new Date(), end: new Date() },
        description: '',
      }
    ];
    onChange("entries", updated);
  };

  const removeEntry = (index: number) => {
    const updated = data.entries.filter((_, i) => i !== index);
    onChange("entries", updated);
  };

  return (
    <div >
      {data.entries.map((entry, index) => (
        <div
          key={index}
          className='divPad'
        >
          <input
            type="text"
            placeholder="Должность"
            value={entry.position}
            onChange={(e) => handleFieldChange(index, "position", e.target.value)}
          />

          <input
            type="text"
            placeholder="Компания"
            value={entry.company}
            onChange={(e) => handleFieldChange(index, "company", e.target.value)}
          />

          <div className='divFlex'>
            <div>
              <label>Начало: </label>
              <input
                type="date"
                value={formatDate(entry.period.start)}
                onChange={(e) => handlePeriodChange(index, "start", e.target.value)}
              />
            </div>
            <div>
              <label>Окончание: </label>
              <input
                type="date"
                value={formatDate(entry.period.end)}
                onChange={(e) => handlePeriodChange(index, "end", e.target.value)}
              />
            </div>
          </div>

          <textarea
            placeholder="Описание"
            value={entry.description}
            onChange={(e) => handleFieldChange(index, "description", e.target.value)}
          />

          {data.entries.length > 1 && (
            
            <DeleteButton onClick={() => removeEntry(index)} />
          )}
        </div>
      ))}

      <AddButton onClick={addEntry} title="Добавить место работы" />

    </div>
  );
};

export default Experience;
