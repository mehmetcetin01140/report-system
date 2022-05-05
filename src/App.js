import Appbar from "./components/Appbar"
import Login from "./components/Login"
import Signup from "./components/SignUp";
import Userpanel from "./components/userPanel"
import AdminPanel from "./components/AdminPanel";
import Message from "./components/Message"
import {BrowserRouter,Route} from "react-router-dom"
import './style/style.scss'
function App() {
  return (
  
<BrowserRouter>
<div>
    <Appbar/>
    <Route path="/" exact component={Login}/>
    <Route path="/uyeol" component={Signup}/>
    <Route path="/isgonder" component={Userpanel}/>
    <Route path="/yonetici" component={AdminPanel}/>
    <Route path="/messages" component={Message}/>
  </div>
    </BrowserRouter>
  );
}

export default App;
