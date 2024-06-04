import './CreateQuestion.scss';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import QuestionService from './services/QuestionService';
import { useQuestions } from './state/QuestionsProvider';

type Props = {
    onClose: () => void;
};

const QuestionCreate: FC<Props> = ({ onClose }) => {
    const { questions, setQuestions } = useQuestions();

    const initialValues = {
        title: '',
        content: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Title is required')
            .min(5, 'Title must be at least 5 characters long')
            .max(128, 'Title must be at most 128 characters long'),
        content: Yup.string()
            .required('Content is required')
            .min(10, 'Content must be at least 10 characters long')
            .max(2048, 'Content must be at most 2048 characters long')
    });

    const handleCreate = async (values: { title: string; content: string }) => {
        try {
            const response = await QuestionService.createQuestion(values.title, values.content.replace(/\n/g, '<br>'));
            if (response && response.data) {
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
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleCreate(values);
                    resetForm();
                }}
            >
                {({ isValid, dirty }) => (
                    <Form>
                        <div>
                            <Field
                                type='text'
                                name='title'
                                placeholder='Title'
                            />
                            <ErrorMessage name='title' component='div' className='error' />
                        </div>
                        <div>
                            <Field
                                as='textarea'
                                name='content'
                                placeholder='Content'
                            />
                            <ErrorMessage name='content' component='div' className='error' />
                        </div>
                        <button type='submit' disabled={!(isValid && dirty)}>
                            Save
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default observer(QuestionCreate);
