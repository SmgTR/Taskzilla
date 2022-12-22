import { NextPage } from 'next';

import styles from './MainInput.module.scss';

interface Props {
  labelText: string;
  title: string;
  name: string;
  required?: boolean;
  type: string;
  inputClass?: string;
  labelClass?: string;
  id: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  onChange?: () => void;
}

const MainInput: React.FC<Props> = ({
  labelText,
  title,
  name,
  required,
  type,
  inputClass,
  labelClass,
  id,
  placeholder,
  defaultValue,
  autoComplete,
  onChange
}) => {
  return (
    <>
      <label htmlFor={id} className={labelClass}>
        {labelText}
      </label>
      <input
        title={title}
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={`${styles.mainInput} ${inputClass}`}
        autoComplete={autoComplete}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default MainInput;
