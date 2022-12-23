import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import MainInput from '@/src/components/ui/inputs/MainInput';
import DashboardModal from '@/src/components/ui/modals/DashboardModal';
import { useColumnsContext } from '@/src/context/ColumnsContext';
import { usePopupContext } from '@/src/context/PopupContext';

import { createTask } from '@/src/network/secure/tasks/createTask';

import { NextPage } from 'next';

import { FormEvent, useRef, useState } from 'react';

interface Props {
  hidePopup: () => void;
  columnId: string;
}

const AddTaskPopup: NextPage<Props> = ({ hidePopup, columnId }) => {
  const formEl = useRef<HTMLFormElement>(null);

  const { addTask, getTasksLength } = useColumnsContext();
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

  return (
    <DashboardModal changeHandler={() => {}} modalTitle="Add task">
      <form ref={formEl} onSubmit={addPopupHandler}>
        <MainInput labelText="Task name:" title="Task name" id="name" name="name" type="text" />
        <PrimaryButton btnText="Add task" title="Add task" btnType="submit" />
      </form>
      <span>{error}</span>
    </DashboardModal>
  );
};

export default AddTaskPopup;
