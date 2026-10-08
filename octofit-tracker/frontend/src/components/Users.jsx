import ResourceTable from './ResourceTable.jsx';
import { useCollection } from './useCollection.js';

const columns = [
  { field: 'username', label: 'Member' },
  { field: 'email', label: 'Email' },
  { field: 'team', label: 'Team' },
  { field: 'points', label: 'Points' },
];

export default function Users() {
  const collection = useCollection('/api/users/', fetch);
  return <ResourceTable title="Members" description="People and points across OctoFit." columns={columns} {...collection} />;
}