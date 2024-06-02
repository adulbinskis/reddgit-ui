import { FC, useContext, useEffect, useState } from 'react';
import './Question.scss'
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { useParams } from 'react-router-dom';

import QuestionService from './services/QuestionService';
import { QuestionDetail } from './models/QuestionDetail';
import { formatDate } from '../../utils/dateFormat';
import Answer from '../Answers/Answer';

const Question: FC =()=> {
    const { id } = useParams<{ id: string }>();
    const {store} = useContext(Context);
    const [question, setQuestion] = useState<QuestionDetail>({} as QuestionDetail);

    useEffect(() => {
        const fetchData = async () => {
          if (id) {
            const response = await QuestionService.getQuestionWithAnswers(id);
            setQuestion(response.data);
          }
        };
        fetchData();
    }, [id]);

    if (!question) {
        return null;
    }

    
    return (
      <div className='question'>
        {
            <div 
                className='question__post' 
                key={question.id} 
                onClick={() => window.location.href = `/question/${question.id}`
            }>
                <h5 className='question__post__user'>
                    {question.userName}
                </h5>
                <h2 className='question__post__title'>
                    {question.title}
                </h2>
                <h3 className='question__post__content'>
                    {question.content}
                </h3>
                <h6 className='question__post__date'>
                    {formatDate(question.createdAt, 'MM-dd-yyyy HH:mm')}
                </h6>
            </div>
        }
        <Answer answers={question.answers}/>
      </div>
    );
  }
  
  export default observer(Question)

  