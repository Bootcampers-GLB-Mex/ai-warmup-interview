import { cookies } from "next/headers";
import { InterviewResponse } from "./interview/actions";

export interface InterviewsResponse {
  interviews: InterviewResponse[];
}
export async function fetchData(): Promise<InterviewsResponse> {
  try {
    const cookieSession = cookies().get('session')?.value;
    const session = JSON.parse(atob(cookieSession!));
    const userId = session.user.uid;
    const response = await fetch(`http://localhost:3003/interviews/all?userId=${userId}`);
    return response.json();
  } catch (e: any) {
    console.error(e);
    return { interviews: [] };
  }
}
