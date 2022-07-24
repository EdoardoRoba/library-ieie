// import axios from "axios";
import * as React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import './Classes.css'

function Login(props) {

    const [userIsAuthenticatedFlag, setUserIsAuthenticatedFlag] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [password, setPassword] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [showError, setShowError] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [token, setToken] = React.useState("");
    const [loading, setLoading] = React.useState(true)

    const USR = process.env.REACT_APP_USERNAME
    const PWD = process.env.REACT_APP_PASSWORD

    React.useEffect(() => {
        setLoading(false)
        userIsAuthenticated(false)
    }, []);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowError(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [showError]);

    React.useEffect(() => {
        // console.log(token)
        // userIsAuthenticated()
    }, [token]);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev)
    }

    const login = () => {
        if (username === USR && password === PWD) {
            setLoggedIn(true)
            localStorage.setItem("token", "loggedin")
        } else {
            setShowError(true)
        }
    }

    const userIsAuthenticated = (flagReload) => {
        if (localStorage.getItem("token") === "loggedin") {
            setUserIsAuthenticatedFlag(true)
        } else {
            setUserIsAuthenticatedFlag(false)
        }
    }

    return (
        <div>
            {
                !userIsAuthenticatedFlag ? <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '10rem' }}>
                    <Card style={{ width: '40%' }} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography style={{ marginBottom: '3rem' }} variant="h3" component="div">
                                Login
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="username"
                                    onChange={(event) => { setUsername(event.target.value) }}
                                />
                                {/* <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        /> */}
                                <FormControl sx={{ width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(event) => { setPassword(event.target.value) }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </div>
                            <Button onClick={login} variant="outlined" style={{ color: 'white', backgroundColor: 'green', marginTop: '3rem' }}>Conferma</Button>
                        </CardContent>
                    </Card>
                </div > : <div>
                    <Alert style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10rem' }} severity="success"><h1>UTENTE GIA' AUTORIZZATO!</h1></Alert>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}><Button variant="outlined" style={{ color: 'white', backgroundColor: 'green', marginTop: '8rem' }}><Link style={{ color: 'white' }} to={"/home"}>Vai alla home</Link></Button></div>
                </div>
            }

            <div>
                {
                    (showError === false) ? "" : <Alert style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '1rem' }} severity="error">Errore. Utente o password non corretti.</Alert>
                }
                {
                    (!loggedIn) ? "" : <Alert style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem' }} severity="success">Utente loggato correttamente!</Alert>
                }
            </div>
            {
                !loggedIn ? "" : <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}><Button onClick={() => { userIsAuthenticated(true) }} variant="outlined" style={{ color: 'white', backgroundColor: 'green', marginTop: '3rem' }}><Link style={{ color: 'white' }} to={"/home"}>Continua</Link></Button></div>
            }
        </div>
    );
}

export default Login;
