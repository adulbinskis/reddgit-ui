import './CreateAnswer.scss';
import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react-lite';
import AnswerService from './services/AnswerService';
import { useQuestions } from '../Question/state/QuestionsProvider';
import { useAnswers } from './state/AnswersContext';

type Props = {
    onClose: () => void;
};

const CreateAnswer: FC<Props> = ({ onClose }) => {
    const { question } = useQuestions();
    const { answers, setAnswers } = useAnswers();

    const formik = useFormik({
        initialValues: {
            content: '',
        },
        validationSchema: Yup.object({
            content: Yup.string()
                .required('Content is required')
                .min(10, 'Content must be at least 10 characters long')
                .max(2048, 'Content must be at most 2048 characters long'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await AnswerService.createAnswer(question.id, values.content.replace(/\n/g, '<br>'));
                if (response && response.data) {
                    setAnswers([response.data, ...answers]);
                    onClose();
                }
            } catch (error) {
                console.error('Error creating answer:', error);
            }
        },
    });

    return (
        <div className='createAnswer'>
            <h2>Create New Answer</h2>
            <form onSubmit={formik.handleSubmit}>
                <textarea
                    id="content"
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Content'
                ></textarea>
                {formik.touched.content && formik.errors.content ? (
                    <div className="error">{formik.errors.content}</div>
                ) : null}
                <button type="submit" disabled={!formik.isValid}>Save</button>
            </form>
        </div>
    );
};

export default observer(CreateAnswer);
