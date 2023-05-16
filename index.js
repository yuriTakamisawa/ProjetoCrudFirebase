const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./path/to/projetoweb-a611a-firebase-adminsdk-1maoj-87008e781d.json');

var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const db = getFirestore();

const usersDb = db.collection('Alunos');


app.post('/create', async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.ra;
    const userJson = {
      ra: req.body.ra,
      nome: req.body.nome,
      media: req.body.media
    };
    const usersDb = db.collection('Alunos'); 
    const response = await usersDb.doc(id).set(userJson);
    res.send(response);
  } catch(error) {
    res.send(error);
  }
});

app.get('/read/:id', async (req, res) => {
    try {
      const userRef = db.collection("Alunos").doc(req.params.id);
      const response = await userRef.get();
      res.send(response.data());
    } catch(error) {
      res.send(error);
    }
  });

  app.post('/update', async(req, res) => {
    try {
      const id=req.body.id;
      const newNome = "hello world!";
      const userRef = await db.collection("Alunos").doc(id)
      .update({
        nome: newNome
      });
      res.send(userRef);
    } catch(error) {
      res.send(error);
    }
  });

  app.delete('/delete/:id', async (req, res) => {
    try {
      const response = await db.collection("Alunos").doc(req.params.id).delete();
      res.send(response);
    } catch(error) {
      res.send(error);
    }
  })
