export interface IUser {
  name: {
    title: string,
    first: string,
    last: string
  };
  gender: string;
  location: {
    street: string,
    city: string,
    state: string,
    postcode: string,
    coordinates: {
      latitude: string,
      longitude: string,
    },
    timezone: {
      offset: string,
      description: string
    }
  };
  nat: string;
  email: string;
  dob: {
    date: string,
    age: number
  };
  registered: {
    date: string,
    age: number
  };
  phone: string;
  picture: {
    large: string,
    medium: string,
    thumbnail: string
  };
}

export interface ICustomColumn {
  position: number;
  name: string;
  isActive: boolean;
}

export interface IFilterObj {
  modelValue?: any;
  name: string,
  columnProp: string,
  options: []
}
