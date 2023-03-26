import app from "./app.js";


const PORT=process.argv.PORT || 3000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));