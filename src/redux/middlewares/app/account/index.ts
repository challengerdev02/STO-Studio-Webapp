import { updateAccountMe } from './update';
import { getAccountMe } from './get';
import { getUserTipBalance, tipUser } from './tip';
import { becomeCreator } from './become-creator';
import { findOneAccount } from './find-one';
import { followUser } from './following';

export default [
  updateAccountMe,
  getAccountMe,
  findOneAccount,
  becomeCreator,
  getUserTipBalance,
  tipUser,
  followUser,
];
