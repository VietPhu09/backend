import * as bcrypt from 'bcrypt';
export const hashPassword = async (password: string) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
};

export const hashResetPassword = async () => {
  const saltRounds = 4;
  let randomNumber = Math.floor(Math.random() * 100000); // random số từ 0 đến 99999
  let paddedNumber = randomNumber.toString().padStart(5, '0'); // thêm số 0 vào đầu để có đủ 5 chữ số
  const secret = await bcrypt.hash(paddedNumber.toString(), saltRounds);
  return {
    paddedNumber,
    secret,
  };
};
