import React from "react";
import { CertificatesData } from "../../types/resume";
import DeleteButton from '../buttons/DeleteButton/DeleteButton';
import AddButton from "../buttons/AddButton/AddButton";

interface CertificatesProps {
  data: CertificatesData;
  onChange: (field: string, value: any) => void;
}

const Certificates: React.FC<CertificatesProps> = ({ data, onChange }) => {
  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = [...data.descriptions];
    newDescriptions[index] = value;
    onChange("descriptions", newDescriptions);
  };

  const handleAddDescription = () => {
    onChange("descriptions", [...data.descriptions, ""]);
  };

  const handleRemoveDescription = (index: number) => {
    const newDescriptions = data.descriptions.filter((_, i) => i !== index);
    onChange("descriptions", newDescriptions);
  };

  return (
    <div>
      {data.descriptions.map((desc, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            type="text"
            value={desc}
            onChange={(e) => handleDescriptionChange(i, e.target.value)}
            placeholder={`Описание сертификата #${i + 1}`}
            style={{ flexGrow: 1 }}
          />
          <DeleteButton onClick={() => handleRemoveDescription(i)} />
          
        </div>
      ))}

      <AddButton onClick={handleAddDescription} title="Добавить сертификат" />

    </div>
  );
};

export default Certificates;
