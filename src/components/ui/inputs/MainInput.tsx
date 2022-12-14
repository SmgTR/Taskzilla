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
}

const MainInput: NextPage<Props> = ({
  labelText,
  title,
  name,
  required,
  type,
  inputClass,
  labelClass,
  id,
  placeholder,
  autoComplete
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
      />
    </>
  );
};

export default MainInput;
