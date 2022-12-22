import { deleteTask } from '@/src/network/secure/tasks/deleteTask';
import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import MainInput from '@/src/components/ui/inputs/MainInput';
import DashboardModal from '@/src/components/ui/modals/DashboardModal';
import { useColumnsContext } from '@/src/context/ColumnsContext';

import { editTask } from '@/src/network/secure/tasks/editTask';
import { NextPage } from 'next';

import React, { useRef, useState } from 'react';
import styles from './EditTaskPopup.module.scss';

interface Props {
  hidePopup: () => void;
  columnId: string;
  taskId: string;
  index: number;
  projectId: string;
  task: string;
  message: string;
}

const EditTaskPopup: NextPage<Props> = ({
  hidePopup,
  columnId,
  taskId,
  index,
  projectId,
  task,
  message
}) => {
  const formEl = useRef<HTMLFormElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const { updateTask, removeTask } = useColumnsContext();
  const [error, setError] = useState('');

  const editTaskHandler = async (columnId: string, taskId: string) => {
    if (formEl.current) {
      const formInputs = Array.from(formEl.current.elements) as HTMLInputElement[];

      const inputType = formInputs.filter((element) => {
        if (element.name) return element;
      });
      const submittedValues = inputType.map((input) => {
        return { [input.name]: input.value };
      });

      const userData = Object.assign({}, ...submittedValues);

      console.log(userData.message);
      if (userData.name.length >= 4 && userData.name.length <= 25) {
        const task = await editTask({
          name: userData.name,
          description: userData.message,
          taskId,
          projectId,
          columnId
        });
        if (task) {
          console.log(task.description);
          updateTask(task, columnId, userData.message);
          hidePopup();
        }
      } else {
        setError('Task name cannot be less than 4 characters and more than 25 characters');
      }
    }
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
    <DashboardModal
      changeHandler={() => editTaskHandler(columnId, taskId)}
      modalTitle=""
      styleClass={styles.editModal}
    >
      <form
        ref={formEl}
        onSubmit={(e) => {
          e.preventDefault();
          editTaskHandler(columnId, taskId);
        }}
        className={styles.editForm}
        autoComplete="false"
      >
        <MainInput
          labelText="Task name:"
          title="Task name"
          id="name"
          name="name"
          type="text"
          inputClass={styles.nameInput}
          labelClass={styles.nameLabel}
          autoComplete="false"
          defaultValue={task}
        />
        <textarea
          title="Message"
          id="Message"
          ref={textArea}
          name="message"
          className={styles.messageInput}
          autoComplete="false"
          defaultValue={message}
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
      </form>
      <span>{error}</span>
    </DashboardModal>
  );
};

export default EditTaskPopup;
