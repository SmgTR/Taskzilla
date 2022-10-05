import axios from 'axios';

export default function Login() {
  const sendData = () => {
    axios.post('/api/workspace/createWorkspace', { name: 'Test' });
  };

  const getData = async () => {
    const workspace = await axios.get('/api/workspace/cl8vu3jez0106cnq5cpr2fmmb');
    console.log(workspace);
  };

  return (
    <>
      Not signed in <br />
      <button onClick={() => sendData()}>sendData</button>
      <button onClick={() => getData()}>getData</button>
    </>
  );
}
