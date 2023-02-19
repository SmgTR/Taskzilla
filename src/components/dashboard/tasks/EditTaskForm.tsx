import React, { useRef, useState } from 'react';

import AddButton from '../../ui/buttons/AddButton';
import PrimaryButton from '../../ui/buttons/PrimaryButton';
import MainInput from '../../ui/inputs/MainInput';

import styles from './EditTaskForm.module.scss';
import { useColumnsContext } from '@/src/context/ColumnsContext';
import { deleteTask } from '@/src/network/secure/tasks/deleteTask';
interface Props {
  hidePopup: () => void;
  columnId: string;
  taskId: string;
  index: number;
  projectId: string;
  message: string;
  taskName: string;
}
const EditTaskForm: React.FC<Props> = ({
  hidePopup,
  columnId,
  taskId,
  index,
  projectId,
  message,
  taskName
}) => {
  const formEl = useRef<HTMLFormElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const { removeTask } = useColumnsContext();
  const [error, setError] = useState('');

  const lengthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputLength = event.target.value;
    if (inputLength.length < 4 || inputLength.length >= 25) {
      setError('text must be at least 4 characters long and maximum 25 characters long');
    } else {
      setError('');
    }
    return error;
  };

  const removeTaskHandler = async (index: number, columnId: string, taskId: string) => {
    const del = await deleteTask({
      projectId,
      columnId,
      taskId
    });
    removeTask(del, index, taskId, columnId);
    hidePopup();
  };
  return (
    <>
      <MainInput
        labelText="Task name:"
        title="Task name"
        id="name"
        name="name"
        type="text"
        inputClass={styles.nameInput}
        labelClass={styles.nameLabel}
        autoComplete="false"
        onChange={() => lengthHandler}
        defaultValue={taskName}
      />
      {error}
      <div className={styles.formData}>
        <div className={styles.assignedContainer}>
          <div className={styles.assignedTitle}>assigned to</div>
          <div className={styles.assignedPeople}>
            <div className={styles.person}>A</div>
            <div className={styles.person}>B</div>
            <div className={styles.person}>C</div>
          </div>
        </div>
        <div className={styles.tagsContainer}>
          <div className={styles.tagsTitle}>tags</div>
          <div className={styles.tagsSelection}>
            <div className={styles.tag}>Front</div>
            <div className={styles.tag}>Back</div>
            <div className={styles.tag}>Data</div>
            <AddButton btnText="+" title="addTag"></AddButton>
          </div>
        </div>
        <div className={styles.createdContainer}>
          <div className={styles.createdTitle}>created</div>
          <div className={styles.createdAt}>MAR 11 2021,6:40AM</div>
        </div>
        <div className={styles.dueContainer}>
          <div className={styles.dueTitle}>due date</div>
          <div className={styles.dueAt}>-/-</div>
        </div>
      </div>

      <textarea
        title="Message"
        id="Message"
        ref={textArea}
        name="message"
        className={styles.messageInput}
        autoComplete="false"
        defaultValue={message}
        placeholder="Set your task description here"
      />

      <PrimaryButton
        btnText="Remove task"
        title="Remove task"
        btnType="button"
        styleClass={`${styles.removeButton} ${styles.button}`}
        onClickHandler={() => {
          removeTaskHandler(index, columnId, taskId);
        }}
      />
    </>
  );
};
export default EditTaskForm;
