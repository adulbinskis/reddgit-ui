import { FC, useContext, useEffect, useState } from 'react';
import './Answer.scss'
import { observer } from 'mobx-react-lite';

import { formatDate } from '../../utils/dateFormat';
import { AnswerDetail } from './models/AnswerDetail';
import Modal from '../../modal/modal';
import EditAnswer from './EditAnswer';
import AnswerService from './services/AnswerService';
import { Context } from '../../store/rootContextProvider';
import { useAnswers } from './state/AnswersContext';

type Props = {
    questionId: string;
};

const Answer: FC<Props> = ({ questionId }) => {
    const { store } = useContext(Context);
    const { answers, setAnswers } = useAnswers();

    const [editMode, setEditMode] = useState(false);
    const [answerToEdit, setAnswerToEdit] = useState<AnswerDetail>({} as AnswerDetail);

    useEffect(() => {
        const fetchData = async () => {
           const response = await AnswerService.getQuestionAnswers(questionId);
           setAnswers(response.data);
        }
        fetchData();
      }, [questionId, setAnswers]);

    const handleEditAnswer = (answer: AnswerDetail) => {
        setAnswerToEdit(answer);
    }

    const handleDeleteAnswer = async (answer: AnswerDetail) => {
        const response = await AnswerService.deleteAnswer(answer.id);
        removeAnswer(response.data.id);
    }

    const removeAnswer = (deletedAnswerId: string) => {
        const updatedAnswers = answers.filter(ans => ans.id !== deletedAnswerId);
        setAnswers(updatedAnswers);
    };
    

    if (!answers) {
        return null;
    }

    return (
      <div className='answer'>
        {answers.map((answer) => (
            <div className='answer__post' key={answer.id} >
                {store.user.userId === answer.userId?
                    <>
                        <button className='button button--outline-light' onClick={() =>{handleEditAnswer(answer); setEditMode(true)} }>
                            Edit
                        </button>
                        <button className='button button--outline-light' onClick={() => handleDeleteAnswer(answer)}> Delete </button>
                    </>:null


                }
                <h5 className='answer__post__user'>
                    {answer.userName}
                </h5>
                <div className='answer__post__content' dangerouslySetInnerHTML={{ __html: answer.content }} />
                <h6 className='answer__post__date'>
                    {formatDate(answer.createdAt, 'MM-dd-yyyy HH:mm')}
                </h6>
            </div>
        ))}
        <Modal modalOpen={editMode} onClose={() => setEditMode(false)}>
            <EditAnswer answer={answerToEdit} onClose={() => setEditMode(false)} />
        </Modal>
      </div>
    );
  }
  
  export default observer(Answer)