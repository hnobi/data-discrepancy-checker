import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { uploadRouter } from "./routes/api-routes";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use('/api/v1/', uploadRouter);

app.use('*', (req, res) => {
    res.status(404)
    res.json({
        status: 'Failed',
        message: 'Page not found'
    })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
