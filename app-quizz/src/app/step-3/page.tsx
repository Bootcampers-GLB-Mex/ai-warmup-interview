export default function StepThree() {
  return (
    <>
    <div className="md:container md:mx-auto min-h-full ml-4 mr-4 pt-32 bg-teal-100">

      <div className="z-10 font-sans text-2xl text-teal-900 pl-10 pr-10 flex items-center justify-center">
        Choose Speciality:
      </div>

      <div className="flex flex-row text-l text-center pt-8 pb-8 pl-10 pr-10">
        <div className="basis-1/4 md:basis-1/3">
          <button className="bg-white w-40 hover:text-teal-600 text-teal-900 font-semibold py-2 px-4 border border-teal-900 hover:border-teal-700 rounded-full">
            Full Stack
          </button>
        </div>
        <div className="basis-1/4 md:basis-1/3">
          <button className="bg-white w-40 hover:text-teal-600 text-teal-900 font-semibold py-2 px-4 border border-teal-900 hover:border-teal-700 rounded-full">
            Front End
          </button>
        </div>
        <div className="basis-1/2 md:basis-1/3">
          <button className="bg-white w-40 hover:text-teal-600 text-teal-900 font-semibold py-2 px-4 border border-teal-900 hover:border-teal-700 rounded-full">
            Back End
          </button>
        </div>
      </div>

    </div>
    </>
  );
}
