import React, { createContext, useState, useContext, FC } from 'react';
import { AnswerDetail } from '../models/AnswerDetail';

type Props = { children: React.ReactNode };

type AnswersContextType = {
    answers: AnswerDetail[];
    setAnswers: React.Dispatch<React.SetStateAction<AnswerDetail[]>>;
};

const AnswersContext = createContext<AnswersContextType | undefined>(undefined);

export const AnswersProvider: FC<Props> = ({ children }) => {
    const [answers, setAnswers] = useState<AnswerDetail[]>([]);

    return (
        <AnswersContext.Provider value={{ answers, setAnswers }}>
            {children}
        </AnswersContext.Provider>
    );
};

export const useAnswers = () => {
    const context = useContext(AnswersContext);
    if (!context) {
        throw new Error('useAnswers must be used within an AnswersProvider');
    }
    return context;
};
