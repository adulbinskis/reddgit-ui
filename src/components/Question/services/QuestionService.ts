import { AxiosResponse } from "axios";
import $api from "../../../http";
import { QuestionDetail } from "../models/QuestionDetail";

export default class QuestionService {
    static async getQuestionWithAnswers(questionId: string): Promise<AxiosResponse<QuestionDetail>> {
        return $api.get<QuestionDetail>('/question/getQuestionWithAnswers',{params: {questionId: questionId}})
    }
}