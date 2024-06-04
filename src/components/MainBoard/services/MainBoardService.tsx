import { AxiosResponse } from "axios";
import $api from "../../../http";
import { QuestionDetail } from "../../Question/models/QuestionDetail";
import { PaginatedQuestions } from "../models/PaginatedQuestions";

export default class MainBoardService {
    static async getQuestionsList(searchCriteria: string, page: number): Promise<AxiosResponse<PaginatedQuestions>> {
        return $api.get<PaginatedQuestions>('/question/getQuestionsList',{params: {searchCriteria: searchCriteria, page: page}})
    }
}