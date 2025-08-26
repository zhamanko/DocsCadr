import { h, render } from 'vue';
import ComponentMessage from '@/components/ComponentMessage.vue';

let container = null;

export function showMessage(message, duration = 8000, title) {
  container = document.createElement('div');
  container.classList.add('component-message-container');
  document.body.appendChild(container);

  const vnode = h(ComponentMessage, {
    message,
    title,
    duration,
    onClose: hideMessage,
  });

  render(vnode, container);
}

export function hideMessage() {
  if (container) {
    setTimeout(() => {
      render(null, container);
      document.body.removeChild(container);
      container = null;
    }, 500)
  }
}