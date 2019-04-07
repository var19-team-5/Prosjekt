import { connection } from './../../mysql_connection';

class s_Nav {
  BrukteStatuser(success) {
    connection.query('SELECT DISTINCT status FROM vare ', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
  AlleVarer(success) {
    connection.query('SELECT * FROM alle_varer ORDER BY `alle_varer`.`v_id` ASC', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
class s_Sok {}

export let s_nav = new s_Nav();
export let s_sok = new s_Sok();
