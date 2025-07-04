import React from "react";
import { AboutData } from "../../types/resume";

interface AboutProps {
  data: AboutData;
  onChange: (field: string, value: any) => void;
}

const About: React.FC<AboutProps> = ({ data, onChange }) => {
  return (
    <div >
      <textarea
        style={{ width: "100%", height: 120, resize: "none" }}
        value={data.about}
        onChange={(e) => onChange("about", e.target.value)}
        placeholder="Расскажите о себе..."
      />
    </div>
  );
};

export default About;
