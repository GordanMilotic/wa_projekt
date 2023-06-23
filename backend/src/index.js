import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
//import upload from "upload";
import multer from "multer";
import fs from "fs";

import Owner from "../models/owner.js";
import Employee from "../models/employee.js";
import Pool from "../models/pool.js";
import Fault from "../models/fault.js";
const app = express();
const port = 4001;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("hello", port);
});

const uri =
  "mongodb+srv://GordanMilotic:gordan@cluster0.j5zzqsk.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
      version: "1",
      strict: true,
      deprecationErrors: true,
    },
  })
  .then(() => console.log("You successfully connected to MongoDB!"))
  .catch((error) => console.error("Error connecting to MongoDB: ", error));

const predefinedUsers = async () => {
  const employeePassword1 = await bcrypt.hash("abc", 10);
  const newEmployee1 = await Employee.findOne({ username: "Gordan" });
  if (!newEmployee1) {
    const employee1 = new Employee({
      username: "Gordan",
      password: employeePassword1,
    });
    await employee1.save();
  }

  const ownerPassword1 = await bcrypt.hash("eric", 10);
  const newOwner1 = await Owner.findOne({
    name: "Eric",
    surname: "Trubilo",
  });
  if (!newOwner1) {
    const owner1 = new Owner({
      name: "Eric",
      surname: "Trubilo",
      password: ownerPassword1,
      pool_id: "abc123",
    });
    await owner1.save();
  }

  const employeePassword2 = await bcrypt.hash("abcabc", 10);
  const newEmployee2 = await Employee.findOne({ username: "Gordan13" });
  if (!newEmployee2) {
    const employee2 = new Employee({
      username: "Gordan13",
      password: employeePassword2,
    });
    await employee2.save();
  }

  console.log("Spremljeni korisnici");
};

predefinedUsers();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//const upload = multer({ storage: storage });
const upload = multer({ dest: "uploads/" });

/*app.post("/login", async (req, res) => {
  const { username, password, userType } = req.body;
  let user;
  if (userType === "employee") {
    user = await Employee.findOne({ username: username });
  } else if (userType === "owner") {
    user = await Owner.findOne({ username: username });
  } else {
    return res.status(400).json({ message: "Ne postoji takav korisnik!" });
  }
  if (!user) {
    return res.status(400).json({ message: "Korisnik nije pronađen!" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Pogrešna lozinka!" });
  }
  res.status(200).json({ message: "Login successful!" });
});*/

app.post("/employee/login", async (req, res) => {
  const { username, password } = req.body;

  const employee = await Employee.findOne({ username: username });

  if (!employee) {
    return res.status(400).json({ message: "Zaposlenik ne postoji" });
  }

  const isMatch = await bcrypt.compare(password, employee.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Pogrešna lozinka!" });
  }

  res.status(200).json({ message: "Zaposlenik uspješno prijavljen!" });
});

app.post("/owner/login", async (req, res) => {
  const { name, surname, password, pool_id } = req.body;

  const owner = await Owner.findOne({
    name: name,
    surname: surname,
  });

  if (!owner) {
    return res.status(400).json({ message: "Vlasnik ne postoji!" });
  }

  const isMatch = await bcrypt.compare(password, owner.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Pogrešna lozinka!" });
  }

  if (owner.pool_id !== pool_id) {
    return res.status(400).json({ message: "Niste vlasnik tog bazena!" });
  }

  res.status(200).json({ message: "Vlasnik uspješno prijavljen!" });
});

app.post(
  "/pool",
  upload.fields([
    { name: "startPictures", maxCount: 3 },
    { name: "endPictures", maxCount: 3 },
  ]),
  async (req, res) => {
    let {
      username,
      name,
      phLevel,
      clLevel,
      tabletCount,
      cleaningMethods,
      chemicalsPoured,
      chemicalsQuantity,
    } = req.body;

    if (!name || !phLevel || !clLevel || !username) {
      return res
        .status(400)
        .json({ message: "Sva polja moraju biti popunjena!" });
    }

    if (tabletCount === "" || isNaN(tabletCount)) {
      tabletCount = null;
    }

    if (cleaningMethods) {
      cleaningMethods = cleaningMethods
        .split(",")
        .map((method) => method.trim());
    } else {
      cleaningMethods = [];
    }

    const validCleaningMethods = [
      "Usisavanje",
      "Četkanje",
      "Pranje rubne linije",
    ];

    if (
      cleaningMethods.length > 0 &&
      !cleaningMethods.every((method) => validCleaningMethods.includes(method))
    ) {
      return res
        .status(400)
        .json({ message: "Morate izabrati valjanu metodu čišćenja!" });
    }

    if (
      chemicalsPoured !== "Bez kemije" &&
      ["PH minus", "PH plus"].indexOf(chemicalsPoured) === -1
    ) {
      return res
        .status(400)
        .json({ message: "Morate izabrati valjanu kemiju!" });
    }

    try {
      const startPictures = req.files["startPictures"].map((file) => ({
        data: fs.readFileSync(file.path),
        contentType: file.mimetype,
      }));

      const endPictures = req.files["endPictures"].map((file) => ({
        data: fs.readFileSync(file.path),
        contentType: file.mimetype,
      }));

      const pool = new Pool({
        username,
        name,
        phLevel,
        clLevel,
        tabletCount,
        cleaningMethods,
        chemicalsPoured,
        chemicalsQuantity,
        startPictures,
        endPictures,
      });

      await pool.save();

      req.files["startPictures"].forEach((file) => fs.unlinkSync(file.path));
      req.files["endPictures"].forEach((file) => fs.unlinkSync(file.path));

      res
        .status(200)
        .json({ message: "Informacije o bazenu uspješno prijavljene!" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Došlo je do interne greške na serveru." });
    }
  }
);

//ovo dolje radi ja msm

app.post("/fault", async (req, res) => {
  const { pool, owner, description, dateReported, reportedBy } = req.body;

  try {
    const fault = new Fault({
      pool,
      owner,
      description,
      dateReported,
      reportedBy,
    });

    await fault.save();

    res.status(200).json({
      message: "Informacije o kvaru/nedostatku uspješno prijavljene!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/employee/logout", async (req, res) => {
  res.status(200).json({ message: "Zaposlenik uspješno odjavljen!" });
});

app.post("/owner/logout", async (req, res) => {
  res.status(200).json({ message: "Vlasnik uspješno odjavljen" });
});
