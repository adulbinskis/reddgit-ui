import React, {FC, useState, useContext} from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import './Login.scss';

type Props = {
    onClose: () => void;
};

const Login: FC<Props> = ({ onClose }) => {
    const {store} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
           await store.login(email, password);
            setSuccess('Registration successful!');
            onClose();
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return(
        <main className="login-form">
        <form onSubmit={handleSubmit}>
            <h1 className="login-form__title">Please login</h1>
    
            <div className="login-form__field">
                <input
                    type="email"
                    className="login-form__input"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div className="login-form__field">
                <input
                    type="password"
                    className="login-form__input"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
    
            {error && <div className="login-form__error">{error}</div>}
            {success && <div className="login-form__success">{success}</div>}
    
            <button className="login-form__button" type="submit">
                Login
            </button>
        </form>
    </main>
    )
}

export default observer(Login)