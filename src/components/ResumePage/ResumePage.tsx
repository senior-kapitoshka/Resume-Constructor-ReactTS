import React, { useEffect, useState } from "react";
import ResumeBuilder from "../ResumeBuilder/ResumeBuilder";
import ResumePreview from "../ResumePreview/ResumePreview";
import { SectionItem } from "../../types/resume";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorageHelper";
import './styles.css';

const ResumePage = () => {
  const [sections, setSections] = useState<SectionItem[]>(
    loadFromLocalStorage() || []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      saveToLocalStorage(sections);
    }, 500);
    return () => clearTimeout(timer);
  }, [sections]);

  return (
    <>
    <div className="resumePage">
      <ResumeBuilder sections={sections} setSections={setSections} />
      <ResumePreview sections={sections} />
    </div>
    </>
  );
};

export default ResumePage;
