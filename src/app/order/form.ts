import * as moment from 'moment';

export const formA = {
  order: [ '', [  ] ],
  quantity: [ '', [  ] ]
};

export const formB = {
  bread: [ 'Plain', [  ] ],
  crumbs: [ 'Bread Crumbs', [  ] ],
  filings: [ 'Plain', [  ] ],
  notes: [ '', [  ] ]
};

export const formC = {
  fn: [ '', [  ] ],
  ln: [ '', [  ] ],
  address: [ '', [  ] ],
  email: [ '', [  ] ],
  instagram: [ '', [  ] ],
  facebook: [ '', [  ] ],
  phone: [ '', [  ] ]
};

export const formD = {
  services: [ 'Pick up', [  ] ],
  date: [ moment().format('MMMM Do YYYY'), [  ] ],
  time: [ '12:00 pm', [  ] ]
};
