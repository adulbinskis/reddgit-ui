import { AxiosResponse } from "axios";
import $api from "../../../http";
import { QuestionDetail } from "../models/QuestionDetail";

export default class QuestionService {
    static async getQuestionWithAnswers(questionId: string): Promise<AxiosResponse<QuestionDetail>> {
        return $api.get<QuestionDetail>('/question/getQuestionWithAnswers',{params: {questionId: questionId}})
    }

    static async createQuestion(title: string, content: string): Promise<AxiosResponse<QuestionDetail>> {
        return $api.post<QuestionDetail>('/question/CreateQuestion', {title, content})
    }

    static async updateQuestion(questionId: string, title: string, content: string): Promise<AxiosResponse<QuestionDetail>> {
        return $api.put<QuestionDetail>('/question/UpdateQuestion', {questionId, title, content})
    }

    static async deleteQuestion(questionId: string): Promise<AxiosResponse<QuestionDetail>> {
        return $api.delete<QuestionDetail>('/question/DeleteQuestion', {params: {questionId: questionId}})
    }
}