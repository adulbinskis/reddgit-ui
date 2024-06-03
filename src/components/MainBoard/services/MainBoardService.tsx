import { AxiosResponse } from "axios";
import $api from "../../../http";
import { QuestionDetail } from "../../Question/models/QuestionDetail";

export default class MainBoardService {
    static async getQuestionsList(searchCriteria: string): Promise<AxiosResponse<QuestionDetail[]>> {
        return $api.get<QuestionDetail[]>('/question/getQuestionsList',{params: {searchCriteria: searchCriteria}})
    }
}