import React, { useState } from 'react';
import SignInForm from "./SignInForm.jsx";
import SignUpForm from "./SignUpForm.jsx";

const Log = ({signIn, signUp}) => {

    const [signUpModal, setSignUpModal] = useState(signUp);
    const [signInModal, setSignInModal] = useState(signIn);

    const handleModal = (e) => {
        if (e.target.id === 'register') {
            setSignInModal(false)
            setSignUpModal(true)
        } else if (e.target.id === 'login') {
            setSignInModal(true)
            setSignUpModal(false)
        }
    }

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li onClick={handleModal} id="register" className={signUpModal ? 'active-btn' : null}>S'inscrire</li>
                    <li onClick={handleModal} id="login" className={signInModal ? 'active-btn' : null}>Se connecter</li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;