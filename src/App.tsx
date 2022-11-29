import { Button, FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import './assets/styles/App.css';
import SaveIcon from '@material-ui/icons/Save';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';
import { COLUMN_NAMES } from "./constants";
import { tasks } from "./tasks";
import { Column } from './components/Column';
import { MovableItem } from './components/MovableItem';

const useStyles = makeStyles((theme) => ({
    paperContainer: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    listItem: {
        width: 50
    },
    paperItem: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 540
    },
    formControl: {
        margin: theme.spacing(1),
        width: 'calc(100% - 50px)'
    },
}));

export const App = () => {
    const classes = useStyles();
    const [items, setItems] = useState(tasks);
    const [age, setAge] = React.useState('');

    const handleChange = (event: any) => {
        setAge(event.target.value);
    };
    const isMobile = window.innerWidth < 600;

    const moveCardHandler = (dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];

        if (dragItem) {
            setItems((prevState => {
                const copiedStateArray = [...prevState];

                // remove item by "hoverIndex" and put "dragItem" instead
                const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);

                // remove item by "dragIndex" and put "prevItem" instead
                copiedStateArray.splice(dragIndex, 1, prevItem[0]);

                return copiedStateArray;
            }));
        }
    };

    const returnItemsForColumn = (columnName) => {
        return items
            .filter((item) => item.column === columnName)
            .map((item, index) => (
                <MovableItem
                    color={item.column === 'Available subjects' ? 'transparent' : item.color}
                    id={item.id}
                    key={item.id}
                    name={item.name}
                    currentColumnName={item.column}
                    setItems={setItems}
                    index={index}
                    moveCardHandler={moveCardHandler}
                />
            ))
    }

    const { DO_IT, IN_PROGRESS } = COLUMN_NAMES;

    return (
        <div className="container">
            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>

                <Paper className={classes.paperContainer}>
                    <Typography>QuizCard Generator</Typography>
                    <Grid container spacing={0}>
                        <Grid item sm={6}>
                            <div>
                                <TextField className={classes.formControl} />
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Math</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <Column title={DO_IT} className={[classes.paperItem, 'do-it-column'].join(' ')}>
                                {returnItemsForColumn(DO_IT)}
                            </Column>
                        </Grid>
                        <Grid item sm={6}>
                            <div style={{
                                height: '176px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ width: "100%" }}>
                                    <Button variant="contained" color="primary">
                                        Add your own category <AddIcon />
                                    </Button>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <IconButton color="primary">
                                        <SaveIcon />
                                    </IconButton>
                                </div>
                                <div style={{ width: "100%" }}>
                                    <IconButton color="secondary">
                                        <PlayArrowIcon />
                                    </IconButton>
                                </div>
                            </div>

                            <Column title={IN_PROGRESS} className={[classes.paperItem, ' in-progress-column'].join(' ')}>
                                {returnItemsForColumn(IN_PROGRESS)}
                            </Column>
                        </Grid>
                    </Grid>
                </Paper>
            </DndProvider>
        </div>
    );
}
