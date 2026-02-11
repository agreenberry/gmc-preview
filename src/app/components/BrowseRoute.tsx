import { useNavigate } from 'react-router';
import { HomePage } from '@/app/components/HomePage';
import { mockDMs } from '@/data/mock/mockData';

export function BrowseRoute() {
  const navigate = useNavigate();
  
  const handleSelectDM = (dmId: string) => {
    navigate(`/dm/${dmId}`);
  };
  
  return <HomePage dms={mockDMs} onSelectDM={handleSelectDM} />;
}
