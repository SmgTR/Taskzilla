import { getCsrfToken } from 'next-auth/react';
import { useState } from 'react';
import SignUpForm from '@/src/containers/SignUpForm';
import { CtxOrReq } from 'next-auth/client/_utils';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return <SignUpForm />;
}
