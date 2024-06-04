import { QuestionDetail } from "../../Question/models/QuestionDetail";

export interface PaginatedQuestions{
    questions: QuestionDetail[];
    totalPages: number;
}