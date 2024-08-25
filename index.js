const express = require('express');
const { z } = require("zod");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dataSchema = z.array(
    z.string().regex(/^[a-zA-Z]$|^\d+$/, "Only single alphanumeric characters are allowed")
);

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const validData = dataSchema.safeParse(data);

    if (!validData.success) {
        return res.status(400).json({
            is_success: false,
            msg: "Invalid input"
        });
    }

    const nums = data.filter(item => !isNaN(item));
    const alphas = data.filter(item => isNaN(item) && isNaN(parseInt(item)));
    const lower = alphas.filter(item => item === item.toLowerCase());
    const maxAlpha = lower.sort().slice(-1);

    res.status(200).json({
        is_success: true,
        user_id: "akshat_jha_21102003",
        email: "akshat.jha2021@vitbhopal.ac.in",
        roll_number: "21BCE10624",
        numbers: nums,
        alphabets: alphas,
        highest_lowercase_alphabet: maxAlpha
    })
});

app.listen(port, (req, res) => {
    console.log(`Server running on ${port}`);
});