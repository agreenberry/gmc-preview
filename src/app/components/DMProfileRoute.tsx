import { useParams, useNavigate } from 'react-router';
import { DMProfilePage } from '@/app/components/DMProfilePage';
import { NotFoundPage } from '@/app/components/NotFoundPage';
import { mockDMs } from '@/data/mock/mockData';

export function DMProfileRoute() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const dm = mockDMs.find(d => d.id === id);
  
  if (!dm) {
    return <NotFoundPage />;
  }
  
  return <DMProfilePage dm={dm} onBack={() => navigate(-1)} />;
}
