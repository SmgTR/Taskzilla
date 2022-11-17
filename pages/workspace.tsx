import { getWorkspaces } from '@/network/secure/workspace/getAllWorkspaces';
import { FileInputButton } from '@/src/components/ui/buttons/FileInputButton';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { getMetaInfo } from 'tools/getMetaData';

export default function Workspace() {
  const sendData = () => {
    axios.post('/api/secure/workspace/createWorkspace', { name: 'Test' });
  };
  const getData = async () => {
    const workspace = await axios.get('/api/secure/workspace/cl8vu3jez0106cnq5cpr2fmmb');
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

  const onChange = async (formData: any) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event: any) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      }
    };

    const response = await axios.post('/api/secure/uploads/uploadAvatar', formData, config);

    console.log('response', response.data);
  };

  // const getPageData = async () => {
  //   const page = getMetaInfo('https://youtu.be/QaaExOfZ9eE');
  //   console.log(page);
  // };

  return (
    <>
      <button onClick={() => sendData()}>sendData</button>
      <button onClick={() => getData()}>getData</button>
      <button onClick={() => getAll()}>getAll</button>
      <button onClick={() => getProject()}>getProject</button>
      {/* <button onClick={() => getPageData()}>getMeta</button> */}
      <FileInputButton
        inputTitle={'User Avatar'}
        label="Upload Single File"
        uploadFileName="theFiles"
        onChange={onChange}
      />
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);

  return {
    props: { session }
  };
}
