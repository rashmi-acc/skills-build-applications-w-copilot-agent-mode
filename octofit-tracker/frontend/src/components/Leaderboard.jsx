import ResourceTable from './ResourceTable.jsx';
import { useCollection } from './useCollection.js';

const columns = [
  { field: 'rank', label: 'Rank' },
  { field: 'user', label: 'Member' },
  { field: 'points', label: 'Points' },
  { field: 'period', label: 'Period' },
];

export default function Leaderboard() {
  const collection = useCollection('/api/leaderboard/', fetch);
  return <ResourceTable title="Leaderboard" description="Points earned across the current competition." columns={columns} {...collection} />;
}