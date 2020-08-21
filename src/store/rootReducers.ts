import homePage from 'containers/HomePage/reducers/reducers';
import header from 'containers/Header/reducers/reducers';

const reducers = {
  ...homePage,
  ...header,
};

export default reducers;
