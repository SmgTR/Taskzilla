import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { useRef, useState, FormEvent, FC, useEffect } from 'react';

import PrimaryButton from '@/src/components/ui/buttons/PrimaryButton';
import MainInput from '@/src/components/ui/inputs/MainInput';
import DashboardModal from '@/src/components/ui/modals/DashboardModal';
import { useProjectContext } from '@/src/context/ProjectContext';
import CircleLoader from '@/src/components/ui/loaders/CircleLoader';

import styles from './InviteMemberPopup.module.scss';

interface Props {
  hidePopup: () => void;
}

let notificationsSocket: Socket;

const InviteMemberPopup: FC<Props> = ({ hidePopup }) => {
  const formEl = useRef<HTMLFormElement>(null);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const projectContext = useProjectContext();

  useEffect(() => {
    fetch('/api/socket');
    notificationsSocket = io('/notifications');
  }, []);

  const sendInviteHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoader(true);
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
        .post('/api/secure/invitation/sendInvite', {
          receiverEmail: userData.email,
          projectId: projectContext[0].id ?? ''
        })
        .then(() => {
          setTimeout(() => {
            setLoader(false);
            setMessage('Invite successfully send');
            notificationsSocket.emit('send-notification', userData.email);
          }, 2000);
        })
        .catch((err) => {
          setTimeout(() => {
            setLoader(false);
            setError(err.response.data.error);
          }, 2000);
        });
    }
  };

  return (
    <div>
      <DashboardModal changeHandler={() => {}} modalTitle="Invite new project member">
        {loader && (
          <div className={styles.loaderBackdrop}>
            <CircleLoader styleClass={styles.loader} />
          </div>
        )}
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
