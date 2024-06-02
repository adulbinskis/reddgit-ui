import './CreateAnswer.scss';
import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import AnswerService from './services/AnswerService';
import { QuestionDetail } from '../Question/models/QuestionDetail';


type Props = {
    question: QuestionDetail;
    onClose: () => void;
    setQuestion: React.Dispatch<React.SetStateAction<QuestionDetail>>
};

const CreateAnswer: FC<Props> = ({onClose, question, setQuestion}) => {
    const [content, setContent] = useState('');

    const handleCreate = async () => {
        try {
            const response = await AnswerService.createAnswer(question.id, content.replace(/\n/g, '<br>'));
            if (response && response.data) {
                setContent('');
                setQuestion({ ...question, answers: [response.data, ...question.answers] });
                onClose();
            }

        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    return (
        <div className='createAnswer'>
            <h2>Create New Answer</h2>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Content'
            ></textarea>
            <button onClick={handleCreate}>Save</button>
        </div>
    );
};

export default observer(CreateAnswer);