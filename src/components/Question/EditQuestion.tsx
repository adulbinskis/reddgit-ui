import React from 'react';
import './EditQuestion.scss';
import { observer } from 'mobx-react-lite';
import QuestionService from './services/QuestionService';
import { QuestionDetail } from './models/QuestionDetail';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type Props = {
    question: QuestionDetail;
    onClose: () => void;
};

const EditQuestion: React.FC<Props> = ({ question, onClose }) => {
    const initialValues = {
        title: question.title,
        content: question.content.replace(/<br\s*\/?>/gm, '\n')
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

    const handleUpdate = async (values: { title: string; content: string }) => {
        try {
            const response = await QuestionService.updateQuestion(question.id, values.title, values.content.replace(/\n/g, '<br>'));
            question.title = response.data.title;
            question.content = response.data.content;
            onClose();
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    return (
        <div className='editQuestion'>
            <h2>Edit Question</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleUpdate(values)}
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

export default observer(EditQuestion);
