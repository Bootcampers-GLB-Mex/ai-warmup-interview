'use client';

import Button from "@/components/Button/button";
import Navigation from "@/utils/homeNavigation";

export default function Warmup() {
  return (
    <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100 pb-20">
      <div className="relative pb-16">
        <Navigation />
        <div className="flex flex-col pt-8 pb-8 pl-10 pr-10">
          <h1 className="text-4xl font-semibold">Warmup Dashboard</h1>

          <p>This is a warmup page. It is used to test the routing and the authentication flow of the application.</p>
        </div>
        <div className="flex flex-col pr-10  w-full p-12 m-auto bg-white pt-8">
          <div className="flex flex-col">
            <h1 className="text-xl mb-4">Create interview </h1>

            <Button>I have an Access Code!</Button>
          </div>
        </div>
      </div>
      <h1>Warmup</h1>
    </div>
  );
}