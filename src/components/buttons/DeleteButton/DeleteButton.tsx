import './styles.css';
interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick}) => {
  return (
    <button
      className="buttonDelete"
      onClick={onClick}
      type="button"
      title = "Удалить"
    >
      ×
    </button>
  );
};

export default DeleteButton;
