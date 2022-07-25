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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grow from '@mui/material/Grow';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './Classes.css'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    border: 'solid',
    color: theme.palette.text.secondary
}));


const SmallItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1.8),
    textAlign: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    border: 'solid',
    color: theme.palette.text.secondary
}));


const TwoThirdItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(8),
    textAlign: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    border: 'solid',
    color: theme.palette.text.secondary
}));


const AThirdItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2.5),
    textAlign: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    border: 'solid',
    color: theme.palette.text.secondary
}));


const TallerItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: "6rem",
    paddingBottom: "6rem",
    textAlign: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    border: 'solid',
    color: theme.palette.text.secondary
}));


const TallItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: "5rem",
    paddingBottom: "5rem",
    textAlign: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    border: 'solid',
    color: theme.palette.text.secondary
}));


const MediumItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(6.8),
    textAlign: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    border: 'solid',
    color: theme.palette.text.secondary
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
    const [selectedSection, setSelectedSection] = React.useState(null);
    const [library, setLibrary] = React.useState(null);
    const [booksInShelf, setBooksInShelf] = React.useState([])
    const [open, setOpen] = React.useState(false);
    const [openModalAddBook, setOpenModalAddBook] = React.useState(false);

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

    React.useEffect(() => {
        // console.log("books: ", books)
        let aFS = books.map((b) => b.author)
        aFS = aFS.filter((x, i, a) => {
            return a.indexOf(x) === i
        })
        aFS = aFS.map((b) => { return { label: b } })
        setAuthorsForSelect(aFS)
    }, [books])

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

    let addBookFromShelf = () => {
        axiosInstance.post('book', { title: title, author: author, genre: genre, section: selectedSection }).then(() => {
            setConfermaAdd(true)
            getBooks()
            setOpenModalAddBook(false)
            setOpen(false)
            setSelectedSection(null)
            setBooksInShelf([])
            let structure = {}
            for (let letter of alphabet) {
                structure[letter] = { color: 'white' }
            }
            // console.log(structure)
            setLibrary(structure)
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
                library[b.section].color = "rgba(0, 185, 0, 0.79)"
                getBooks()
                const timer = setTimeout(() => {
                    library[b.section].color = "white"
                    getBooks()
                }, 7000);
                return () => clearTimeout(timer);
            }
        })
        if (count === 0) {
            setNotFound(title)
        }
    };

    const getBookByAuthor = async (authorValue) => {
        let count = 0
        books.map((b) => {
            if (b.author.toUpperCase() === authorValue.toUpperCase()) {
                count = count + 1
                library[b.section].color = "rgba(0, 185, 0, 0.79)"
                getBooks()
                const timer = setTimeout(() => {
                    library[b.section].color = "white"
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

    const showShelf = (selSection) => {
        const bInShelf = books.filter(book =>
            book.section === selSection
        )
        setBooksInShelf(bInShelf)
        setSelectedSection(selSection)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedSection(null)
        setBooksInShelf([])
        let structure = {}
        for (let letter of alphabet) {
            structure[letter] = { color: 'white' }
        }
        // console.log(structure)
        setLibrary(structure)
    };

    const handleCloseModalAddBook = () => {
        setOpenModalAddBook(false)
        setOpen(false)
        setSelectedSection(null)
        setBooksInShelf([])
        let structure = {}
        for (let letter of alphabet) {
            structure[letter] = { color: 'white' }
        }
        // console.log(structure)
        setLibrary(structure)
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
                                    {/* <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', width: "60%", marginLeft: "auto", marginRight: "auto" }}> */}
                                    <Grid container style={{ width: "60%", display: 'flex', justifyContent: 'center', textAlign: 'center', marginLeft: "auto", marginRight: "auto", marginTop: '2rem' }}>
                                        {/* <input placeholder="titolo" onChange={(event) => { setTitle(event.target.value) }} /> */}
                                        <Grid item xs={5}>
                                            <Autocomplete
                                                id="tags-standard"
                                                // sx={{ width: "100px" }}
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
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Autocomplete
                                                id="tags-standard"
                                                // style={{ width: "100px" }}
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
                                        </Grid>
                                        {/* <Button variant="outlined" style={{ color: 'white', backgroundColor: 'rgba(0, 185, 0, 0.79)' }} onClick={() => { getBook(title) }}>Conferma</Button> */}
                                    </Grid>
                                    {/* </div> */}
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
                                            <TextField id="filled-basic" label="scaffale" variant="outlined" onChange={(event) => { setSection(event.target.value.toUpperCase()) }} />
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

                        {
                            !library ? "" : <div style={{ width: "70%", marginTop: "5rem", marginRight: "auto", marginLeft: "auto" }}>
                                <Grid container>
                                    {/* ROW 1 */}
                                    <Grid item xs={2} className="centred">
                                        <Item onClick={() => { showShelf("A") }} className="hovered" style={{ backgroundColor: library["A"].color }}>{"A"}</Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <SmallItem onClick={() => { showShelf("B") }} className="hovered" style={{ backgroundColor: library["B"].color }}>{"B"}</SmallItem>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <SmallItem onClick={() => { showShelf("C") }} className="hovered" style={{ backgroundColor: library["C"].color }}>{"C"}</SmallItem>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Item onClick={() => { showShelf("D") }} className="hovered" style={{ backgroundColor: library["D"].color }}>{"D"}</Item>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Item onClick={() => { showShelf("E") }} className="hovered" style={{ backgroundColor: library["E"].color }}>{"E"}</Item>
                                    </Grid>

                                    {/* ROW 2 */}
                                    <Grid item xs={1} className="centred" style={{ marginTop: ".5rem" }}>
                                        <TallerItem onClick={() => { showShelf("F") }} className="hovered" style={{ backgroundColor: library["F"].color }}>{"F"}</TallerItem>
                                    </Grid>
                                    <Grid item xs={2} className="centred" style={{ marginTop: ".5rem" }}>
                                        <TallerItem onClick={() => { showShelf("G") }} className="hovered" style={{ backgroundColor: library["G"].color }}>{"G"}</TallerItem>
                                    </Grid>
                                    <Grid item xs={1} style={{ marginTop: ".5rem" }}>
                                        <TallerItem onClick={() => { showShelf("H") }} className="hovered" style={{ backgroundColor: library["H"].color }}>{"H"}</TallerItem>
                                    </Grid>
                                    <Grid item xs={2} style={{ marginTop: ".5rem" }}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <TwoThirdItem onClick={() => { showShelf("I") }} className="hovered" style={{ backgroundColor: library["I"].color }}>{"I"}</TwoThirdItem>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <AThirdItem onClick={() => { showShelf("L") }} className="hovered" style={{ backgroundColor: library["L"].color }}>{"L"}</AThirdItem>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={5} style={{ marginTop: ".5rem" }}>
                                        <TallerItem onClick={() => { showShelf("M") }} className="hovered" style={{ backgroundColor: library["M"].color }}>{"M"}</TallerItem>
                                    </Grid>
                                    <Grid item xs={1} style={{ marginTop: ".5rem" }}>
                                        <TallerItem onClick={() => { showShelf("N") }} className="hovered" style={{ backgroundColor: library["N"].color }}>{"N"}</TallerItem>
                                    </Grid>

                                    {/* ROW 3 */}
                                    <Grid item xs={5} style={{ marginTop: ".5rem" }}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <SmallItem onClick={() => { showShelf("O") }} className="hovered" style={{ backgroundColor: library["O"].color }}>{"O"}</SmallItem>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container>
                                                    <Grid item xs={8}>
                                                        <MediumItem onClick={() => { showShelf("P") }} className="hovered" style={{ backgroundColor: library["P"].color }}>{"P"}</MediumItem>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <MediumItem onClick={() => { showShelf("Q") }} className="hovered" style={{ backgroundColor: library["Q"].color }}>{"Q"}</MediumItem>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} style={{ marginTop: ".5rem" }}>
                                        <TallItem onClick={() => { showShelf("R") }} className="hovered" style={{ backgroundColor: library["R"].color }}>{"R"}</TallItem>
                                    </Grid>
                                    <Grid item xs={5} style={{ marginTop: ".5rem" }}>
                                        <TallItem onClick={() => { showShelf("S") }} className="hovered" style={{ backgroundColor: library["S"].color }}>{"S"}</TallItem>
                                    </Grid>
                                </Grid>
                            </div>
                        }

                    </div>
            }

            {/* <Modal
                open={open}
                onClose={() => { handleClose() }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                footer={<Tooltip sx={{ marginRight: '1rem' }} title={"Aggiungi libro"}>
                    <IconButton onClick={() => {
                        console.log("ciao")
                    }}>
                        <AddCircleIcon fontSize="large" />
                    </IconButton>
                </Tooltip>}
            >
                <Box sx={style} style={{ maxHeight: '80%', overflowY: 'auto', marginRight: 'auto', marginLeft: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography style={{ marginBottom: '.5rem' }} id="modal-modal-title" variant="h6" component="h2">
                        Libri nel ripiano: {selectedSection}
                    </Typography>
                    <Typography style={{ marginBottom: '2rem' }} id="modal-modal-title" variant="h6" component="h2">
                        Libri presenti in questo ripiano: {booksInShelf.length}
                    </Typography>
                    {
                        (booksInShelf.length === 0) ? <span style={{ color: 'grey' }}>Nello ripiano selezionato non sono presenti libri.</span> :
                            booksInShelf.map((bis) => {
                                return <li style={{ marginBottom: '0.5rem', marginRight: 'auto', marginLeft: 'auto' }}>{bis.title} - {bis.author}</li>
                            })
                    }

                </Box>
            </Modal> */}

            <Dialog
                open={open}
                onClose={() => { handleClose() }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* <Box sx={style} style={{ maxHeight: '80%', overflowY: 'auto', marginRight: 'auto', marginLeft: 'auto', justifyContent: 'center', alignItems: 'center' }}> */}
                <DialogTitle style={{ marginBottom: '.5rem' }} id="modal-modal-title" variant="h6" component="h2">
                    Libri nel ripiano: {selectedSection}
                </DialogTitle>
                <DialogContent>
                    <Typography style={{ marginBottom: '2rem' }} id="modal-modal-title" variant="h6" component="h2">
                        Libri presenti in questo ripiano: {booksInShelf.length}
                    </Typography>
                    {
                        (booksInShelf.length === 0) ? <span style={{ color: 'grey' }}>Nello ripiano selezionato non sono presenti libri.</span> :
                            booksInShelf.map((bis) => {
                                return <li style={{ marginBottom: '0.5rem', marginRight: 'auto', marginLeft: 'auto' }}>{bis.title} - {bis.author}</li>
                            })
                    }

                </DialogContent>
                {/* </Box> */}
                <DialogActions>
                    <Tooltip sx={{ marginRight: '1rem' }} title={"Aggiungi libro"}>
                        <IconButton onClick={() => {
                            setSelectedSection(selectedSection)
                            setOpenModalAddBook(true)
                        }}>
                            <AddCircleIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openModalAddBook}
                onClose={() => { handleCloseModalAddBook() }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* <Box sx={style} style={{ maxHeight: '80%', overflowY: 'auto', marginRight: 'auto', marginLeft: 'auto', justifyContent: 'center', alignItems: 'center' }}> */}
                <DialogTitle style={{ marginBottom: '.5rem' }} id="modal-modal-title" variant="h6" component="h2">
                    Aggiungi libro al ripiano: {selectedSection}
                </DialogTitle>
                <DialogContent>
                    {
                        !selectedSection ? "" : <div style={{ marginTop: '2rem' }}>
                            <div>
                                <TextField id="filled-basic" label="titolo" variant="outlined" onChange={(event) => { setTitle(event.target.value) }} />
                                <TextField id="filled-basic" label="autore" variant="outlined" onChange={(event) => { setAuthor(event.target.value) }} />
                                <TextField id="filled-basic" label="genere" variant="outlined" onChange={(event) => { setGenre(event.target.value) }} />
                            </div>
                            <Button variant="outlined" style={{ color: 'white', backgroundColor: 'green', marginTop: "1rem" }} onClick={addBookFromShelf}>Conferma</Button>
                        </div>
                    }
                </DialogContent>
                {/* </Box> */}
                <DialogActions>
                    <Tooltip sx={{ marginRight: '1rem' }} title={"Aggiungi libro"}>
                        <IconButton onClick={() => {
                            console.log("ciao")
                        }}>
                            <AddCircleIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Home;
