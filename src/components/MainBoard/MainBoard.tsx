import { FC, useEffect, useState } from 'react';
import './MainBoard.scss'
import { observer } from 'mobx-react-lite';
import MainBoardService from './services/MainBoardService';
import { formatDate } from '../../utils/dateFormat';
import { useQuestions } from '../Question/state/QuestionsProvider';

const MainBoard: FC =()=> {
  const { questions, setQuestions } = useQuestions();
  const [searchCriteria, setSearchCriteria] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
       const response = await MainBoardService.getQuestionsList(searchCriteria, currentPage);
       setQuestions(response.data.questions);
       setTotalPages(response.data.totalPages);
    }
    fetchData();
  }, [currentPage, searchCriteria, setQuestions]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <div className='mainBoard'>
      <div className='mainBoard__search'>
          <input 
            className='mainBoard__input' 
            onChange={(e) => {setSearchCriteria(e.target.value); setCurrentPage(1)}}
            placeholder='Search...'
          >
        </input>
      </div>

      <div className='pagination'>
        <span className='pagination__counter'>Page {currentPage} of {totalPages}</span>
        {currentPage !== totalPages?<button className='button button--outline-light' onClick={handleNextPage} >Next</button>:null}
        {currentPage !== 1?<button className='button button--outline-light' onClick={handlePrevPage}>Previous</button>: null}
      </div>

      {
        questions.map((question) => 
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
            <div className='question__post__content' dangerouslySetInnerHTML={{ __html: question.content }} />
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