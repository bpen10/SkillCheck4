// Braden Penner
// Section 2

// create an app and access the express library
let express = require("express");

let app = express();

let path = require("path");

const port = 5001;
// setup and allow the node app to access ejs files in the views directory
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));

const knex = require("knex") ({
    client : "pg",
    connection : {
        host : "localhost",
        user : "postgres",
        password : "Btarwars12",
        database : "starwars",
        port : 5432,
    }
});

app.get('/', (req, res) => {
    knex('characters')
      .join('planets', 'planets.id', '=', 'characters.planet_name')
      .select(
        'characters.id',
        'characters.first_name',
        'characters.last_name',
        'characters.weapon',
        'characters.jedi',
        'planets.planet_name'
      )
      .orderBy(['characters.last_name', 'characters.first_name'])
      .then(characters => {
        // Render the landing.ejs template and pass the data
        res.render('landing', { characters });
      })
      .catch(error => {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
      });
  });

  app.get('/charEdit/:id', (req, res) => {
    let id = req.params.id;
    // Query the Character by ID first
    knex('characters')
      .where('id', id)
      .first()
      .then(character => {
        if (!character) {
          return res.status(404).send('Character not found');
        }
        // Query all Planets after fetching the Character
        knex('planets')
          .select('id', 'planet_name')
          .then(planets => {
            // Render the edit form and pass both character and planets
            res.render('charEdit', { character, planets });
          })
          .catch(error => {
            console.error('Error fetching Planets:', error);
            res.status(500).send('Internal Server Error');
          });
      })
      .catch(error => {
        console.error('Error fetching Character for editing:', error);
        res.status(500).send('Internal Server Error');
      });
  });

app.post('/charEdit/:id', (req, res) => {
    const id = req.params.id;
    // Access each value directly from req.body
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const jedi = req.body.jedi === 'true'; // Convert checkbox value to boolean
    const weapon = req.body.weapon;
    const planet_name = parseInt(req.body.planet_name, 10);
    // Update the character in the database
    knex('characters')
      .where('id', id)
      .update({
        first_name: first_name,
        last_name: last_name,
        jedi: jedi,
        weapon: weapon,
        planet_name: planet_name,
      })
      .then(() => {
        res.redirect('/'); // Redirect to the list of Characters after saving
      })
      .catch(error => {
        console.error('Error updating Character:', error);
        res.status(500).send('Internal Server Error');
      });
  });

  app.post('/charDelete/:id', (req, res) => {
    const id = req.params.id;
    knex('characters')
      .where('id', id)
      .del() // Deletes the record with the specified ID
      .then(() => {
        res.redirect('/'); // Redirect to the Character list after deletion
      })
      .catch(error => {
        console.error('Error deleting Character:', error);
        res.status(500).send('Internal Server Error');
      });
  });

app.get('/charAdd', (req, res) => {
    // Fetch planets to populate the dropdown
    knex('planets')
        .select('id', 'planet_name')
        .then(planets => {
            // Render the add form with the character types data
            res.render('charAdd', { planets });
        })
        .catch(error => {
            console.error('Error fetching Planets:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/charAdd', (req, res) => {
    // Access each value directly from req.body
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const jedi = req.body.jedi === 'true'; // Convert checkbox value to boolean
    const weapon = req.body.weapon;
    const planet_name = parseInt(req.body.planet_name, 10);
    // Update the character in the database
    knex('characters')
      .insert({
        first_name: first_name,
        last_name: last_name,
        jedi: jedi,
        weapon: weapon,
        planet_name: planet_name,
      })
      .then(() => {
        res.redirect('/'); // Redirect to the list of Characters after saving
      })
      .catch(error => {
        console.error('Error updating Character:', error);
        res.status(500).send('Internal Server Error');
      });
  });

app.get('/planets', (req, res) => {
    knex('planets')
      .select(
        'id',
        'planet_name',
      )
      .orderBy('planet_name', 'desc')
      .then(planets => {
        // Render the planets.ejs template and pass the data
        res.render('planets', { planets });
      })
      .catch(error => {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
      });
  });

app.get('/planEdit/:id', (req, res) => {
    let id = req.params.id;
    // Query the Planet by ID first
    knex('planets')
      .where('id', id)
      .first()
      .then(planet => {
        if (!planet) {
          return res.status(404).send('Planet not found');
        }
        res.render('planEdit', { planet });
          })
});
  
app.post('/planEdit/:id', (req, res) => {
    const id = req.params.id;
    // Access each value directly from req.body
    const planet_name = req.body.planet_name;
    // Update the Planet in the database
    knex('planets')
        .where('id', id)
        .update({planet_name: planet_name})
        .then(() => {
            res.redirect('/planets'); // Redirect to the list of Characters after saving
        })
        .catch(error => {
            console.error('Error updating Planet:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/planDelete/:id', (req, res) => {
    const id = req.params.id;
    knex('planets')
      .where('id', id)
      .del() // Deletes the record with the specified ID
      .then(() => {
        res.redirect('/planets'); // Redirect to the Planet list after deletion
      })
      .catch(error => {
        console.error('Error deleting Planet:', error);
        res.status(500).send('Internal Server Error');
      });
  });

  app.get('/planAdd', (req, res) => {
    res.render('planAdd', {});
});

app.post('/planAdd', (req, res) => {
    // Access each value directly from req.body
    const planet_name = req.body.planet_name;
    // Update the Planet in the database
    knex('planets')
      .insert({
        planet_name: planet_name
      })
      .then(() => {
        res.redirect('/planets'); // Redirect to the list of planets after saving
      })
      .catch(error => {
        console.error('Error updating Character:', error);
        res.status(500).send('Internal Server Error');
      });
  });

// shows me that my app is running properly
app.listen(port, () => console.log("Listening"));