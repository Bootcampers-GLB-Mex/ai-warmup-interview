'use client';

import Button from '@/components/Button/button';
import Input from '@/components/Input/input';

export default function Home() {
  return (
    <>
      <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100">
        <div className="z-10 font-sans text-5xl pl-10 pr-10">Welcome to G-Assessment</div>

        <div className="text-white-700 text-l text-center pt-8 pb-8 pl-10 pr-10">
          Lorem ipsum dolor sit amet consectetur adipiscing elit cursus arcu suscipit volutpat et gravida blandit
          taciti, dictumst praesent turpis conubia enim auctor morbi cras laoreet magnis habitasse felis rhoncus
          viverra.
        </div>

        <div className="lg:max-w-5xl lg:mb-0 lg:grid-cols-4 lg:text-left pl-10 pr-10 pt-8 pb-8">
          <Input title="Input your email" placeholder="my.use@globant.com"></Input>
        </div>

        <div className="pl-10 pr-10 pt-8 pb-8 flex items-center justify-center">
          <Button onClick={() => {}} title="New Assessment"></Button>
        </div>
      </div>
    </>
  );
}
