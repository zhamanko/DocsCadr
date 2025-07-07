import { h, render } from 'vue';
import ComponentMessage from '@/components/ComponentMessage.vue';

let container = null;

export function showMessage(message, duration = 1800000, title) {
  container = document.createElement('div');
  container.classList.add('component-message-container');
  document.body.appendChild(container);

  const vnode = h(ComponentMessage, {
    message,
    title,
    onClose: hideMessage,
  });

  render(vnode, container);

  setTimeout(() => {
    hideMessage();
  }, duration);
}

export function hideMessage() {
  if (container) {
    render(null, container);
    document.body.removeChild(container);
    container = null;
  }
}