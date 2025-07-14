import positions from './positions.js';
import employee from './employee.js';

async function initModels() {
  try {
    await positions.initPositions();
    await employee.initEmployees();

    console.log('All models initialized');
  } catch (err) {
    console.error('Error initializing models:', err);
  }
}

export default {
  initModels
};
