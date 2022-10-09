import { getWorkspaces } from '@/src/network/secure/workspace/getAllWorkspaces';
import axios from 'axios';

export default function Login() {
  const sendData = () => {
    axios.post('/api/secure/workspace/createWorkspace', { name: 'Test' });
  };

  const getData = async () => {
    const workspace = await axios.get('/api/secure/workspace/cl8vu3jez0106cnq5cpr2fmmb');
    console.log(workspace);
  };

  const getAll = async () => {
    try {
      const workspace = await getWorkspaces();
      console.log(workspace);
    } catch {
      console.log();
    }
  };

  const getProject = async () => {
    const project = await axios.get('/api/secure/project/cl8xclxjd0000djq5x0un42ys');
    console.log(project);
  };

  return (
    <>
      <button onClick={() => sendData()}>sendData</button>
      <button onClick={() => getData()}>getData</button>
      <button onClick={() => getAll()}>getAll</button>
      <button onClick={() => getProject()}>getProject</button>
    </>
  );
}
