const express = require("express");
const z = require("zod");
const app = express();
const port = 3000;

// Middleware untuk parsing JSON body
app.use(express.json());

// Konfigurasi Pug sebagai template engine
app.set('view engine', 'pug');
// Lokasi folder views
app.set('views', './views'); 

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/index", (req, res) => {
  res.render('index', { title: 'Home', message: 'Hello from Pug!' });
});

app.get("/about", (req, res) => {
  res.render('about', { title: 'About Us', description: 'This is the About page.' });
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Informasi untuk pengguna dengan ID: ${userId}`);
});

app.get("/search", (req, res) => {
  const { keyword } = req.query;
  res.send(`Hasil pencarian untuk kata kunci: ${keyword}`);
});


app.get("/api", (req, res) => {
  const result = {
    id: 1,
    name: "john",
    address: "jalan jalan",
  };

  res.json(result);
});

app.post("/register", (req, res) => {
  const body = req.body;
  const validateSchema = z.object({
    username: z.string().min(3).max(15),
  });

  try {
    validateSchema.parse(body);
  } catch (error) {
    console.error("error: ", error);
    let messages = [];
    error.errors.forEach((error) => {
      messages.push(
        JSON.parse(
          `{"${error.path[error.path.length - 1]}": "${error.message}"}`
        )
      );
    });

    res.status(400).json({ message: messages });
  }

  res.json(`Registrasi berhasil untuk ${body.username}`);
});

app.use((req, res) => {
  res.status(404).send("Halaman tidak ditemukan");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
