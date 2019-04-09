import { connection } from './../../mysql_connection';

// Klasse som inneholder metodene som blir brukt mot databasen som omhandler endring av status på en bestilling
class s_Statuser {
  // Henter ut v_id'en og b_id'en for å sette status på bestillingen til "bestilt" og alle varene til "på lager"
  Bestilt(v_id, b_id, success) {
    connection.query('UPDATE vare set status ="på lager" WHERE v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('UPDATE bestilling set status ="bestilt" WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  // Henter ut v_id'en og b_id'en for å sette status på bestillingen til "utlevert" og alle varene til "utleid"
  Utlevert(v_id, b_id, success) {
    connection.query('UPDATE vare set status ="utleid" WHERE v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('UPDATE bestilling set status ="utlevert" WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  // Henter ut v_id'en og b_id'en for å sette status på bestillingen til "transporteres" og alle varene til "transporteres"
  Transport(v_id, b_id, success) {
    connection.query('UPDATE vare set status ="transporteres" WHERE v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('UPDATE bestilling set status ="transporteres" WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  // Henter ut v_id'en og b_id'en for å sette status på bestillingen til "savnet" og alle varene til "savnet"
  Savnet(v_id, b_id, success) {
    connection.query('UPDATE bestilling set status ="savnet" WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('UPDATE vare set status ="savnet" WHERE v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  // Henter ut v_id'en og b_id'en for å sette status på bestillingen til "ferdig" og alle varene til "på lager"
  Ferdig(v_id, b_id, success) {
    connection.query('UPDATE vare set status ="på lager" WHERE v_id=?', [v_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
    connection.query('UPDATE bestilling set status ="ferdig" WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

// Klasse som inneholder metodene som blir brukt for å slette en bestilling
class s_Slett {
  // Bruker b_id'en til å slette fra utleieliste og bestilling
  Bestilling(b_id, success) {
    connection.query('delete FROM utleieliste WHERE b_id=?', [b_id], (error, results) => {
      connection.query('delete FROM bestilling WHERE b_id=?', [b_id], (error, results) => {
        if (error) return console.error(error);

        success(results);
      });
    });
  }
}

// Klasse som inneholder metodene som blir brukt for å hente inn bestillinge fra databasen
class s_Bestilling {
  // Henter ut alle de forskjellige bestillingene fra databasen sortert etter den som er nærmest tidsunktet nå
  Bestillinger(success) {
    connection.query('SELECT * FROM alle_bestillinger ORDER BY ABS( DATEDIFF( fra, NOW() ) )', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Bruker navn for å henter ut alle de forskjellige bestillingene til den kunden fra databasen sortert etter den som er nærmest tidsunktet nå
  SokNavn(navn, success) {
    connection.query(
      'SELECT * FROM alle_bestillinger WHERE navn LIKE ? ORDER BY ABS( DATEDIFF( fra, NOW() ) )',
      ['%' + navn + '%'],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
  // Bruker b_id'en til å hente ut all informasjon om en bestilling
  InfoBestilling(b_id, success) {
    connection.query('SELECT * FROM alle_bestillinger WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  // Bruker b_id'en til å hente ut alle varene som hører til en bestilling
  InfoBestillingVarer(b_id, success) {
    connection.query('SELECT * FROM bestillinger_varer WHERE b_id=?', [b_id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

// Eksporterer de forskjellige klassene
export let s_statuser = new s_Statuser();
export let s_slett = new s_Slett();
export let s_bestilling = new s_Bestilling();
