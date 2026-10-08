import ResourceTable from './ResourceTable.jsx';
import { useCollection } from './useCollection.js';

const columns = [
  { field: 'title', label: 'Workout' },
  { field: 'difficulty', label: 'Level' },
  { field: 'duration', label: 'Minutes' },
  { field: 'exercises', label: 'Exercises' },
];

export default function Workouts() {
  const collection = useCollection('/api/workouts/', fetch);
  return <ResourceTable title="Workouts" description="Suggested sessions for your next training day." columns={columns} {...collection} />;
}