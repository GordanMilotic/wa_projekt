import express from "express";
//import mongo, { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
//import upload from "upload";
//import multer from 'multer';

import Owner from "../models/owner.js";
import Employee from "../models/employee.js";
import Pool from "../models/pool.js";
import Fault from "../models/fault.js";
const app = express();
const port = 4001;

app.use(cors());
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
  const hashedPassword1 = await bcrypt.hash("abc", 10);
  const employee1 = new Employee({
    username: "Gordan",
    password: hashedPassword1,
  });

  const hashedPassword2 = await bcrypt.hash("eric", 10);
  const owner = new Owner({
    name: "Eric",
    surname: "Trubilo",
    password: hashedPassword2,
    pool_id: "abc123",
  });

  await employee1.save();
  await owner.save();
  console.log("Spremljeni korisnici");
};

predefinedUsers();

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
    pool_id: pool_id,
  });

  if (!owner) {
    return res.status(400).json({ message: "Vlasnik ne postoji!" });
  }

  const isMatch = await bcrypt.compare(password, owner.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Pogrešna lozinka!" });
  }

  res.status(200).json({ message: "Vlasnik uspješno prijavljen!" });
});

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
});
*/

app.post(
  "/pool",
  /*upload.array("picture"),*/ async (req, res) => {
    const {
      name,
      phLevel,
      clLevel,
      cleaningMethod,
      chemicalsPoured,
      chemicalsQuantity,
      username,
      password,
    } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Ovo polje ne smije biti prazno!" });
    }

    if (!phLevel) {
      return res
        .status(400)
        .json({ message: "Ovo polje ne smije biti prazno!" });
    }

    if (!clLevel) {
      return res
        .status(400)
        .json({ message: "Ovo polje ne smije biti prazno!" });
    }

    if (
      !cleaningMethod ||
      ["usisavanje", "četkanje", "pranje rubne linije"].indexOf(
        cleaningMethod
      ) === -1
    ) {
      return res
        .status(400)
        .json({ message: "poruka da treba izabrat valid metodu za ciscenje" });
    }

    if (
      !chemicalsPoured ||
      ["ph minus", "ph plus"].indexOf(chemicalsPoured) === -1
    ) {
      return res
        .status(400)
        .json({ message: "poruka da treba izabrat valid kemiju" });
    }

    if (!chemicalsQuantity) {
      return res.status(400).json({ message: "poruka da ne smije bit prazno" });
    }

    const employee = await Employee.findOne({
      username: username,
      password: password,
    });

    if (!employee) {
      return res.status(400).json({ message: "Zaposlenik ne postoji!" });
    }

    try {
      const pool = new Pool({
        name,
        phLevel,
        clLevel,
        cleaningMethod,
        chemicalsPoured,
        chemicalsQuantity,
        picture: req.files,
        employee: employee._id,
      });

      await pool.save();

      res
        .status(200)
        .json({ message: "Informacije o bazenu uspješno prijavljene!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

//ovo dolje radi ja msm

app.post("/fault", async (req, res) => {
  const { pool, owner, description, dateReported, reportedBy } = req.body;

  const ownerFound = await Owner.findOne({ name: owner });

  if (!ownerFound) {
    return res.status(400).json({ message: "Vlasnik ne postoji!" });
  }

  try {
    const fault = new Fault({
      pool,
      owner,
      description,
      dateReported,
      reportedBy,
    });

    await fault.save();

    res
      .status(200)
      .json({
        message: "Informacije o kvaru/nedostatku uspješno prijavljene!",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//ovo moram probat

app.put("/pool/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    phLevel,
    cleaningMethod,
    chemicalsPoured,
    chemicalsQuantity,
    picture,
  } = req.body;

  try {
    const pool = await Pool.findById(id);
    if (!pool) {
      return res.status(404).json({ message: "Bazen ne postoji!" });
    }

    pool.name = name;
    pool.phLevel = phLevel;
    pool.cleaningMethod = cleaningMethod;
    pool.chemicalsPoured = chemicalsPoured;
    pool.chemicalsQuantity = chemicalsQuantity;
    pool.picture = picture;

    await pool.save();

    res.status(200).json({ message: "Informacije uspješno uređene!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
