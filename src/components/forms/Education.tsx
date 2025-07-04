import React from "react";
import { EducationData, TimePeriod, EducationEntry } from "../../types/resume";
import DeleteButton from "../buttons/DeleteButton/DeleteButton";
import AddButton from "../buttons/AddButton/AddButton";

interface EducationProps {
  data: EducationData;
  onChange: (field: string, value: any) => void;
}

const Education: React.FC<EducationProps> = ({ data, onChange }) => {
  const formatDate = (date: Date) =>
    date ? date.toISOString().substring(0, 10) : "";

  const parseDate = (value: string) => (value ? new Date(value) : null);

  const handleFieldChange = (index: number, field: keyof EducationEntry, value: any) => {
    const updated = [...data.entries];
    updated[index] = { ...updated[index], [field]: value };
    onChange("entries", updated);
  };

  const handlePeriodChange = (index: number, subfield: "start" | "end", value: string) => {
    const updated = [...data.entries];
    const entry = updated[index];
    const newPeriod: TimePeriod = {
      start: subfield === "start" ? parseDate(value) || new Date() : entry.period.start,
      end: subfield === "end" ? parseDate(value) || new Date() : entry.period.end,
    };
    updated[index] = { ...entry, period: newPeriod };
    onChange("entries", updated);
  };

  const addEntry = () => {
    const updated = [
      ...data.entries,
      {
        university: "",
        discipline: "",
        period: { start: new Date(), end: new Date() },
      },
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
          style={{
            marginBottom: 16,
            padding: 10,
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <input
              type="text"
              placeholder="Университет"
              value={entry.university}
              onChange={(e) => handleFieldChange(index, "university", e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <input
              type="text"
              placeholder="Специальность"
              value={entry.discipline}
              onChange={(e) => handleFieldChange(index, "discipline", e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
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

          {data.entries.length > 1 && (
            
            <DeleteButton onClick={() => removeEntry(index)} />
          )}
        </div>
      ))}

      <AddButton onClick={addEntry} title="Добавить университет" />

    </div>
  );
};

export default Education;
