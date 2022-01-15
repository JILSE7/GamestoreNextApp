import  {useState } from 'react';
//Components
import LoginForm from './LoginForm/';
import RegisterForm from './RegisterForm/';

const Auth = ({setModal}) => {
    const [login, setLogin] = useState(false);
    const goToRegister = () => setLogin(false);
    const goToLogin = () => setLogin(true);
    
    return  (login) ? <LoginForm login={goToRegister} setModal={setModal}/> : <RegisterForm login={goToLogin}/>
        
}

export default Auth
