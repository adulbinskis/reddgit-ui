import React from 'react';
import './EditAnswer.scss';
import { observer } from 'mobx-react-lite';
import { AnswerDetail } from './models/AnswerDetail';
import AnswerService from './services/AnswerService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type Props = {
    answer: AnswerDetail;
    onClose: () => void;
};

const EditAnswer: React.FC<Props> = ({ answer, onClose }) => {
    const initialValues = {
        content: answer.content.replace(/<br\s*\/?>/gm, '\n')
    };

    const validationSchema = Yup.object({
        content: Yup.string()
        .required('Content is required')
        .min(10, 'Content must be at least 10 characters long')
        .max(2048, 'Content must be at most 2048 characters long')
    });

    const handleUpdate = async (values: { content: string }) => {
        try {
            const response = await AnswerService.updateAnswer(answer.id, values.content.replace(/\n/g, '<br>'));
            answer.content = response.data.content;
            onClose();
        } catch (error) {
            console.error('Error updating answer:', error);
        }
    };

    return (
        <div className='editAnswer'>
            <h2>Edit Answer</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleUpdate(values)}
            >
                {({ isValid, dirty }) => (
                    <Form>
                        <div>
                            <Field
                                as="textarea"
                                name="content"
                                placeholder='Content'
                            />
                            <ErrorMessage name="content" component="div" className="error" />
                        </div>
                        <button type="submit" disabled={!(isValid && dirty)}>
                            Save
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default observer(EditAnswer);
