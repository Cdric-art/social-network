import React from 'react';
import { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm.jsx";

const SignUpForm = () => {

    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById('terms');
        const pseudoError = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const termsError = document.querySelector('.terms.error');

        passwordConfirmError.innerHTML = '';
        termsError.innerHTML = '';

        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword) {
                passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas"
            }
            if (!terms.checked) {
                termsError.innerHTML = "Veuillez valider les conditions générales"
            }
        } else {
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudo,
                    email,
                    password
                }
            })
                .then(res => {
                    if (res.data.errors) {
                        pseudoError.innerHTML = res.data.errors.pseudo;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />
                    <span />
                    <h4 className="success">Enregistrement réussi, veuillez-vous connecter</h4>
                </>
            ) : (
                <form onSubmit={handleRegister} id="sign-up-form">
                <label htmlFor="pseudo">Pseudo</label>
                <br/>
                <input onChange={(e) => setPseudo(e.target.value)} type="text" name="pseudo" id="pseudo" value={pseudo}/>
                <div className="pseudo error" />
                <br/>
                <label htmlFor="email">Email</label>
                <br/>
                <input onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" value={email}/>
                <div className="email error" />
                <br/>
                <label htmlFor="password">Mot de passe</label>
                <br/>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" value={password}/>
                <div className="password error" />
                <br/>
                <label htmlFor="password-conf">Confirmer mot de passe</label>
                <br/>
                <input onChange={(e) => setControlPassword(e.target.value)} type="password" name="password-conf" id="password-conf" value={controlPassword}/>
                <div className="password-confirm error" />
                <br/>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
                <div className="terms error" />
                <br/>
                <input type="submit" value='Valider inscription'/>
                </form>
                )}
        </>
    );
};

export default SignUpForm;