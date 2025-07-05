import { AboutData } from "../../types/resume";
import './styles.css';

interface AboutProps {
  data: AboutData;
  onChange: (field: string, value: any) => void;
}

const About: React.FC<AboutProps> = ({ data, onChange }) => {
  return (
    <div >
      <textarea 
        value={data.about}
        onChange={(e) => onChange("about", e.target.value)}
        placeholder="Расскажите о себе..."
      />
    </div>
  );
};

export default About;
