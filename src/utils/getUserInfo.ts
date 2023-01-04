import { UserItem } from "dtos";

export const getUserInfo = (
  user: UserItem | undefined,
  isEditPage: boolean
) => {
  const name = isEditPage && user ? user.name : undefined;
  const username = isEditPage && user ? user.username : undefined;
  const email = isEditPage && user ? user.email : undefined;
  const address = isEditPage && user ? user.address : undefined;
  const phone = isEditPage && user ? user.phone : undefined;
  const website = isEditPage && user ? user.website : undefined;

  const street = isEditPage && address ? address.street : undefined;
  const suite = isEditPage && address ? address.suite : undefined;
  const city = isEditPage && address ? address.city : undefined;
  const zipcode = isEditPage && address ? address.zipcode : undefined;

  return {
    name,
    username,
    email,
    phone,
    website,
    street,
    suite,
    city,
    zipcode,
  };
};
