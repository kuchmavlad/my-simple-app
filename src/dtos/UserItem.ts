interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo?: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserItem {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  id: number;
  company?: Company;
  favorite?: boolean;
}
