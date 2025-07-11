import './styles.css'

interface AddButtonProps {
  onClick: () => void;
  title?: string;     
  disabled?: boolean;      
}

const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  title = "Добавить",
  disabled = false,
}) => {
  return (
    <button
      className="buttonAdd"
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#ccc" : "#4caf50"
      }}
    >
      +
    </button>
  );
};

export default AddButton;
