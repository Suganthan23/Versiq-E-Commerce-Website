import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Container } from '@/components/Container';

const GenericPageSkeleton = () => {
  return (
    <Container className="py-32">
      <Skeleton className="h-12 w-1/3 mx-auto mb-8" />
      <div className="space-y-3 max-w-2xl mx-auto">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </Container>
  );
};

export default GenericPageSkeleton;