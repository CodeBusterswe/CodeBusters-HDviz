const express=require('express');
const bodyParser =require('body-parser')
const path =require('path')
const db=require('./config/db')
var port= require('./config/default');
const cors = require('cors')

const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/data', require('./routes/api/DataSet'));




const irisDataset = `
CREATE TABLE IrisDataset (
    sepal_length NUMERIC,
    sepal_width NUMERIC,
    petal_length NUMERIC,
    petal_width NUMERIC,
    species VARCHAR(255)
);
`;


//creazione table, da rimuovere 
const csv_uni= `
CREATE TABLE statisticheUniversita (
codiceCatastaleNascita VARCHAR,
DescrizioneComuneNascita TEXT,
ProvinciaNascita VARCHAR,
regionaNascita VARCHAR,
sesso VARCHAR,
eta NUMERIC,
codiceCatastaleResidenza VARCHAR,
DescrizioneComuneResidenza VARCHAR,
CAPResidenza NUMERIC,
ProvinciaResidenza VARCHAR,
regionaResidenza VARCHAR,
statoCivile VARCHAR,
Qualifica VARCHAR,
SpeseSanitarie NUMERIC,
RedditiDominicali NUMERIC,
RedditiAgrari NUMERIC,
RedditiFabbricati NUMERIC,
RedditiLavoroDipendenteEAssimilati NUMERIC,
AltriRedditi NUMERIC,
RedditoComplessivo NUMERIC,
OneriDeducibili NUMERIC,
RedditoImponibile NUMERIC,
ImpostaLorda NUMERIC,
DetrazioneConiuge NUMERIC,
DetrazioneFigli NUMERIC,
DetrazioneFigliUlteriore NUMERIC,
DetrazioneFamiliari NUMERIC,
DetrazioneLavDipendente NUMERIC,
DetrazioneRedditiPensione NUMERIC,
DetrazioneOneriRecEdilizio NUMERIC,
DetrazioneSpeseArredo NUMERIC,
DetrazioneRispEnergetico NUMERIC,
DetrazioneOneri NUMERIC,
ImpostaNetta NUMERIC, 
Ritenute NUMERIC,
Differenza NUMERIC,
bonusIrpefRiconosciuto NUMERIC,
numeroFamiliariACarico NUMERIC,
numeroFigliACarico NUMERIC
);
`

const transaction =`
CREATE TABLE transaction (

  Amount NUMERIC,
  Date VARCHAR(255) ,
  Destination VARCHAR(255),
  Source VARCHAR(255),
  TransactionID VARCHAR(255),
  isTainted VARCHAR(255)
);
`

// da rimuovere 
app.get('/c', function (req, res, next) {
    db.query(transaction, (err, res) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('Table is successfully created');
        //db.end();
    });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }


const RUN_ON =process.env.PORT||port.PORT;

app.listen(RUN_ON,()=>console.log(`Server started on port ${RUN_ON}`))