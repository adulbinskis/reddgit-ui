import { FC, useState } from 'react';
import './EditQuestion.scss'
import { observer } from 'mobx-react-lite';

import QuestionService from './services/QuestionService';
import { QuestionDetail } from './models/QuestionDetail';

type Props = {
    question: QuestionDetail
    onClose: () => void;
};

const Question: FC<Props> =({ question, onClose })=> {
    const [title, setTitle] = useState(question.title);
    const [content, setContent] = useState(question.content.replace(/<br\s*\/?>/gm, '\n'));

    const handleUpdate = async () => {
        try {
            const response = await QuestionService.updateQuestion(question.id, title, content.replace(/\n/g, '<br>'));
            question.content = response.data.content
            question.title = response.data.title
            onClose();
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    if (!question) {
        return null;
    }

    
    return (
      <div className='editQuestion'>
        <div className='editQuestion'>
            <h2>Edit Question</h2>
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
            <button onClick={handleUpdate}>Save</button>
        </div>

      </div>
    );
  }
  
  export default observer(Question)