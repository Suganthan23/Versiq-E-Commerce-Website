import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils'; 

const SkeletonCard = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-80 w-full rounded-lg" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  </div>
);

const ProductGridSkeleton = ({ count = 9, className }) => {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;