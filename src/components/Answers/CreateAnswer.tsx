import './CreateAnswer.scss';
import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import AnswerService from './services/AnswerService';
import { useQuestions } from '../Question/state/QuestionsProvider';
import { useAnswers } from './state/AnswersContext';


type Props = {
    onClose: () => void;
};

const CreateAnswer: FC<Props> = ({ onClose }) => {
    const [content, setContent] = useState('');
    const { question } = useQuestions();
    const { answers, setAnswers } = useAnswers();

    const handleCreate = async () => {
        try {
            const response = await AnswerService.createAnswer(question.id, content.replace(/\n/g, '<br>'));
            if (response && response.data) {
                setContent('');
                setAnswers([response.data, ...answers]);
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