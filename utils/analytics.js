import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-BTHMYX7TZ9'; // Replace with your actual tracking ID

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  console.log('GA initialized');
};

export const logPageView = () => {
  const page = window.location.pathname + window.location.search;
  ReactGA.send({ hitType: "pageview", page: page });
  console.log(`Logging pageview for ${page}`);
};

export const logEvent = (category = '', action = '', label = '') => {
  if (category && action) {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
    console.log(`Event logged: ${category}, ${action}, ${label}`);
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.event({
      description: description,
      fatal: fatal
    });
    console.log(`Exception logged: ${description}, Fatal: ${fatal}`);
  }
};