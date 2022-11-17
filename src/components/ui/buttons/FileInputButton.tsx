import { NextPage } from 'next';
import { useRef } from 'react';

export interface Props {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  label: string;
  onChange: (formData: FormData) => void;
  uploadFileName: string;
  labelTitle?: string;
  inputTitle: string;
}

export const FileInputButton: NextPage<Props> = (props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    props.onChange(formData);

    formRef.current?.reset();
  };

  return (
    <form ref={formRef}>
      <button type="button" onClick={onClickHandler}>
        {props.label}
      </button>
      {props.labelTitle && <label htmlFor={props.uploadFileName}>{props.labelTitle}</label>}
      <input
        title={props.inputTitle}
        accept={props.acceptedFileTypes}
        multiple={props.allowMultipleFiles}
        name={props.uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        type="file"
      />
    </form>
  );
};

FileInputButton.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false
};
