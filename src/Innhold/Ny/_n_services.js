import { connection } from './../../mysql_connection';

// Klasse som inneholder metodene som blir brukt mot databasen for siden ny lokasjon
class s_Lokasjon {
  // Legger inn en ny lokasjon i databasen
  NyLokasjoner(lokasjon, success) {
    connection.query('insert into lokasjon (lokasjon) values (?)', [lokasjon], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

// Klasse som inneholder metodene som blir brukt mot databasen for siden ny restriksjon
class s_Restriksjon {
  // Bruker sykkeltypen til å hente utstyrstyper som passer
  HentPassendeUtstyr(type, success) {
    connection.query(
      'SELECT prisliste.type FROM restriksjoner INNER JOIN prisliste ON restriksjoner.u_type = prisliste.type WHERE s_type =? ORDER BY prisliste.type ASC ',
      [type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  // Bruker sykkeltypen til å hente utstyrstyper som ikke passer
  HentUpassendeUtstyr(type, success) {
    connection.query(
      'SELECT type FROM prisliste WHERE type NOT IN ( SELECT prisliste.type FROM restriksjoner INNER JOIN prisliste ON restriksjoner.u_type = prisliste.type WHERE s_type =?) AND kategori="utstyr"  ORDER BY `prisliste`.`type` ASC ',
      [type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  // Bruker sykkeltypen og utstyrstypen til å fjerne en restriksjon som passer
  FjernPassendeUtstyr(type, u_type, success) {
    connection.query('DELETE FROM restriksjoner WHERE s_type=? and u_type=?', [type, u_type], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
  // Bruker sykkeltypen og utstyrstypen til å legge inn en ny restriksjon (sykkeltype som passer utstyrstype)
  LeggTilPassendeUtstyr(type, u_type, success) {
    connection.query('INSERT INTO restriksjoner (s_type, u_type) values (?, ?)', [type, u_type], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}
// Klasse som inneholder metodene som blir brukt mot databasen for siden ny vare/varer
class s_Vare {
  // Bruker lokasjon og type for å legge til en ny vare i databasen
  NyVare(tilhører, type, success) {
    connection.query(
      'INSERT INTO vare (tilhører, status,  type) VALUES ((SELECT l_id FROM lokasjon WHERE lokasjon=?), "på lager", ?)',
      [tilhører, type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

// Klasse som inneholder metodene som blir brukt mot databasen for siden ny sykkel/sykler
class s_Sykkel {
  // Bruker type, ramme og girsystemm større på hjul for å legge til en ny sykkel. Den henter også den høyeste v_iden som ble laget rett før
  NySykkel(type, ramme, girsystem, størrelse_hjul, success) {
    connection.query(
      'INSERT INTO sykkel (v_id, ramme, girsystem, størrelse_hjul, type) VALUES ((SELECT MAX(v_id) FROM vare),?,?,?,?)',
      [ramme, girsystem, størrelse_hjul, type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  // Bruker nytype og nypris for å legge inn en ny type sykkel. Setter også kategori sykkel
  NyTypeSykkel(nytype, nypris, success) {
    connection.query(
      'INSERT INTO prisliste (type, pris, kategori) VALUES (?,?,"sykkel")',
      [nytype, nypris],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

// Klasse som inneholder metodene som blir brukt mot databasen for siden nytt utstyr
class s_Utstyr {
  // Bruker type for å legge til et nytt utstyr. Den henter også den høyeste v_iden som ble laget rett før
  NyUtstyr(type, success) {
    connection.query(
      'INSERT INTO utstyr (v_id, type) VALUES ((SELECT MAX(v_id) FROM vare),?)',
      [type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  // Bruker nytype og nypris for å legge inn en ny type sykkel. Setter også kategori utstyr
  NyTypeUtstyr(nytype, nypris, success) {
    connection.query(
      'INSERT INTO prisliste (type, pris, kategori) VALUES (?,?,"utstyr")',
      [nytype, nypris],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

// Klasse som inneholder metodene som blir brukt mot databasen for siden å endre priser i prislisten
class s_Pris {
  // Bruker typen for å hente ut prisen i prislisten
  Priser(type, success) {
    connection.query('SELECT * FROM prisliste where type=? ', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Bruker typen og den nye prisen for å oppdatere prisen i timelisten
  EndrePris(type, pris, success) {
    connection.query('update prisliste set pris=? where type=?', [type, pris], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let s_lokasjon = new s_Lokasjon();
export let s_restriksjon = new s_Restriksjon();
export let s_vare = new s_Vare();
export let s_sykkel = new s_Sykkel();
export let s_utstyr = new s_Utstyr();
export let s_pris = new s_Pris();
