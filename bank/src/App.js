import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import User from "./Components/home/user";
import AllUsers from './Components/home/bankers'
import Adding from "./Components/adding/adduser";
import CashActions from "./Components/money/actions";

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <nav>
                        <ul style={{display: 'flex',listStyle:'none',padding:"0",justifyContent:'space-around'}}>
                            <li>
                                <Link to="/" style={{textDecoration:'overline underline',color:"black"}}>Home</Link>
                                <ul style={{display: 'flex',listStyle:'none',padding:"0",justifyContent:'space-between'}}>
                                    <li style={{margin:'20px 5px'}}>
                                        <Link to="/all" style={{textDecoration:'overline underline',color:"black"}}>All Users</Link>
                                    </li>
                                    <li style={{margin:'20px 5px'}}>
                                        <Link to="/one" style={{textDecoration:'overline underline',color:"black"}}>Specific User</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/money" style={{textDecoration:'overline underline',color:"black"}}>Money Trans</Link>
                            </li>
                            <li>
                                <Link to="/users" style={{textDecoration:'overline underline',color:"black"}}>Adding BankUsers</Link>
                            </li>
                        </ul>
                    </nav>

                    <Routes >
                        <Route path="/money" element={<CashActions/>}/>
                        <Route path="/users" element={<Adding/>}/>
                        <Route path="/all" element={<AllUsers/>}/>
                        <Route path="/one" element={<User/>}/>
                        {/*<Route path="/" element={'home'}/>*/}
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
