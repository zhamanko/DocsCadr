import db from '../db.js';

function initPositions() {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS positions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        position TEXT NOT NULL,
        section TEXT NOT NULL,
        rate_totale REAL NOT NULL DEFAULT 1,
        unit TEXT,
        flag INTEGER DEFAULT 1 NOT NULL
      )
    `, (err) => {
      if (err) return reject(err);

      db.get('SELECT COUNT(*) AS count FROM positions', (err, row) => {
        if (err) return reject(err);

        if (row.count === 0) {
          db.run('BEGIN TRANSACTION');
          
          try {
            const insert = db.prepare(`INSERT INTO positions (position, section, unit, rate_totale) VALUES (?, ?, ?, ?)`);
            
            const ADMIN_SECTION = 'Адміністративно-управлінський персонал';
            const ART_SECTION = 'Художній персонал';
            const ACTOR_SECTION = 'Артистичний персонал';
            const ORCHESTRA_SECTION = 'Артисти оркестру';
            const TECH_SECTION = 'Технічно-експлуатаційні служби';
            
            const COSTUME_UNIT = 'Костюмерний цех';
            const PROP_UNIT = 'Реквізиторсько-бутафорський цех';
            const TAILOR_UNIT = 'Кравецький цех';
            const LIGHT_SOUND_UNIT = 'Освітлювальний та звуковий цех';
            const STAGE_MACHINERY_UNIT = 'Машинно-декораційний цех';
            const CARPENTRY_UNIT = 'Столярний цех';
            const SUPPORT_UNIT = 'Допоміжна служба';
            const TECH_SERVICE_UNIT = 'Технічна служба';
            const HOUSEKEEPING_UNIT = 'Господарська служба';

            // АДМІНІСТРАТИВНО-УПРАВЛІНСЬКИЙ ПЕРСОНАЛ
            insert.run('Директор-художній керівник театру', ADMIN_SECTION, null, 1.0);
            insert.run('Заступник директора з організаційної роботи', ADMIN_SECTION, null, 1.0);
            insert.run('Заступник директора по організації глядача', ADMIN_SECTION, null, 1.0);
            insert.run('Головний бухгалтер', ADMIN_SECTION, null, 1.0);
            insert.run('Головний інженер', ADMIN_SECTION, null, 1.0);
            insert.run('Головний адміністратор', ADMIN_SECTION, null, 1.0);
            insert.run('Старший адміністратор', ADMIN_SECTION, null, 1.0);
            insert.run('Провідний економіст', ADMIN_SECTION, null, 1.0);
            insert.run('Провідний бухгалтер', ADMIN_SECTION, null, 1.0);
            insert.run('Заступник начальника відділу правового та кадрового забезпечення', ADMIN_SECTION, null, 1.0);
            insert.run('Завідувач центральним складом', ADMIN_SECTION, null, 1.0);
            insert.run('Заступник головного бухгалтера', ADMIN_SECTION, null, 1.0);
            insert.run('Начальник відділу правового та кадрового забезпечення', ADMIN_SECTION, null, 1.0);
            insert.run('Фахівець з публічних закупівель', ADMIN_SECTION, null, 1.0);
            insert.run('Провідний юрисконсульт', ADMIN_SECTION, null, 1.0);
            insert.run('Завідувач господарством', ADMIN_SECTION, null, 1.0);
            insert.run('Завідувач архіву', ADMIN_SECTION, null, 1.0);

            // ХУДОЖНІЙ ПЕРСОНАЛ
            insert.run('Головний режисер', ART_SECTION, null, 1.0);
            insert.run('Режисер-постановник', ART_SECTION, null, 2.0);
            insert.run('Помічник художнього керівника', ART_SECTION, null, 1.0);
            insert.run('Головний художник', ART_SECTION, null, 1.0);
            insert.run('Художник-постановник', ART_SECTION, null, 1.0);
            insert.run('Головний диригент', ART_SECTION, null, 1.0);
            insert.run('Концертмейстер з класу вокалу', ART_SECTION, null, 1.0);
            insert.run('Керівник літературно-драматургічної частини', ART_SECTION, null, 1.0);
            insert.run('Помічник головного режисера', ART_SECTION, null, 1.0);
            insert.run('Помічник режисера', ART_SECTION, null, 2.0);
            insert.run('Завідувач трупи', ART_SECTION, null, 1.0);
            insert.run('Завідувач художньо-постановочної частини', ART_SECTION, null, 1.0);
            insert.run('Головний балетмейстер', ART_SECTION, null, 1.0);

            // АРТИСТИЧНИЙ ПЕРСОНАЛ
            insert.run('Артист драми провідний майстер сцени', ACTOR_SECTION, null, 9.0);
            insert.run('Артист драми вищої категорії', ACTOR_SECTION, null, 4.0);
            insert.run('Артист-вокаліст вищої категорії', ACTOR_SECTION, null, 3.0);
            insert.run('Артист-вокаліст 1 категорії', ACTOR_SECTION, null, 2.0);
            insert.run('Артист драми 1 категорії', ACTOR_SECTION, null, 12.0);
            insert.run('Артист драми 2 категорії', ACTOR_SECTION, null, 4.0);
            insert.run('Артист балету вищої категорії', ACTOR_SECTION, null, 4.0);
            insert.run('Артист балету 1 категорії', ACTOR_SECTION, null, 2.0);
            insert.run('Артист балету 2 категорії', ACTOR_SECTION, null, 3.0);
            insert.run('Артист допоміжного складу', ACTOR_SECTION, null, 5.0);

            // АРТИСТИ ОРКЕСТРУ
            insert.run('Артист оркестру вищої категорії', ORCHESTRA_SECTION, null, 8.0);
            insert.run('Артист оркестру 1 категорії', ORCHESTRA_SECTION, null, 4.0);
            insert.run('Артист оркестру допоміжного складу', ORCHESTRA_SECTION, null, 3.0);

            // ТЕХНІЧНО-ЕКСПЛУАТАЦІЙНІ, ВИРОБНИЧІ, ІНШІ (ВІДДІЛИ,СЛУЖБИ,ЦЕХИ,ДІЛЬНИЦІ)
            
            // КОСТЮМЕРНИЙ ЦЕХ
            insert.run('Начальник костюмерного цеху', TECH_SECTION, COSTUME_UNIT, 1.0);
            insert.run('Костюмер 6 розряду', TECH_SECTION, COSTUME_UNIT, 2.0);
            
            // РЕКВІЗИТОРСЬКО-БУТАФОРСЬКИЙ ЦЕХ
            insert.run('Начальник реквізиторсько-бутафорного цеху', TECH_SECTION, PROP_UNIT, 1.0);
            insert.run('Реквізитор 6 розряду', TECH_SECTION, PROP_UNIT, 1.0);
            insert.run('Художник-бутафор', TECH_SECTION, PROP_UNIT, 1.0);
            insert.run('Бутафор 5 розряду', TECH_SECTION, PROP_UNIT, 1.0);
            
            // КРАВЕЦЬКИЙ ЦЕХ
            insert.run('Начальник кравецького цеху', TECH_SECTION, TAILOR_UNIT, 1.0);
            insert.run('Закрійник', TECH_SECTION, TAILOR_UNIT, 3.0);
            
            // ОСВІТЛЮВАЛЬНИЙ ТА ЗВУКОВИЙ ЦЕХ
            insert.run('Начальник освітлюваного та звукового цеху', TECH_SECTION, LIGHT_SOUND_UNIT, 1.0);
            insert.run('Інженер-електронік', TECH_SECTION, LIGHT_SOUND_UNIT, 1.0);
            insert.run('Освітлювач', TECH_SECTION, LIGHT_SOUND_UNIT, 1.0);
            insert.run('Освітлювач (який веде розробку схем освітлення вистав)', TECH_SECTION, LIGHT_SOUND_UNIT, 1.0);
            insert.run('Звукорежисер вищої категорії', TECH_SECTION, LIGHT_SOUND_UNIT, 3.0);
            
            // МАШИННО-ДЕКОРАЦІЙНИЙ ЦЕХ
            insert.run('Начальник машинно-декораційного цеху', TECH_SECTION, STAGE_MACHINERY_UNIT, 1.0);
            insert.run('Машиніст сцени 5 розряду', TECH_SECTION, STAGE_MACHINERY_UNIT, 3.0);
            
            // СТОЛЯРНИЙ ЦЕХ
            insert.run('Начальник столярного цеху', TECH_SECTION, CARPENTRY_UNIT, 1.0);
            insert.run('Електрозварник ручного зварювання 5 розряду', TECH_SECTION, CARPENTRY_UNIT, 1.0);
            insert.run('Тесляр 5 розряду', TECH_SECTION, CARPENTRY_UNIT, 1.0);
            
            // ДОПОМІЖНА СЛУЖБА
            insert.run('Художник-гример', TECH_SECTION, SUPPORT_UNIT, 1.0);
            insert.run('Художник-декоратор', TECH_SECTION, SUPPORT_UNIT, 1.0);
            insert.run('Фахівець з комп\'ютерної графіки(дизайну)', TECH_SECTION, SUPPORT_UNIT, 1.0);
            insert.run('Гример-пастижер 6 розряду', TECH_SECTION, SUPPORT_UNIT, 1.0);
            insert.run('Провідний бібліотекар', TECH_SECTION, SUPPORT_UNIT, 1.0);
            
            // ТЕХНІЧНА СЛУЖБА
            insert.run('Інженер з охорони праці 1 категорії', TECH_SECTION, TECH_SERVICE_UNIT, 1.0);
            insert.run('Інженер-енергетик', TECH_SECTION, TECH_SERVICE_UNIT, 1.0);
            insert.run('Технік електрик 1 категорії', TECH_SECTION, TECH_SERVICE_UNIT, 2.0);
            insert.run('Інженер по обслуговуванню обладнання', TECH_SECTION, TECH_SERVICE_UNIT, 1.0);
            insert.run('Технік 1 категорії', TECH_SECTION, TECH_SERVICE_UNIT, 2.0);
            insert.run('Інженер газової установки 1 категорії', TECH_SECTION, TECH_SERVICE_UNIT, 1.0);
            insert.run('Слюсар-сантехнік 5 розряду', TECH_SECTION, TECH_SERVICE_UNIT, 2.0);
            insert.run('Інструктор з пожежної профілактики', TECH_SECTION, TECH_SERVICE_UNIT, 1.0);
            insert.run('Пожежний', TECH_SECTION, TECH_SERVICE_UNIT, 4.0);
            
            // ГОСПОДАРСЬКА СЛУЖБА
            insert.run('Завідувач квиткової каси', TECH_SECTION, HOUSEKEEPING_UNIT, 1.0);
            insert.run('Касир', TECH_SECTION, HOUSEKEEPING_UNIT, 1.0);
            insert.run('Касир квитковий', TECH_SECTION, HOUSEKEEPING_UNIT, 1.0);
            insert.run('Старший контролер квитків', TECH_SECTION, HOUSEKEEPING_UNIT, 1.0);
            insert.run('Контролер квитків', TECH_SECTION, HOUSEKEEPING_UNIT, 3.0);
            insert.run('Прибиральник службових приміщень', TECH_SECTION, HOUSEKEEPING_UNIT, 10.0);
            insert.run('Двірник', TECH_SECTION, HOUSEKEEPING_UNIT, 1.0);
            insert.run('Сторож', TECH_SECTION, HOUSEKEEPING_UNIT, 4.0);
            insert.run('Машиніст із прання та ремонту спец.одягу', TECH_SECTION, HOUSEKEEPING_UNIT, 1.0);
            insert.run('Водій автотранспортного засобу (автомобіль середнього класу, фургон 3-5 т, робочий обєм двигуна 2,5 л)', TECH_SECTION, HOUSEKEEPING_UNIT, 1.0);
            insert.run('Водій автотранспортного засобу (автобус великого класу, довжина понад 9,5 м)', TECH_SECTION, HOUSEKEEPING_UNIT, 1.0);

            insert.finalize();
            db.run('COMMIT');
            console.log('Positions table initialized with seed data');
          } catch (error) {
            db.run('ROLLBACK');
            return reject(error);
          }
        }
        resolve();
      });
    });
  });
}

export default {
  initPositions
};