import ResourceTable from './ResourceTable.jsx';
import { useCollection } from './useCollection.js';

const columns = [
  { field: 'type', label: 'Activity' },
  { field: 'user', label: 'Member' },
  { field: 'duration', label: 'Minutes' },
  { field: 'distance', label: 'Distance (km)' },
  { field: 'date', label: 'Date' },
];

export default function Activities() {
  const collection = useCollection('/api/activities/', fetch);
  return <ResourceTable title="Activities" description="Recent training logged by your teams." columns={columns} {...collection} />;
}