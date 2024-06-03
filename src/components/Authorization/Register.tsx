import React, {FC, useState, useContext} from 'react';
import { observer } from 'mobx-react-lite';
import './Register.scss'
import { Context } from '../../store/rootContextProvider';

type Props = {
    onClose: () => void;
    openLogin: () => void;
};

const Register: FC<Props> = ({ onClose, openLogin }) =>{
    const {store} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await store.registration(email, userName, password);
            setSuccess('Registration successful!');
            onClose();
            openLogin();
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return(
        <main className="register-form">
            <form onSubmit={handleSubmit}>
                <h1 className="register-form__title">Please register</h1>

                <div className="register-form__field">
                    <input
                        type="email"
                        className="register-form__input"
                        id="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="register-form__field">
                    <input
                        type="text"
                        className="register-form__input"
                        id="username"
                        placeholder="User name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="register-form__field">
                    <input
                        type="password"
                        className="register-form__input"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <div className="register-form__error">{error}</div>}
                {success && <div className="register-form__success">{success}</div>}

                <button className="register-form__button" type="submit">
                    Register
                </button>
            </form>
        </main>

    )
}

export default observer(Register)