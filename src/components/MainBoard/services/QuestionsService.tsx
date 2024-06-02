import { AxiosResponse } from "axios";
import $api from "../../../http";
import { QuestionsResponse } from "../models/QuestionsResponse";

export default class QuestionsService {
    static async getQuestionsList(searchCriteria: string): Promise<AxiosResponse<QuestionsResponse[]>> {
        return $api.get<QuestionsResponse[]>('/question/getQuestionsList',{params: {searchCriteria: searchCriteria}})
    }
}