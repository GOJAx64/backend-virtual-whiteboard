import bcrypt from 'bcrypt';

const checkPassword = async( passwordForm, passwordDB ) => {
    return await bcrypt.compare(passwordForm, passwordDB);
}

export default checkPassword;