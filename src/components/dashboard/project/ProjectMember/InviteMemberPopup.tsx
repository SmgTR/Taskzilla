import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import MainInput from '@/src/components/ui/inputs/MainInput';
import DashboardModal from '@/src/components/ui/modals/DashboardModal';
import { useProjectContext } from '@/src/context/ProjectContext';

import styles from './InviteMemberPopup.module.scss';

import axios from 'axios';
import { NextPage } from 'next';
import { useRef, useState, FormEvent } from 'react';

interface Props {
  hidePopup: () => void;
}

const InviteMemberPopup: NextPage<Props> = ({ hidePopup }) => {
  const formEl = useRef<HTMLFormElement>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const projectContext = useProjectContext();

  const sendInviteHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (formEl.current) {
      const formInputs = Array.from(formEl.current.elements) as HTMLInputElement[];
      const inputType = formInputs.filter((element) => {
        if (element.name) return element;
      });
      const submittedValues = inputType.map((input) => {
        return { [input.name]: input.value };
      });

      const userData = Object.assign({}, ...submittedValues);

      await axios
        .post('/api/secure/invite/sendInvite', {
          receiverEmail: userData.email,
          projectId: projectContext[0].id ?? ''
        })
        .then((data) => {
          setMessage('Invite successfully send');
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.error);
        });
    }
  };

  return (
    <div>
      <DashboardModal modalTitle="Invite new project member">
        <p className={styles.infoText}>Currently, you can invite only already registered users.</p>
        <form ref={formEl} onSubmit={sendInviteHandler}>
          <MainInput
            labelText="User email:"
            title="User email"
            id="email"
            name="email"
            type="email"
          />
          <PrimaryButton btnText="Invite" title="Send invite" btnType="submit" />
        </form>
        <p>
          <span className={styles.errorText}>{error}</span>
          <span className={styles.successText}>{message}</span>
        </p>
      </DashboardModal>
    </div>
  );
};

export default InviteMemberPopup;
