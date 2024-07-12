import express from 'express'
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import multer from 'multer';
import {join, dirname} from 'path'
import { fileURLToPath } from 'url';
import platosRoutes from './routes/platos.routes.js'

//inicializacion
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));



//Setting
app.set("port", process.env.PORT || 3000);
app.set("views", join(__dirname, "views"));
app.engine(
    ".hbs",
    engine({
      defaultLayout: "main",
      layoutsDir: join(app.get("views"), "layouts"),
      partialsDir: join(app.get("views"), "partials"),
      extname: ".hbs",
    })
  );
  app.set("view engine", ".hbs");
  
//middelware
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
    res.render('index');
  });

  app.use(platosRoutes);


//Public Files
app.use(express.static(join(__dirname, "public")));

//Run Server
app.listen(app.get("port"), () =>
console.log("Servidor escuchando en el puerto", app.get("port"))
);