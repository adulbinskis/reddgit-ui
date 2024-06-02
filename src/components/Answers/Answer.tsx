import { FC, useContext, useEffect, useState } from 'react';
import './Answer.scss'
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

import { formatDate } from '../../utils/dateFormat';
import { AnswerDetail } from './models/AnswerDetail';
import Modal from '../../modal/modal';
import EditAnswer from './EditAnswer';

type Props = {
    answers: AnswerDetail[] 
};

const Answer: FC<Props> = ({ answers }) => {
    const {store} = useContext(Context);
    const [editMode, setEditMode] = useState(false);
    const [answerToEdit, setAnswerToEdit] = useState<AnswerDetail>({} as AnswerDetail);

    useEffect(() => {
        if (answerToEdit && answerToEdit.content) {
            answers.map((ans) => {
                if (ans.id === answerToEdit.id) {
                    return { content: answerToEdit.content };
                }
                return ans;
            });
        }
    }, [answerToEdit, answers]);

    const handleEditAnswer = (answer: AnswerDetail) => {
        setAnswerToEdit(answer);
    }

    if (!answers) {
        return null;
    }

    return (
      <div className='answer'>
        {answers.map((answer) => (
            <div className='answer__post' key={answer.id} >
                {store.user.userId === answer.userId?
                    <button 
                        className='button button--outline-light' 
                        onClick={() =>{handleEditAnswer(answer); setEditMode(true)} }
                    >
                        Edit
                    </button>: null
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