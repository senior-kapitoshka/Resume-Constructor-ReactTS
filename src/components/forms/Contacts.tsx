import { ContactsData } from "../../types/resume";
import './styles.css';

interface ContactsProps {
  data: ContactsData;
  onChange: (field: string, value: any) => void;
}

const Contacts: React.FC<ContactsProps> = ({ data, onChange }) => {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        onChange("photo", reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      {data.photo && (
        <div className='divFlex'>
          <img
            src={data.photo}
            alt="Фото"
          />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
      />

      <input
        type="text"
        placeholder="Имя"
        value={data.firstName}
        onChange={(e) => onChange("firstName", e.target.value)}
      />
      <input
        type="text"
        placeholder="Фамилия"
        value={data.lastName}
        onChange={(e) => onChange("lastName", e.target.value)}
      />
      <input
        type="number"
        placeholder="Возраст"
        value={data.age ?? ""}
        onChange={(e) =>
          onChange("age", e.target.value ? Number(e.target.value) : null)
        }
        min={0}
      />
      <input
        type="tel"
        placeholder="Телефон"
        value={data.phone}
        onChange={(e) => onChange("phone", e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => onChange("email", e.target.value)}
      />
    </div>
  );
};

export default Contacts;
