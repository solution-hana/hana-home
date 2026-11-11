import { Navigate, useParams } from 'react-router-dom';

import Promotion from '@/domains/promotion';

import PageLayout from '@/shared/components/layout/PageLayout';

export default function PromotionPage() {
  const { type, id } = useParams();

  if (!type || !['social-contribution', 'column'].includes(type)) {
    return <Navigate to={`/promotion/social-contribution`} replace />;
  }

  return (
    <PageLayout>
      <Promotion type={type as 'social-contribution' | 'column'} id={id} />
    </PageLayout>
  );
}