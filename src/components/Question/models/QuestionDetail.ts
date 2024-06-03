import { AnswerDetail } from '../../Answers/models/AnswerDetail';

export interface QuestionDetail{
    id: string;
    title: string;
    content: string;
    userName: string;
    userId: string;
    createdAt: Date;
}