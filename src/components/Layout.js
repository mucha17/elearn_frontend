import React from "react";
import MenuLeft from "./MenuLeft";
import MenuTop from "./MenuTop";
import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import Notifications from "./Notifications";
import TextInput from "./inputs/TextInput";
import SubmitInput from "./inputs/SubmitInput";
import Tile from "./Tile";

class Layout extends React.Component {
    state = {
        logged: false,
        user: 'unknown'
    }

    componentWillMount() {
        const user = localStorage.getItem('user');

        console.log(user)

        if (user === "token_admin") {
            this.setState({logged: true, user: 'admin'})
        } else if (user === "token_user") {
            this.setState({logged: true, user: 'user'})
        } else {
            this.setState({logged: false})
        }
    }

    handleSimpleLogin = (event) => {
        event.preventDefault();

        const login = event.target[0].value;
        const pswd = event.target[1].value;

        if (login === "admin" && pswd === "admin") {
            this.setState({logged: true})
            localStorage.setItem('user', 'token_admin')
            localStorage.setItem('logged', true)
            window.location.replace('/')
        }
        if (login === "user" && pswd === "user") {
            this.setState({logged: true})
            localStorage.setItem('user', 'token_user')
            localStorage.setItem('logged', true)
            window.location.replace('/')
        }

    }

    render() {
        const {logged} = this.state
        const {children, header, title, smallTiles, leftMenu, hideAll} = this.props;

        if (!logged && window.location.pathname !== "/login") {
            window.location.replace('/login');
        }
        if (window.location.pathname === "/login") {
            return <div style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh"
            }}>
                <form onSubmit={this.handleSimpleLogin}>
                    <Tile title={"Dane do logowania"}>
                        Użytkownik konsumencki: user/user<br />
                        Użytkownik administracyjny: admin/admin
                    </Tile>
                    <TextInput name={'login'} title={'Login'}/>
                    <TextInput name={'password'} title={'Hasło'} isPassword/>
                    <SubmitInput text={'Zaloguj'}/>

                </form>

            </div>
        }

        return (
            <div className={"layout"}>
                <Header {...header} />
                <MenuTop/>
                <div className={"site-wrapper"}>
                    <MenuLeft items={leftMenu} hideAll={hideAll}/>
                    <Notifications/>
                    <div className={"content-wrapper"}>
                        <Breadcrumbs/>
                        {title && <h1 className={"site-title"}>{title}</h1>}
                        <div
                            className={`${smallTiles ? "content-wrapper-small" : null}`}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout;
