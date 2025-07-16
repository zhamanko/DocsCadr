import positions from './positions.js';
import employees from './employees.js';
import employee_positions from './employee_positions.js';
import journals from './journals.js';
import templates from './templates.js';

async function initModels() {
  try {
    await positions.initPositions();
    await employees.initEmployees();
    await employee_positions.initEmployeePositions();
    await journals.initJournals();
    await templates.initTemplates();

    console.log('All models initialized');
  } catch (err) {
    console.error('Error initializing models:', err);
  }
}

export default {
  initModels
};
