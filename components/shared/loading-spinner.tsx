"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
    </div>
  );
}
