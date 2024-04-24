'use client';

import { useEffect, useState } from "react";
import { fetchInterview } from "../../actions";

export interface PendingPageProps {
  params: { id: string };
}
export default function PendingPage({ params }: PendingPageProps) {
  useEffect(() => {
    async function fetchData() {
      const result = await fetchInterview(params.id);
      console.log(result);
      return result;
    }

    setInterval(() => {
      fetchData();
    }, 2000);
  }, []);
  return (
    <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-gray-300 flex items-center justify-center">
      <h1>Processing...</h1>
    </div>
  )
}
