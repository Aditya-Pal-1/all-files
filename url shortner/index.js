import express from 'express';
import userRouter from './routes/user.routes.js';
import {authenticationMIddleware} from './middleware/auth.middleware.js';
import urlRouter from './routes/url.routes.js';
const app = express();
const PORT = process.env.PORT ??  3000;
app.use(authenticationMIddleware);

app.use(express.json());
app.get('/',(req, res)=>{
    return res.json({status : "Server is up and running........."});
})


app.use('/user',userRouter);

app.use(urlRouter);
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
});
