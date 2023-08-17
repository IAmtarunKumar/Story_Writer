const express = require("express")
const axios = require("axios")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/" , (req,res)=>{
    res.send("done")
})

app.post('/text', async (req, res) => {
    try {
        const { text,lang } = req.body;
        console.log(text,lang)
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: `act as a Film story wirter
            strictly follow the given bullet points
            - formate is charector name with their dailogs for example "chareter- this is my dailog"
            - story is angazeing.
            - minmume work is 300
            - end of the story with good messages
            - the story topic is ${text}
            - the story write in ${lang} language properly.
            - give me output in html div tag print each dailog in next line
            `,
         
            max_tokens: 1000,
            temperature: 0.7,
            n: 1
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const result = response.data.choices[0].text.trim();
        res.json({ result });
    } catch (error) {
        console.log(error)
    }
});


app.listen(process.env.port || 5050 , ()=>{
    console.log("2000 port is working")
})