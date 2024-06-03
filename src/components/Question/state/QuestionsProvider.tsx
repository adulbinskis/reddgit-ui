import React, { createContext, useState, useContext, FC } from 'react';
import { QuestionDetail } from '../models/QuestionDetail';

type Props = { children: React.ReactNode };

type QuestionsContextType = {
    questions: QuestionDetail[];
    setQuestions: React.Dispatch<React.SetStateAction<QuestionDetail[]>>;
    question: QuestionDetail;
    setQuestion: React.Dispatch<React.SetStateAction<QuestionDetail>>;
};

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

export const QuestionsProvider: FC<Props> = ({ children }) => {
    const [questions, setQuestions] = useState<QuestionDetail[]>([]);
    const [question, setQuestion] = useState<QuestionDetail>({} as QuestionDetail);

    return (
        <QuestionsContext.Provider value={{ questions, setQuestions, question, setQuestion }}>
            {children}
        </QuestionsContext.Provider>
    );
};

export const useQuestions = () => {
    const context = useContext(QuestionsContext);
    if (!context) {
        throw new Error('useQuestions must be used within a QuestionsProvider');
    }
    return context;
};
