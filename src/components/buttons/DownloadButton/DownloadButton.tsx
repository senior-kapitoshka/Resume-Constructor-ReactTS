import './styles.css';

interface DownloadButtonProps {
  onClick: () => void;
  title?: string;
  disabled?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className="buttonDownload"
      onClick={onClick}
      title="Скачать PDF"
      type="button"
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#ccc" : "#363ff4"
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18px"
        height="18px"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    </button>
  );
};

export default DownloadButton;
