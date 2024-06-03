import { AxiosResponse } from "axios";
import $api from "../../../http";
import { AnswerDetail } from "../models/AnswerDetail";

export default class AnswerService {

    
    static async getQuestionAnswers(questionId: string): Promise<AxiosResponse<AnswerDetail[]>> {
        return $api.get<AnswerDetail[]>('/answer/getQuestionAnswers',{params: {questionId: questionId}})
    }

    static async createAnswer(questionId: string, content: string): Promise<AxiosResponse<AnswerDetail>> {
        return $api.post<AnswerDetail>('/answer/createAnswer', {questionId, content})
    }

    static async updateAnswer(answerId: string, content: string): Promise<AxiosResponse<AnswerDetail>> {
        return $api.put<AnswerDetail>('/answer/updateAnswer', {answerId, content})
    }

    static async deleteAnswer(answerId: string): Promise<AxiosResponse<AnswerDetail>> {
        return $api.delete<AnswerDetail>('/answer/deleteAnswer', {
            data: { answerId: answerId }
        });
    }

}