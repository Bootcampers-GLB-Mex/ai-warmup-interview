import Link from 'next/link';
import { fetchData } from './actions';

export default async function Warmup() {
  const result = await fetchData();
  console.log('result: ', result)
  return (
    <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 pb-20">
      <div className="relative pb-16">
        <div className="flex flex-col pt-8 pb-8 pl-10 pr-10">
          <h1 className="text-4xl font-semibold">Warmup Dashboard</h1>
        </div>
        <div className="flex flex-col pr-10  w-full p-12 m-auto bg-white pt-8">
          <div className="flex flex-col">
            {
              result.interviews.length > 0 ? (
                <h1 className="text-xl mb-4">Your warmups</h1>
              ) : <h1 className="text-xl mb-4">You don't have warmups yet</h1>
            }
            <Link className="text-green-500 hover:text-green-800" href="/warmup/interview">Quick Start</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
