import { axiosInstance } from "../config.js"
import * as React from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Grow from '@mui/material/Grow';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './Classes.css'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Home(props) {
    const [userIsAuthenticatedFlag, setUserIsAuthenticatedFlag] = React.useState(true)
    const [books, setBooks] = React.useState([])
    const [addBookFlag, setAddBookFlag] = React.useState(false);
    const [getBookFlag, setGetBookFlag] = React.useState(false);
    const [updateBookFlag, setUpdateBookFlag] = React.useState(false);
    const [deleteBookFlag, setDeleteBookFlag] = React.useState(false);
    const [authorsForSelect, setAuthorsForSelect] = React.useState([])
    const [title, setTitle] = React.useState("")
    const [author, setAuthor] = React.useState("")
    const [genre, setGenre] = React.useState("")
    const [section, setSection] = React.useState("")
    const [confermaAdd, setConfermaAdd] = React.useState(false);
    const [confermaUpdate, setConfermaUpdate] = React.useState(false);
    const [confermaDelete, setConfermaDelete] = React.useState(false);
    const [notFound, setNotFound] = React.useState("");
    const [selectedBook, setSelectedBook] = React.useState(null);
    const [library, setLibrary] = React.useState({});

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "L", "M", "N", "O", "P", "Q", "R", "S"]

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        height: "80%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // whenever the page reloads (renders), the hook "useEffect" is called
    React.useEffect(() => {
        getBooks()
        createLibrary()
        userIsAuthenticated()
    }, [])

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setConfermaAdd(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [confermaAdd]);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setConfermaUpdate(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [confermaUpdate]);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setConfermaDelete(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [confermaDelete]);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setNotFound("")
        }, 5000);
        return () => clearTimeout(timer);
    }, [notFound]);

    const getBooks = async () => {
        axiosInstance.get('book')
            .then(res => {
                // console.log("Books: ", res.data)
                setBooks(res.data)
            })
    };

    let addBook = () => {
        axiosInstance.post('book', { title: title, author: author, genre: genre, section: section }).then(() => {
            setConfermaAdd(true)
            getBooks()
        }).catch((err) => {
            console.log("error")
        })
    }

    let updateBook = async (newSection) => {
        const newField = { section: newSection }
        axiosInstance.put('book/' + selectedBook._id, newField).then(() => {
            axiosInstance.get('book/' + selectedBook._id).then(() => {
                setConfermaUpdate(true)
                getBooks()
            }).catch((err) => {
                console.log("error")
            })
        }).catch((err) => {
            console.log("error")
        })
    }

    let deleteBook = (title) => {
        axiosInstance.delete('book/' + selectedBook._id)
            .then(() => {
                setConfermaDelete(true)
                getBooks()
            }).catch(error => {
                console.log(error)
            });
    }

    const getBookByTitle = async (titleValue) => {
        let count = 0
        // console.log(titleValue)
        books.map((b) => {
            if (b.title.toUpperCase() === titleValue.toUpperCase()) {
                count = count + 1
                library[b.section].color = "green"
                getBooks()
                const timer = setTimeout(() => {
                    library[b.section].color = "#964b00c7"
                    getBooks()
                }, 7000);
                return () => clearTimeout(timer);
            }
        })
        if (count === 0) {
            setNotFound(title)
        }
    };

    const userIsAuthenticated = () => {
        if (localStorage.getItem("token") === "loggedin") {
            setUserIsAuthenticatedFlag(true)
        } else {
            setUserIsAuthenticatedFlag(false)
        }
    }

    const createLibrary = () => {
        let structure = {}
        for (let letter of alphabet) {
            structure[letter] = { color: 'white' }
        }
        // console.log(structure)
        setLibrary(structure)
    }

    const handleChangeAddBook = () => {
        setAddBookFlag((prev) => !prev);
        setUpdateBookFlag(false);
        setDeleteBookFlag(false);
        setGetBookFlag(false);
        setSelectedBook(null)
    };

    const handleChangeGetBook = () => {
        setGetBookFlag((prev) => !prev);
        setUpdateBookFlag(false);
        setDeleteBookFlag(false);
        setAddBookFlag(false);
        setSelectedBook(null)
    };

    const handleChangeUpdateBook = () => {
        setUpdateBookFlag((prev) => !prev);
        setAddBookFlag(false);
        setDeleteBookFlag(false);
        setGetBookFlag(false);
        setSelectedBook(null)
    };

    const handleChangeDeleteBook = () => {
        setDeleteBookFlag((prev) => !prev);
        setAddBookFlag(false);
        setUpdateBookFlag(false);
        setGetBookFlag(false);
        setSelectedBook(null)
    };

    return (
        <div>
            {
                !userIsAuthenticatedFlag ? <div>
                    <Alert style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10rem' }} severity="error"><h1>UTENTE NON AUTORIZZATO!</h1></Alert>
                    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}><Button variant="outlined" onClick={() => { window.location.reload(true) }} style={{ color: 'white', backgroundColor: 'green', marginTop: '8rem' }}><Link style={{ color: 'white' }} to={"/login"}>Vai al Login</Link></Button></div>
                </div> :
                    <div style={{ width: '100vw' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                            <h1 style={{ fontFamily: 'times', marginLeft: '1rem', marginRight: 'auto' }}>La mia libreria - totale: {books.length} libri</h1>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '3rem' }}>
                            <Button variant="outlined" style={{ color: 'white', backgroundColor: 'green', marginRight: '1rem' }} onClick={handleChangeAddBook}>
                                Aggiungi libro
                            </Button>
                            <Button variant="outlined" style={{ color: 'white', backgroundColor: 'blue', marginRight: '1rem' }} onClick={handleChangeGetBook}>
                                Trova libro
                            </Button>
                            <Button style={{ color: 'white', backgroundColor: '#ffae1b', marginLeft: '1rem', marginRight: '1rem' }} onClick={handleChangeUpdateBook}>
                                Aggiorna libro
                            </Button>
                            <Button style={{ color: 'white', backgroundColor: 'red', marginLeft: '1rem' }} onClick={handleChangeDeleteBook}>
                                Elimina libro
                            </Button>
                        </div>
                        {
                            (!addBookFlag ? "" : <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                <Grow
                                    in={addBookFlag}
                                    style={{ transformOrigin: '0 0 0' }}
                                    {...(addBookFlag ? { timeout: 1000 } : {})}
                                >
                                    <div style={{ marginTop: '2rem' }}>
                                        <div>
                                            <TextField id="filled-basic" label="titolo" variant="outlined" onChange={(event) => { setTitle(event.target.value) }} />
                                            <TextField id="filled-basic" label="autore" variant="outlined" onChange={(event) => { setAuthor(event.target.value) }} />
                                            <TextField id="filled-basic" label="genere" variant="outlined" onChange={(event) => { setGenre(event.target.value) }} />
                                            <TextField id="filled-basic" label="scaffale" variant="outlined" onChange={(event) => { setSection(event.target.value) }} />
                                        </div>
                                        <Button variant="outlined" style={{ color: 'white', backgroundColor: 'green', marginTop: "1rem" }} onClick={addBook}>Conferma</Button>
                                    </div>
                                </Grow>
                            </Box>)
                        }
                        {
                            (!getBookFlag ? "" : <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginLeft: "auto", marginRight: "auto" }}>
                                <Grow
                                    in={getBookFlag}
                                    style={{ transformOrigin: '0 0 0' }}
                                    {...(getBookFlag ? { timeout: 1000 } : {})}
                                >
                                    <div style={{ marginTop: '2rem' }}>
                                        {/* <input placeholder="titolo" onChange={(event) => { setTitle(event.target.value) }} /> */}
                                        <Autocomplete
                                            id="tags-standard"
                                            sx={{ width: "300%" }}
                                            options={books}
                                            getOptionLabel={(option) => option.title}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="Cerca per titolo"
                                                    placeholder="Cerca per titolo"
                                                />
                                            )}
                                            onChange={(event, value) => {
                                                setAuthor("")
                                                if (value !== null) {
                                                    setTitle(value)
                                                    getBookByTitle(value.title)
                                                }
                                            }}
                                        />
                                        <Autocomplete
                                            id="tags-standard"
                                            style={{ width: "300%" }}
                                            options={authorsForSelect}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="Cerca per autore"
                                                    placeholder="Cerca per autore"
                                                />
                                            )}
                                            onChange={(event, value) => {
                                                setTitle(null)
                                                if (value !== null) {
                                                    setAuthor(value.label)
                                                    getBookByAuthor(value.label)
                                                }
                                            }}
                                        />
                                        {/* <Button variant="outlined" style={{ color: 'white', backgroundColor: 'green' }} onClick={() => { getBook(title) }}>Conferma</Button> */}
                                    </div>
                                </Grow>
                            </Box>)
                        }
                        {
                            (!updateBookFlag ? "" : <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                <Grow
                                    in={updateBookFlag}
                                    style={{ transformOrigin: '0 0 0' }}
                                    {...(updateBookFlag ? { timeout: 1000 } : {})}
                                >
                                    <div>
                                        <div style={{ marginTop: '1rem' }}>
                                            <Autocomplete
                                                id="tags-standard"
                                                style={{ width: "100%", marginBottom: "1rem" }}
                                                options={books}
                                                getOptionLabel={(option) => option.title}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        label="libri esistenti"
                                                        placeholder="libri esistenti"
                                                    />
                                                )}
                                                onChange={(event, value) => {
                                                    if (value !== null) {
                                                        setTitle(value.title)
                                                        setSelectedBook(value)
                                                    }
                                                }}
                                            />
                                            <input placeholder="scaffale" onChange={(event) => { setSection(event.target.value) }} />
                                        </div>
                                        <Button style={{ color: 'white', backgroundColor: '#ffae1b', marginTop: '1rem' }} onClick={() => { updateBook(section) }}>Conferma</Button>
                                    </div>
                                </Grow>
                            </Box>)
                        }
                        {
                            (!deleteBookFlag ? "" : <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                                <Grow
                                    in={deleteBookFlag}
                                    style={{ transformOrigin: '0 0 0' }}
                                    {...(deleteBookFlag ? { timeout: 1000 } : {})}
                                >
                                    <div style={{ marginTop: '2rem' }}>
                                        <Autocomplete
                                            id="tags-standard"
                                            style={{ width: "200%", marginBottom: "1rem" }}
                                            options={books}
                                            getOptionLabel={(option) => option.title}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="libri esistenti"
                                                    placeholder="libri esistenti"
                                                />
                                            )}
                                            onChange={(event, value) => {
                                                if (value !== null) {
                                                    setTitle(value.title)
                                                    setSelectedBook(value)
                                                }
                                            }}
                                        />
                                        <Button style={{ color: 'white', backgroundColor: 'red', marginLeft: '1rem' }} onClick={() => { deleteBook(title) }}>Conferma</Button>
                                    </div>
                                </Grow>
                            </Box>)
                        }

                        <div>
                            {
                                (!confermaAdd) ? "" : <Alert style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '1rem' }} severity="success">Libro aggiunto correttamente!</Alert>
                            }
                            {
                                (!confermaUpdate) ? "" : <Alert style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '1rem' }} severity="success">Libro aggiornato correttamente!</Alert>
                            }
                            {
                                (!confermaDelete) ? "" : <Alert style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '1rem' }} severity="success">Libro eliminato correttamente!</Alert>
                            }
                            {
                                (notFound === "") ? "" : <Alert style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', marginTop: '1rem' }} severity="error">Libro {notFound} non trovato! Controlla che il titolo sia scritto correttamente.</Alert>
                            }
                        </div>
                        <div>

                        </div>
                    </div>
            }
        </div>
    );
}

export default Home;
