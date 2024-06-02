import { FC, useContext, useEffect, useState } from 'react';
import './Question.scss'
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { useParams } from 'react-router-dom';

import QuestionService from './services/QuestionService';
import { QuestionDetail } from './models/QuestionDetail';
import { formatDate } from '../../utils/dateFormat';
import Answer from '../Answers/Answer';
import Modal from '../../modal/modal';
import EditQuestion from './EditQuestion';
import CreateAnswer from '../Answers/CreateAnswer';

const Question: FC =()=> {
    const { id } = useParams<{ id: string }>();
    const {store} = useContext(Context);
    const [question, setQuestion] = useState<QuestionDetail>({} as QuestionDetail);
    const [editMode, setEditMode] = useState(false);
    const [createAnswerOpen, setCreateAnswerOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          if (id) {
            const response = await QuestionService.getQuestionWithAnswers(id);
            setQuestion(response.data);
          }
        };
        fetchData();
    }, [id]);

    const removeAnswer = (deletedAnswerId: string) => {
        const updatedAnswers = question.answers.filter(ans => ans.id !== deletedAnswerId);
        setQuestion(prevQuestion => ({
            ...prevQuestion,
            answers: updatedAnswers
        }));
    };

    if (!question) {
        return null;
    }

    
    return (
      <div className='question'>
        {
            <div 
                className='question__post' 
                key={question.id} 
            >
                {store.user.userId === question.userId?
                    <button 
                        className='button button--outline-light' 
                        onClick={() => setEditMode(true)}
                    >
                        Edit
                    </button>: null
                }
                {store.isAuth ?
                    <button 
                        className='button button--outline-light' 
                        onClick={() => setCreateAnswerOpen(true)}
                    >
                        Answer
                    </button>: null
                }
                
                <h5 className='question__post__user'>
                    {question.userName}
                </h5>
                <h2 className='question__post__title'>
                    {question.title}
                </h2>
                <div className='question__post__content' dangerouslySetInnerHTML={{ __html: question.content }} />
                <h6 className='question__post__date'>
                    {formatDate(question.createdAt, 'MM-dd-yyyy HH:mm')}
                </h6>
            </div>
        }
        <Modal modalOpen={createAnswerOpen} onClose={() => setCreateAnswerOpen(false)}>
            <CreateAnswer setQuestion={setQuestion} question={question} onClose={() => setCreateAnswerOpen(false)}/>
        </Modal>
        <Modal modalOpen={editMode} onClose={() => setEditMode(false)}>
            <EditQuestion question={question} onClose={() => setEditMode(false)}/>
        </Modal>
        <Answer removeAnswer={removeAnswer} answers={question.answers}/>
      </div>
    );
  }
  
  export default observer(Question)

  