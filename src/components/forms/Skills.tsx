import React from "react";
import { SkillsData } from "../../types/resume";
import DeleteButton from "../buttons/DeleteButton/DeleteButton";
import AddButton from "../buttons/AddButton/AddButton";

interface SkillsProps {
  data: SkillsData;
  onChange: (field: string, value: any) => void;
}

const Skills: React.FC<SkillsProps> = ({ data, onChange }) => {

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = value;
    onChange("skills", newSkills);
  };

  const handleAddSkill = () => {
    onChange("skills", [...data.skills, ""]);
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = data.skills.filter((_, i) => i !== index);
    onChange("skills", newSkills);
  };

  return (
    <div >
      {data.skills.map((skill, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            type="text"
            value={skill}
            onChange={(e) => handleSkillChange(i, e.target.value)}
            placeholder={`Навык #${i + 1}`}
            style={{ flexGrow: 1 }}
          />
          <DeleteButton onClick={() => handleRemoveSkill(i)} />
        </div>
      ))}
      <AddButton onClick={handleAddSkill} title="Добавить навык" />

    </div>
  );
};

export default Skills;
