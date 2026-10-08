import ResourceTable from './ResourceTable.jsx';
import { useCollection } from './useCollection.js';

const columns = [
  { field: 'name', label: 'Team' },
  { field: 'members', label: 'Members' },
];

export default function Teams() {
  const collection = useCollection('/api/teams/', fetch);
  return <ResourceTable title="Teams" description="Groups sharing goals and activity." columns={columns} {...collection} />;
}