const mysql = require('mysql');
const cors = require('cors');


const express = require('express');
const app = express();
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '3743hrn',
  database: 'personnes'
});

app.post('/personne', (req, res) => {
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const jour = req.body.jour;
  const mois = req.body.mois;
  const annee = req.body.annee;
  const sexe = req.body.sexe;
  const profession = req.body.profession;
  const telephone = req.body.telephone;
  connection.query(
    'INSERT INTO personne (nom, prenom, jour, mois, annee, sexe, profession, telephone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nom, prenom, jour, mois, annee, sexe, profession, telephone],
    (error, results) => {
      if (error) {
        res.status(500).json({ error });
        console.log(error);
      } else {
        res.status(200).json({ message: 'Data inserted successfully' });
        // console.log(results);
      }
    }
  );
});

app.delete("/personne/:nom", (req, res) => {
  const nom = req.params.nom;
  const sqlDelete = `DELETE FROM personnes.personne WHERE nom = '${nom}'`;
  connection.query(sqlDelete, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.affectedRows > 0) {
        res.send("Record deleted successfully!");
      } else {
        res.send("Record deletion failed!");
      }
    }
  });
});


app.get('/getPersonne', (req, res) => {
  const sqlInsert = "SELECT * FROM personnes.personne";
  connection.query(
    sqlInsert,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          res.send(result);
          // console.log(result);
        } else {
          console.log("aucune personne pour l'instant");
        }
      }
    }
  );
})

app.listen(3001, () => {
  console.log("running on port 3001...")
});


