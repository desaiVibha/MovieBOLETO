import { useNavigate } from "react-router-dom"
import './NavBar.css';
function NavBar({ item }) {
    const navigate = useNavigate();
    function logoutFunc() {
        item = null;
        navigate('/');
    }
    return (
        <div>
            <nav className="navbar sticky-top navbar-light bg-light navbar-background">
                <nav className="navbar navbar-light bg-light navbar-left">
                    <a className="navbar-brand" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-film edit-color" viewBox="0 0 16 16">
                            <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                        </svg>&nbsp;
                        <b>BOLETO</b>
                    </a>
                    <a className="nav-link" href="/"><b>Home</b></a>
                </nav>

                <form className="form-inline my-2 my-lg-0">
                    {/* {item && <label> Welcome {item.name}</label>} */}
                    {item && <div class="dropdown">
                        <button><b>Welcome {item.name}!</b></button>
                        <div class="dropdown-options">
                            <a href="#" onClick={logoutFunc()}>Log Out</a>
                        </div>
                    </div>}
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => navigate("/signup")}><b>Join Us</b></button>
                </form>
            </nav>
        </div>
    )
}
export default NavBar