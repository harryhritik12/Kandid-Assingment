"use client";

import { ReactNode, useEffect, useRef } from "react";

type Props = {
  loadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
  children: ReactNode;
};

export default function InfiniteScroll({
  loadMore,
  hasMore,
  isLoading,
  children,
}: Props) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, isLoading, loadMore]);

  return (
    <>
      {children}
      <div ref={loaderRef} className="h-10 flex items-center justify-center">
        {isLoading && (
          <span className="text-sm text-muted-foreground">Loading...</span>
        )}
      </div>
    </>
  );
}
