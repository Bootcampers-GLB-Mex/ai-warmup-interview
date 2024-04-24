import Button from "@/components/Button/button";
import { info } from "console";
import Link from "next/link";

export interface InterviewDescriptionProps {
  title: string;
  id: string;
  info: string[];
}

export const InterviewDescription = ({
  title,
  id,
  info
}: InterviewDescriptionProps) => {
  return (
    <div className="mt-6 mb-6 border-b border-gray-300">
      <dl className="divide-y divide-gray-300">
        <div className="px-4 py-3 flex justify-between items-center">
          <dt className="text-sm font-med font-semibold" leading-6 text-gray900>{title}</dt>
          <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
            <div className="flex divide-x divide-gray-300">
              {info.map((item) => (
                <div className="text-center text-gray-500 px-2">{item}</div>
              ))}
            </div>
          </dd>
          <dd>
            <Link className="text-green-500 hover:text-green-900" href={`/warmup/feedback/${id}`}>See feedback</Link>
          </dd>
        </div>
      </dl>
    </div>
  );
}