import { info } from "console";

export interface InterviewDescriptionProps {
  title: string;
  info: string[];
}

export const InterviewDescription = ({
  title,
  info
}: InterviewDescriptionProps) => {
  return (
    <div className="mt-6 border-t border-gray-100">
      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-med" leading-6 text-gray900>{title}</dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div className="grid grid-cols-3 divide-x divide-gray-600">
              {info.map((item) => (
                <div>{item}</div>
              ))}
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}