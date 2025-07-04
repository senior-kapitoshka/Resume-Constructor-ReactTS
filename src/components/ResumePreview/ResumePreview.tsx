import React, { useRef } from "react";
import {
  SectionItem,
  sectionTypes,
  SkillsData,
  CertificatesData,
  EducationData,
  ExperienceData,
  ContactsData,
} from "../../types/resume";
import html2pdf from "html2pdf.js";
import DownloadButton from "../buttons/DownloadButton/DownloadButton";
import "./styles.css";

interface ResumePreviewProps {
  sections: SectionItem[];
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ sections }) => {
  const labelMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    sectionTypes.forEach((item) => {
      map[item.value] = item.label;
    });
    return map;
  }, []);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!previewRef.current) return;

    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(previewRef.current).save();
  };

  return (
    <div className="resumePreview">
      <div
        className="resumeText"
        ref={previewRef}
        style={{ padding: sections.length === 0 ? "3.5px" : "20px" }}
      >
        {sections.length === 0 && (
          <div className="initial">Добавьте секции для резюме</div>
        )}

        {sections.map((section) => (
          <div key={section.id} className="sectionBlock">
            <div className="sectionTitle">
              {labelMap[section.type] ?? section.type}
            </div>

            {section.type === "contacts" && (
              <div>
                {(section.data as ContactsData).photo && (
                  <img
                    src={(section.data as ContactsData).photo}
                    alt="Фото пользователя"
                    style={{ width: 100, height: 100, borderRadius: "15%", marginBottom: 8 }}
                  />
                )}
                <div><strong>Имя:</strong> {(section.data as ContactsData).firstName}</div>
                <div><strong>Фамилия:</strong> {(section.data as ContactsData).lastName}</div>
                <div><strong>Возраст:</strong> {(section.data as ContactsData).age}</div>
                <div><strong>Телефон:</strong> {(section.data as ContactsData).phone}</div>
                <div><strong>Email:</strong> {(section.data as ContactsData).email}</div>
              </div>
            )}

            {section.type === "education" && (
              <div>
                {(section.data as EducationData).entries.map((entry, i) => (
                  <div key={i} className="entryBlock">
                    <div><strong>Университет:</strong> {entry.university}</div>
                    <div><strong>Специальность:</strong> {entry.discipline}</div>
                    <div>
                      <strong>Период:</strong>{" "}
                      {new Date(entry.period.start).toLocaleDateString()} —{" "}
                      {new Date(entry.period.end).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.type === "experience" && (
              <div>
                {(section.data as ExperienceData).entries.map((entry, i) => (
                  <div key={i} className="entryBlock">
                    <div><strong>Должность:</strong> {entry.position}</div>
                    <div><strong>Компания:</strong> {entry.company}</div>
                    <div>
                      <strong>Период:</strong>{" "}
                      {new Date(entry.period.start).toLocaleDateString()} —{" "}
                      {new Date(entry.period.end).toLocaleDateString()}
                    </div>
                    <div><strong>Описание:</strong> {entry.description}</div>
                  </div>
                ))}
              </div>
            )}

            {section.type === "skills" && (
              <ul>
                {(section.data as SkillsData).skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            )}

            {section.type === "certificates" && (
              <ul>
                {(section.data as CertificatesData).descriptions.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            )}

            {section.type === "about" && (
              <div>{(section.data as { about: string }).about}</div>
            )}
          </div>
        ))}
      </div>

      <DownloadButton
        onClick={handleDownloadPDF}
        title="Скачать PDF"
        disabled={sections.length === 0}
      />
    </div>
  );
};

export default ResumePreview;
