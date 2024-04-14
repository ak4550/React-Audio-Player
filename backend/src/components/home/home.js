import React, { useState, useEffect, useContext } from "react";
import { Container, TextField } from "@mui/material";
import { List, ListItemText, ListItem } from "@mui/material";
import ReactAudioPlayer from 'react-audio-player';
import { ApiService } from "../../service/ApiService";
import AppState from "../../store/AppState";

const Home = () => {

    const [searchText, setSearchText] = useState("");
    const [audioList, setAudioList] = useState([]);

    const ctx = useContext(AppState);

    let filteredAudioList = audioList.filter((item) => {
        let searchTextLower = searchText.toLowerCase();
        return (
            item.audio_name.toLowerCase().includes(searchTextLower)
        );
    });

    const onChangeSearchText = (event) => {
        setSearchText(event.target.value);
    }

    useEffect(() => {
        ApiService.getAudioFiles(ctx.token)
            .then(response => response.data)
            .then((response) => {
                setAudioList(response)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Container>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <h1>TransOrg Audio Player</h1>
            </div>
            <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                id="search"
                label="Search"
                name="search"
                size="small"
                onChange={onChangeSearchText}
                // inputProps={{ style: { height: '1rem' }}}
            />
            {filteredAudioList.length > 0 ?
                <List>
                    {filteredAudioList.map((item, index) => (
                        <ListItem key={index} dense>
                            <ListItemText primary={item.audio_name} />
                            <ReactAudioPlayer
                                src={item.audio_url}
                                controls />
                        </ListItem>
                    ))}
                </List> :
                <div>
                    <p>No Audio Found</p>
                </div>
            }

        </Container>
    )
}

export default Home;
