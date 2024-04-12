'use client';

import renderQuestion from '../../utils/renderQuestion';
import renderCategories from '../../utils/renderCategories';
import Button from '../../components/Button/button';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/utils/homeNavigation';

export default function StepSix() {
  const router = useRouter();

  const bodyContainerStyles = 'md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100 pb-20';

  const handlerOpenQuestions = () => {
    router.push('/admin');
  };

  const handlerButton = () => {
    console.log('click');
  };

  const classButtonOne = {
    marginRight: '10px',
    padding: '10px 40px',
    background: '#fff',
    color: '#058076',
    border: '1px solid #058076',
    fontWeight: 'normal',
    maxWidth: '40%',
  };

  const classButtonTwo = { padding: '10px 20px', fontWeight: 'normal' };

  return (
    <>
      <div className={bodyContainerStyles}>
        <div className="relative pb-16">
          <Navigation />
          <div className="flex flex-col pt-8 pb-8 pl-10 pr-10">
            <h1 className="text-4xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex flex-col pr-10  w-full p-12 m-auto bg-white pt-8">
            <div className="flex flex-col">
              <h1 className="text-xl mb-4">Create interview </h1>

              <Button
                title="Create questions"
                handlerEvent={() => handlerOpenQuestions()}
                style={classButtonOne}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
