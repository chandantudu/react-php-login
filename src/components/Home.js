import {useContext} from 'react'
import {UserContext} from '../context/UserContext'
const Home = () => {
    const {user, logout} = useContext(UserContext);
    return (
        <div className="home">
            <div className="img">🧒🏻</div>
            <h1>{user.name}<br/><span>{user.email}</span></h1>
            <button onClick={logout} className="logout">Logout</button>
        </div>
    )
}

export default Home;
