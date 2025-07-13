import positions from './positions.js';

async function initModels() {
  try {
    await positions.initPositions();
    // Якщо будуть інші моделі - ініціалізувати їх тут
    console.log('All models initialized');
  } catch (err) {
    console.error('Error initializing models:', err);
  }
}

export default {
  initModels
};
