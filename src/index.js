import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'src/scss/main.css';
import { SettingsProvider } from 'src/context/SettingsContext';
import 'aos/dist/aos.css'; // Import the AOS CSS file
import AOS from 'aos';

AOS.init({
  // Global settings:
  disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 200, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down

  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

const root = document.getElementById('root');
const rootInstance = createRoot(root);
rootInstance.render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>
);

serviceWorker.unregister();
