import SearchInput from '@/src/components/ui/inputs/SearchInput';
import { NextPage } from 'next';
import WorkspacesList from './workspacesList/WorkspacesList';

import useSWR from 'swr';
import { WorkspaceProvider } from '@/src/context/WorkspacesContext';

interface Props {}

const ProjectNavigation: NextPage<Props> = ({}) => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR('/api/secure/workspace/getAllWorkspaces', fetcher);
  if (!data) return <p> Loading...</p>;
  if (error) return <p>Something went wrong please try again</p>;
  return (
    <div>
      <WorkspaceProvider memberIn={data.memberIn ?? []} guestIn={data.guestIn ?? []}>
        <SearchInput searchText="Search here..." />
        <WorkspacesList />
      </WorkspaceProvider>
    </div>
  );
};

export default ProjectNavigation;
