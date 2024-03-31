export interface GenericResponseMessage {
  message: string;
}

export interface GenericErrorResponseMessage extends GenericResponseMessage {
  error: string;
}

/**
 * GET /warmups/:access_code
 * Business requirements:
 * - We need to display the title of the warmup
 * - We need to display the score of the warmup
 * - We need to display the date of completion of the warmup
 * - We need to display the time spent on the warmup
 * - We need to get the ID of the warmup
 */
export interface WarmupResponse extends GenericResponseMessage {
  title: string;
  score: number;
  date: string;
  timeSpent: string;
  id: string;
}

/**
 * GET /warmups
 * Business requirements:
 * - Displays the list of warmups
 * - Displays a pagination of the warmups
 * - Displays the total number of warmups
 */
export interface WarmupsResponse extends GenericResponseMessage {
  warmups: WarmupResponse[];
  total: number;
  next: string;
  previous: string;
}

/**
 * POST /warmup/:id/answers
 * Business requirements:
 * - We need to display the question
 * - We need to get the ID of the question
 */
export interface WarmupQuestionResponse extends GenericResponseMessage {
  question: string;
  id: string;
}

/**
 * POST /warmup/:id/feedback/status
 * Business requirements:
 * - We need to know if the feedback is ready to get
 */
export interface WarmupFeedbackStatusResponse extends GenericResponseMessage {
  ready: 'PENDING' | 'READY' | 'ERROR';
}

/**
 * POST /warmup/:id/feedback
 * Business requirements:
 * - We need to display the feedback
 */
export interface WarmupFeedbackResponse extends GenericResponseMessage {
  feedback: string;
}
