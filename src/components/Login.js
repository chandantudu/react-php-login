import {useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from '../context/UserContext';
const Login = () => {
    const {loginUser, wait, loggedInCheck} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const submitForm = async (e) => {
        e.preventDefault();

        if(!Object.values(formData).every(val => val.trim() !== '')){
            setErrMsg('Please Fill in all Required Fields!');
            return;
        }

        const data = await loginUser(formData);
        if(data.success){
            e.target.reset();
            setRedirect('Redirecting...');
            await loggedInCheck();
            return;
        }
        setErrMsg(data.message);
    }

    return (
        <div className="myform">
            <h2>Login</h2>
            <form onSubmit={submitForm}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" onChange={onChangeInput} placeholder="Your email" id="email" value={formData.email} required />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" onChange={onChangeInput} placeholder="New password" id="password" value={formData.password} required />
                {errMsg && <div className="err-msg">{errMsg}</div>}
                {redirect ? redirect : <button type="submit" disabled={wait}>Login</button>}
                <div className="bottom-link"><Link to="/signup">Sign Up</Link></div>
            </form>
        </div>
    )
}

export default Login;