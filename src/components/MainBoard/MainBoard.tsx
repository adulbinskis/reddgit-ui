import { FC, useEffect, useState } from 'react';
import './MainBoard.scss'
import { observer } from 'mobx-react-lite';
import { QuestionsResponse } from './models/QuestionsResponse';
import MainBoardService from './services/MainBoardService';
import { formatDate } from '../../utils/dateFormat';

const MainBoard: FC =()=> {
  const [questionsList, setQuestionsList] = useState<QuestionsResponse[]>([] as QuestionsResponse[]);
  const [searchCriteria, setSearchCriteria] = useState('');

  useEffect(() => {
    const fetchData = async () => {
       const response = await MainBoardService.getQuestionsList(searchCriteria);
       setQuestionsList(response.data);
    }
    fetchData();
  }, [searchCriteria]);

    return (
      <div className='mainBoard'>
        <div className='mainBoard__search'>
            <input 
              className='mainBoard__input' 
              onChange={(e) => setSearchCriteria(e.target.value)}
              placeholder='Search...'
            >
          </input>
        </div>

        {
          questionsList.map((question) => 
            <div 
              className='mainBoard__post' 
              key={question.id} 
              onClick={() => window.location.href = `/question/${question.id}`
            }>
              <h5 className='mainBoard__post__user'>
                {question.userName}
              </h5>
              <h2 className='mainBoard__post__title'>
                {question.title}
              </h2>
              <h3 className='mainBoard__post__content'>
                {question.content}
              </h3>
              <h6 className='mainBoard__post__date'>
                {formatDate(question.createdAt, 'MM-dd-yyyy HH:mm')}
              </h6>
            </div>
          )
        }
      </div>
    );
  }
  
  export default observer(MainBoard)