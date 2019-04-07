import { connection } from './../../mysql_connection';
export class s_Lokasjon {
  NyLokasjoner(lokasjon, success) {
    connection.query('insert into lokasjon (lokasjon) values (?)', [lokasjon], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export class s_Pris {
  EndrePris(type, pris, success) {
    connection.query('update prisliste set pris=? where type=?', [type, pris], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  HentPriser(type, success) {
    connection.query('SELECT * FROM prisliste where type=? ', [type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export class s_Restriksjon {
  NyRestriksjon(s_type, u_type, success) {
    connection.query('insert into restriksjoner (s_type, u_type) values (?,?)', [s_type, u_type], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export class s_Vare {
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

export class s_Sykkel {
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

export class s_Utstyr {
  Utstyr(type, success) {
    connection.query(
      'INSERT INTO utstyr (v_id, type) VALUES ((SELECT MAX(v_id) FROM vare),?)',
      [type],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
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

let s_lokasjon = new s_Lokasjon();
let s_pris = new s_Pris();
let s_restriksjon = new s_Restriksjon();
let s_vare = new s_Vare();
let s_sykkel = new s_Sykkel();
let s_utstyr = new s_Utstyr();
