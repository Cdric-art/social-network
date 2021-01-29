module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: ''}

    if (err.message.includes('pseudo')) {
        errors.pseudo = 'Pseudo incorrect ou déjà utilisé';
    }
    if (err.message.includes('email')) {
        errors.email = 'Email incorrect';
    }
    if (err.message.includes('password')) {
        errors.password = 'Le mot de passe doit faire 6 caractères minimum';
    }
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo')) {
        errors.pseudo = 'Ce pseudo est déjà enregistré'
    }
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')) {
        errors.email = 'Cet email est déjà enregistré'
    }

    return errors
}

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes('Email')) {
        errors.email = 'Email invalide';
    }
    if (err.message.includes('Password')) {
        errors.password = 'Mot de passe invalide';
    }

    return errors
}

module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: '' }

    if (err.message.includes('Invalid file')) {
        errors.format = 'Format de l\'image incompatible';
    }
    if (err.message.includes('Maxsize')) {
        errors.maxSize = 'L\'image ne peut pas dépasser 50Mo';
    }

    return errors
}

