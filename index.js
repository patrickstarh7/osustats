//dependencies
const express = require('express')
const app = express();
const PORT = 8000;

app.use(express.json())

//listens for port and calls back when api is ready
app.listen(8000, () =>{
    console.log(`it's alive on http://localhost:${PORT}/osustats`);
})

app.get('/osustats', (req, res) => {
    console.log(req);
    res.status(200).send({
        username: 'patrickstarh7',
    })
});

app.post('/osustats/:id', (req, res) => {
    const {id} = req.params;
    const {pfp} = req.body;

    if(!pfp){
        res.status(418).send({message: 'Default pfp!'})
    }

    res.send({
        osu_player: `username with id of ${id} and pfp of ${pfp}`,
    })

});