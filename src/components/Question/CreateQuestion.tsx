import './CreateQuestion.scss'
import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';

import QuestionService from './services/QuestionService';
import { useQuestions } from './state/QuestionsProvider';

type Props = {
    onClose: () => void;
};

const QuestionCreate: FC<Props> = ({onClose}) => {
    const { questions, setQuestions } = useQuestions();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleCreate = async () => {
        try {
            const response = await QuestionService.createQuestion(title, content.replace(/\n/g, '<br>'));
            if (response && response.data) {
                setTitle('');
                setContent('');
                setQuestions([response.data, ...questions]);
                onClose();
            }
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    return (
        <div className='createQuestion'>
            <h2>Create New Question</h2>
            <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Content'
            ></textarea>
            <button onClick={handleCreate}>Save</button>
        </div>
    );
};

export default observer(QuestionCreate);
