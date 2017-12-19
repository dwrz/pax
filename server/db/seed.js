const Promise = require('bluebird');
const conn = require('./connexion/db-index');
const conn2 = require('./connexion/connexion2');

const sqlDrop = 'DROP DATABASE IF EXISTS pax;';
const sqlCreate = 'CREATE DATABASE pax;';
const sqlSchema =
      `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL UNIQUE,
  sessionId VARCHAR(1024)
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  user_Id SERIAL REFERENCES users(id),
  user_text VARCHAR(1500),
  is_link BOOLEAN,
  result INT,
  polarity VARCHAR(10),
  polarity_score VARCHAR(10),
  anger VARCHAR(10),
  disgust VARCHAR(10),
  fear VARCHAR(10),
  joy VARCHAR(10),
  sadness VARCHAR(10),
  analytical VARCHAR(10),
  confident VARCHAR(10),
  tentative VARCHAR(10),
  openness VARCHAR(10),
  conscientiousness VARCHAR(10),
  extraversion VARCHAR(10),
  agreeableness VARCHAR(10),
  emotional_range VARCHAR(10)
);

CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  user_id SERIAL REFERENCES users (id),
  article_id SERIAL REFERENCES articles (id),
  voted BOOLEAN,
  upvote BOOLEAN,
  downvote BOOLEAN
);`;

console.log('@@@@@@@@@@@@@@@@@@@@@@ new try @@@@@@@@@@@@@@@@@@@@@@@@@');

conn2.sqlConnection2.query(sqlDrop, (err, res) => { // Drop the pax database, if it exists.
  return new Promise((resolve, reject) => {
    if (res) {
      console.log(res.rows);
      resolve(res);
    } else if (err) {
      console.log(err.stack);
      reject(err);
    }
  });
}).then(() => { // Check if a pax database exists.
    conn2.sqlConnection2.query("SELECT 1 FROM pg_database WHERE datname='pax'", (err, res) => {
      if (err) {
        console.log('Error checking if pax exists.', err);
        return err;
      } else {
      console.log('Pax rowCount is: ', res.rowCount);
      // If it does not exist, create pax.
      if (res.rowCount === 0) {
        return res;
      }
      }
    })
});

  /*
  conn2.sqlConnection2.query(sqlCreate, (createDBErr, createDBRes) => {
    if (createDBErr) {
      return console.log('error creating pax', createDBErr);
    }
    console.log('just created pax', createDBRes);
    conn.sqlConnection.query("SELECT 1 FROM pg_database WHERE datname='pax'", (checkNewDBErr, checkNewDBRes) => {
      if (checkNewDBErr) {
        return console.log('error retrieving pax', checkNewDBErr);
      }
      console.log('does pax exist = ', checkNewDBRes.rowCount !== 0);
      conn.sqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';", (getTableErr, getTableRes) => {
        if (getTableErr) {
          return console.log('error retrieving pax tables', getTableErr);
        }
        console.log('tables in pax = ', getTableRes.rows);
        getTableRes.rows.map((table) => {
          console.log('current table = ', table.table_name);
          conn.sqlConnection.query(`DROP TABLE IF EXISTS ${table.table_name} CASCADE`, (dropNewDBErr, dropNewDBResult) => {
            if (dropNewDBErr) {
              return console.log('error deleting table', dropNewDBErr);
            } else {
              console.log(dropNewDBReNewsult);
            }
            conn.sqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';", (getTableErr2, getTableRes2) => {
              if (getTableErr2) {
                return console.log('error retrieving pax tables', getTableErr2);
              }
              console.log('just erased table : ', table.table_name);
              console.log('@@@@@@@@@@@@@@@@@@@@res after erasing  = ', getTableRes2.rows);
            });
          });
        });
        conn.sqlConnection.query(sqlSchema, (createSchemaErr, createSchemaRes) => {
          if (createSchemaErr) {
            return console.log('error creating pax schema', createSchemaErr);
          }
          console.log('just created pax schema', createSchemaRes);
          // conn.sqlConnection.query();
          conn.sqlConnection.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';", (getSchemaErr, getSchemaResult) => {
            if (getSchemaErr) {
              return console.log('error retrieving pax schema', getSchemaErr);
            }
            console.log('retrieved schema after schema sql = ', getSchemaResult.rows.length);
          });
        });
      });
    });
  });
}

*/
