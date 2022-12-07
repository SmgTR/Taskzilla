import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import MainInput from '@/src/components/ui/inputs/MainInput';
import DashboardModal from '@/src/components/ui/modals/DashboardModal';
import { usePopupContext } from '@/src/context/PopupContext';
import {
  addWorkspace,
  addWorkspaceProject,
  useWorkspacesContext
} from '@/src/context/WorkspacesContext';
import { createProject } from '@/src/network/secure/project/createProject';
import { createWorkspace } from '@/src/network/secure/workspace/createWorkspace';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';

interface Props {
  hidePopup: () => void;
}

const AddProjectPopup: NextPage<Props> = ({ hidePopup }) => {
  const router = useRouter();

  const formEl = useRef<HTMLFormElement>(null);

  const [_, dispatch] = useWorkspacesContext();
  const [popupContext] = usePopupContext();

  const [error, setError] = useState('');

  const addProjectHandler = async (event: FormEvent<HTMLFormElement>) => {
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
        const project = await createProject({
          name: userData.name,
          description: '',
          type: 'private',
          image: '',
          workspaceId: popupContext.parentId!
        });
        if (project) {
          dispatch(addWorkspaceProject(project));
          router.push(`/project/${project.id}`);
        }
        hidePopup();
      } else {
        setError('Project name cannot be less than 4 characters and more than 25 characters');
      }
    }
  };

  return (
    <DashboardModal modalTitle="Add project">
      <form ref={formEl} onSubmit={addProjectHandler}>
        <MainInput
          labelText="Project name:"
          title="Project name"
          id="name"
          name="name"
          type="text"
        />
        <PrimaryButton btnText="Add Project" title="Add Project" btnType="submit" />
      </form>
      <span>{error}</span>
    </DashboardModal>
  );
};

export default AddProjectPopup;
