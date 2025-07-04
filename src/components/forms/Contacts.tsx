import React from 'react';
import { ContactsData } from "../../types/resume";

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
      {/* Превью фото */}
      {data.photo && (
        <div style={{ marginBottom: 16 }}>
          <img
            src={data.photo}
            alt="Фото пользователя"
            style={{ maxWidth: 150, maxHeight: 150, borderRadius: "15%" }}
          />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        style={{ marginBottom: 16 }}
      />

      <input
        type="text"
        placeholder="Имя"
        value={data.firstName}
        onChange={(e) => onChange("firstName", e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="text"
        placeholder="Фамилия"
        value={data.lastName}
        onChange={(e) => onChange("lastName", e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="number"
        placeholder="Возраст"
        value={data.age ?? ""}
        onChange={(e) =>
          onChange("age", e.target.value ? Number(e.target.value) : null)
        }
        style={{ width: "100%", marginBottom: 8 }}
        min={0}
      />
      <input
        type="tel"
        placeholder="Телефон"
        value={data.phone}
        onChange={(e) => onChange("phone", e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => onChange("email", e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />
    </div>
  );
};

export default Contacts;
