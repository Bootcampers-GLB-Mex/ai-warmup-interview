'use client';

import renderQuestion from '../../utils/renderQuestion';
import renderCategories from '../../utils/renderCategories';
import Button from '../../components/Button/button';

export default function StepSix() {
  const question = 'Question text';

  const bodyContainerStyles = 'md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100 pb-20';

  const handlerClick = (option: number) => {
    console.log('option ', option);
  };

  const handlerButton = () => {
    console.log('click');
  };

  const classButtonOne = {
    marginRight: '20px',
    padding: '10px 60px',
    background: '#fff',
    color: '#058076',
    border: '1px solid #058076',
    fontWeight: 'normal',
  };

  const classButtonTwo = { padding: '10px 20px', fontWeight: 'normal' };

  return (
    <>
      <div className={bodyContainerStyles}>
        <div className="relative pb-16">
          <div className="flex flex-column pt-8 pb-8 pl-10 pr-10">
            <div>
              <div className="text-[#5C5C5C]">{renderQuestion(question, handlerClick)}</div>
              <div className="text-[#5C5C5C]">{renderCategories()}</div>
            </div>
          </div>
          <div className="float-right pr-10 absolute bottom-0 right-0 mb-4 mr-10">
            <Button title="Save" onClick={() => handlerButton()} style={classButtonOne}></Button>
            <Button title="Save & Add new" onClick={() => handlerButton()} style={classButtonTwo}></Button>
          </div>
        </div>
      </div>
    </>
  );
}
