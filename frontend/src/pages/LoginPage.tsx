import { useState } from 'react';
import supabase from '../auth/supabaseClient';

const LoginPage = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
         setEmail(event.target.value);
    };

    const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        
        if(error){
            setMessage(error.message)
            setEmail("")
            setPassword("")
            return;
        }

        if(data){
            console.log(data)
            return;
        }
    }

    return(
        <div>
            <h2>Login</h2>
            <br/>
            {message && <span>{message}</span>}
            <form onSubmit={submitHandler}>
                <input name="email" placeholder="Email" type="email" value={email} onChange={usernameHandler} required/> <br/>
                <input name="password" placeholder="Password" type="password" value={password} onChange={passwordHandler} required/> <br/>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default LoginPage;