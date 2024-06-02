import { FC, useContext, useEffect, useState } from 'react';
import './Answer.scss'
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

import { formatDate } from '../../utils/dateFormat';
import { AnswerDetail } from './models/AnswerDetail';

type Props = {
    answers: AnswerDetail[] 
};

const Answer: FC<Props> = ({ answers }) => {
    const {store} = useContext(Context);

    if (!answers) {
        return null;
    }

    return (
      <div className='answer'>
        {answers.map((answer) => (
            <div 
                className='answer__post' 
                key={answer.id} 
            >
                <h5 className='answer__post__user'>
                    {answer.userName}
                </h5>
                <h3 className='answer__post__content'>
                    {answer.content}
                </h3>
                <h6 className='answer__post__date'>
                    {formatDate(answer.createdAt, 'MM-dd-yyyy HH:mm')}
                </h6>
            </div>
        ))}
      </div>
    );
  }
  
  export default observer(Answer)