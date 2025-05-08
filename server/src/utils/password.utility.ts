import bcrypt from 'bcrypt';


export const generateSalt = async (): Promise<string> => {
    return bcrypt.genSalt()
}


export const generatePassword = async (password: string, salt: string): Promise<string> => {
    return bcrypt.hash(password, salt);

}


export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string): Promise<boolean> => {
    const generatedPassword = await generatePassword(enteredPassword, salt);  // Ждем результат асинхронной операции
    return generatedPassword === savedPassword;  // Просто возвращаем результат сравнения
}
