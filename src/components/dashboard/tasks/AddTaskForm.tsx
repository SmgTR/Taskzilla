import { NextPage } from 'next';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { useColumnsContext } from '@/src/context/ColumnsContext';
import { createTask } from '@/src/network/secure/tasks/createTask';
import Button from '../../ui/buttons/Button';
import PrimaryButton from '../../ui/buttons/PrimaryButton';

import styles from './AddTaskForm.module.scss';

interface Props {
  projectId: string;
  columnId: string;
}
let socket: Socket;
const AddTaskForm: NextPage<Props> = ({ projectId, columnId }) => {
  const formEl = useRef<HTMLFormElement>(null);
  const { columns } = useColumnsContext();
  const { addTask, getTasksLength } = useColumnsContext();

  const [columnsData, setColumnsData] = useState([] as Column[]);
  const [openForm, setOpenForm] = useState(false);
  const [error, setError] = useState('');
  const [textLength, setTextLength] = useState(0);

  const taskFormHandler = () => {
    setOpenForm(true);
  };

  useEffect(() => {
    fetch('/api/socket');
    socket = io('/updateColumnTaskContent');
    if (socket) {
      socket.emit('connect-to-room', projectId);
    }
    setOpenForm(false);

    return () => {
      if (socket) socket.disconnect();
    };
  }, [projectId]);

  const lengthHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputLength = event.target.value;
    setTextLength(inputLength.length);
  };
  const closeFormHandler = () => {
    setTextLength(0);
    setOpenForm(false);
  };
  const addTaskHandler = async (event: FormEvent<HTMLFormElement>) => {
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
      if (userData.name.length >= 4 && userData.name.length <= 25) {
        const task = await createTask({
          name: userData.name,
          projectId,
          order,
          columnId
        });
        if (task) {
          addTask(task, columnId);
          setTextLength(0);
          setOpenForm(false);
          socket.emit('add-column-data', columns);
        }
      } else {
        setError('Task name cannot be less than 4 characters and more than 25 characters');
        alert(error);
      }
    }
  };
  const addTaskForm = (
    <form
      className={`${styles.addForm} ${openForm ? styles.openForm : ''}`}
      ref={formEl}
      onSubmit={addTaskHandler}
    >
      <PrimaryButton
        btnType="button"
        btnText="Add task"
        title="Add task"
        onClickHandler={taskFormHandler}
        styleClass={`${styles.addTaskButton} ${openForm ? styles.hideElement : ''}`}
      />
      {openForm && (
        <>
          <input
            id=""
            type="text"
            title="task name"
            className={`${styles.addTaskInput}`}
            onChange={lengthHandler}
            placeholder="Enter task name"
            {...(openForm && { autoFocus: true })}
            name="name"
            autoComplete="off"
            maxLength={25}
          />
          <p className={textLength >= 4 && textLength <= 25 ? styles.rightSize : styles.wrongSize}>
            {textLength}/25
          </p>
        </>
      )}

      <div className={`${styles.addTask} ${openForm ? styles.showElement : ''}`}>
        <div className={styles.Buttons}>
          <PrimaryButton
            btnType="submit"
            btnText="Add task"
            title="Add task"
            styleClass={styles.formButton}
          />
          <Button
            title="close form"
            btnText="x"
            onClickHandler={closeFormHandler}
            classStyle={styles.closeFormButton}
          />
        </div>
      </div>
    </form>
  );
  return <div className={styles.taskButton}>{addTaskForm}</div>;
};
export default AddTaskForm;
