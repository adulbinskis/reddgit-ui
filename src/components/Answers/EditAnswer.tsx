import { FC, useEffect, useState } from 'react';
import './EditAnswer.scss'
import { observer } from 'mobx-react-lite';
import { AnswerDetail } from './models/AnswerDetail';
import AnswerService from './services/AnswerService';

type Props = {
    answer: AnswerDetail
    onClose: () => void;
};

const Question: FC<Props> =({ answer, onClose })=> {
    const [content, setContent] = useState(answer.content.replace(/<br\s*\/?>/gm, '\n'));

    const handleUpdate = async () => {
        try {
            const response = await AnswerService.updateAnswer(answer.id, content.replace(/\n/g, '<br>'));
            answer.content = response.data.content
            onClose();
        } catch (error) {
            console.error('Error updating answer:', error);
        }
    };

    if (!answer) {
        return null;
    }

    
    return (
      <div className='editAnswer'>
        <div className='editAnswer'>
            <h2>Edit Question</h2>
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