require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;


require('./config/mongoose.config');

app.use(cookieParser());

app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000", "https://z5vdccfn-3000.brs.devtunnels.ms"]
    })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const adminRoutes = require('./routes/admin.routes'); 
app.use("/api/admin", adminRoutes); 

const sessionRoutes = require('./routes/session.routes');
app.use("/api/session", sessionRoutes);

const userRoutes = require('./routes/user.routes');
app.use("/api/user", userRoutes);

app.listen(port, () => console.log(`Listening on port: ${port}`));