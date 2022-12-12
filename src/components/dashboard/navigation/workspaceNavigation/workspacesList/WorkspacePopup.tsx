import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import MainInput from '@/src/components/ui/inputs/MainInput';
import DashboardModal from '@/src/components/ui/modals/DashboardModal';
import { setActivePopup, usePopupContext } from '@/src/context/PopupContext';
import { addWorkspace, useWorkspacesContext } from '@/src/context/WorkspacesContext';
import { createWorkspace } from '@/src/network/secure/workspace/createWorkspace';
import { NextPage } from 'next';
import { FormEvent, useRef, useState } from 'react';

import styles from './WorkspacePopup.module.scss';

interface Props {
  hidePopup: () => void;
}

const WorkspacePopup: NextPage<Props> = ({ hidePopup }) => {
  const formEl = useRef<HTMLFormElement>(null);

  const [_, dispatch] = useWorkspacesContext();

  const [error, setError] = useState('');

  const addWorkspaceHandler = async (event: FormEvent<HTMLFormElement>) => {
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
      if (userData.name.length >= 4 && userData.name.length < 25) {
        const newWorkspace = await createWorkspace({ name: userData.name });
        dispatch(addWorkspace(newWorkspace));
        hidePopup();
      } else {
        setError('Workspace name cannot be less than 4 characters and more than 25 characters');
      }
    }
  };

  return (
    <DashboardModal modalTitle="Add workspace">
      <form className={styles.content} ref={formEl} onSubmit={addWorkspaceHandler}>
        <MainInput
          labelText="Workspace name:"
          title="Workspace name"
          id="name"
          name="name"
          type="text"
          inputClass={styles.input}
          labelClass={styles.label}
        />
        <PrimaryButton btnText="Add workspace" title="Add workspace" btnType="submit" />
      </form>
      <span>{error}</span>
    </DashboardModal>
  );
};

export default WorkspacePopup;
