
import { h, render } from 'vue';
import ComponentMessage from '@/components/ComponentMessage.vue';

let container = null;

export function showMessage(message, title, duration = 4000) {
  container = document.createElement('div');
  container.classList.add('component-message-container');
  document.body.appendChild(container);

  const vnode = h(ComponentMessage, {
    message,
    title,
    onClose: hideMessage,
  });

  render(vnode, container);

  // setTimeout(() => {
  //   hideMessage();
  // }, duration);
}

export function hideMessage() {
  if (container) {
    render(null, container);
    document.body.removeChild(container);
    container = null;
  }
}