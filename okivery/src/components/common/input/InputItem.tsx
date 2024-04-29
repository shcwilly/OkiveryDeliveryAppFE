import "./InputItem.css";

interface InputItemProps {
  label: string;
  name: string;
  type: string;
  place: string;
  value?: string;
  readOnly?: boolean;
  isNoStar?: boolean;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputItem: React.FC<InputItemProps> = ({
  label,
  name,
  type,
  value,
  place,
  readOnly,
  isNoStar,
  handleInputChange,
}) => {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label}{" "}
        <span className={!readOnly && !isNoStar ? "" : "hideSpan"}>*</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={place}
        onChange={handleInputChange}
        readOnly={readOnly}
      ></input>
    </div>
  );
};

export default InputItem;
