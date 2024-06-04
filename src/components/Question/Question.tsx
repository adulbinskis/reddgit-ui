import { FC, useContext, useEffect, useState } from 'react';
import './Question.scss'
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import QuestionService from './services/QuestionService';
import { formatDate } from '../../utils/dateFormat';
import Answer from '../Answers/Answer';
import Modal from '../../modal/modal';
import EditQuestion from './EditQuestion';
import { Context } from '../../store/rootContextProvider';
import { useQuestions } from './state/QuestionsProvider';
import CreateAnswer from '../Answers/CreateAnswer';

const Question: FC =()=> {
    const { id } = useParams<{ id: string }>();
    const {store} = useContext(Context);
    const { question, setQuestion } = useQuestions();
    
    const [editMode, setEditMode] = useState(false);
    const [createAnswerOpen, setCreateAnswerOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          if (id) {
            const response = await QuestionService.getQuestion(id);
            setQuestion(response.data);
          }
        };
        fetchData();
    }, [id, setQuestion]);

    const handleDeleteQuestion = async (questionId: string) => {
        const response = await QuestionService.deleteQuestion(questionId);
        setQuestion(response.data);
    }

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
                <>
                    <button className='button button--outline-light' onClick={() => {handleDeleteQuestion(question.id); window.location.href = `/` }}>
                        Delete
                    </button>
                    <button className='button button--outline-light' onClick={() => setEditMode(true)}
                    >
                        Edit
                    </button>
                </>: null
                    
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
            <CreateAnswer onClose={() => setCreateAnswerOpen(false)}/>
        </Modal>
        <Modal modalOpen={editMode} onClose={() => setEditMode(false)}>
            <EditQuestion question={question} onClose={() => setEditMode(false)}/>
        </Modal>
        <Answer questionId={question.id}/>
      </div>
    );
  }
  
  export default observer(Question)

  