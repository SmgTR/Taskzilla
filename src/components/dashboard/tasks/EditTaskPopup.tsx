import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import MainInput from '@/src/components/ui/inputs/MainInput';
import DashboardModal from '@/src/components/ui/modals/DashboardModal';
import { useColumnsContext } from '@/src/context/ColumnsContext';
import { usePopupContext } from '@/src/context/PopupContext';
import {
  addWorkspace,
  addWorkspaceProject,
  useWorkspacesContext
} from '@/src/context/WorkspacesContext';
import { createProject } from '@/src/network/secure/project/createProject';
import { createTask } from '@/src/network/secure/tasks/createTask';
import { createWorkspace } from '@/src/network/secure/workspace/createWorkspace';
import { updateTask } from '@/src/utils/socket/updateColumnDataHelper';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
import styles from './EditTaskPopup.module.scss';

interface Props {
  hidePopup: () => void;
  columnId: string;
  taskId?: string;
}

const EditTaskPopup: NextPage<Props> = ({ hidePopup, columnId, taskId }) => {
  const formEl = useRef<HTMLFormElement>(null);
  const buttonEl = useRef<HTMLButtonElement>(null);
  const { addTask, getTasksLength, updateTask } = useColumnsContext();
  const [popupContext] = usePopupContext();

  const [error, setError] = useState('');

  const addPopupHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (formEl.current) {
      const formInputs = Array.from(formEl.current.elements) as HTMLInputElement[];
      const inputType = formInputs.filter((element) => {
        if (element.name) return element;
      });
      const submittedValues = inputType.map((input) => {
        return { [input.name]: input.value };
      });

      const userData = Object.assign({}, ...submittedValues);
      const order = getTasksLength(columnId);
      if (userData.name.length >= 4 && userData.name.length < 25) {
        const task = await createTask({
          name: userData.name,
          projectId: popupContext.parentId!,
          order,
          columnId
        });
        if (task) {
          hidePopup();
          addTask(task, columnId);
        }
      } else {
        setError('Task name cannot be less than 4 characters and more than 25 characters');
      }
    }
  };
  const updateTaskHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(taskId);
  };

  return (
    <DashboardModal modalTitle="" styleClass={styles.editModal}>
      <form ref={formEl} onSubmit={addPopupHandler} className={styles.editForm}>
        <MainInput labelText="Task name:" title="Task name" id="name" name="name" type="text" />
        <div className={styles.formButtons}>
          <PrimaryButton
            btnText="Remove task"
            title="Remove task"
            btnType="submit"
            styleClass={`${styles.removeButton} ${styles.button}`}
            onClickHandler={() => updateTaskHandler}
          />
          <PrimaryButton
            btnText="Edit task"
            title="Edit task"
            btnType="submit"
            styleClass={styles.button}
          />
        </div>
      </form>
      <span>{error}</span>
    </DashboardModal>
  );
};

export default EditTaskPopup;
