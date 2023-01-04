import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import MainInput from '@/src/components/ui/inputs/MainInput';
import DashboardModal from '@/src/components/ui/modals/DashboardModal';
import { useColumnsContext } from '@/src/context/ColumnsContext';

import { editTask } from '@/src/network/secure/tasks/editTask';
import { NextPage } from 'next';

import React, { useRef, useState } from 'react';
import styles from './EditTaskPopup.module.scss';
import AddButton from '../../ui/buttons/AddButton';
import EditTaskForm from './EditTaskForm';

interface Props {
  hidePopup: () => void;
  columnId: string;
  taskId: string;
  index: number;
  projectId: string;
  task: string;
  message: string;
}

const EditTaskPopup: React.FC<Props> = ({
  hidePopup,
  columnId,
  taskId,
  index,
  projectId,
  task,
  message
}) => {
  const formEl = useRef<HTMLFormElement>(null);

  const { updateTask } = useColumnsContext();
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
          console.log('sent');
          hidePopup();
        }
      } else {
        setError('Task name cannot be less than 4 characters and more than 25 characters');
      }
    }
    console.log(formEl);
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
        <EditTaskForm
          hidePopup={hidePopup}
          columnId={columnId}
          taskId={taskId}
          index={index}
          projectId={projectId}
          task={task}
          message={message}
        ></EditTaskForm>
      </form>
      <span>{error}</span>
    </DashboardModal>
  );
};

export default EditTaskPopup;
