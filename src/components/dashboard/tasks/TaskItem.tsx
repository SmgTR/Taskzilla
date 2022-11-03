import { NextPage } from 'next';

interface Props {
  name: string;
}

const TaskItem: NextPage<Props> = ({ name }) => {
  return <li>{name}</li>;
};

export default TaskItem;
