const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Common/exceptions/InvariantError');
const RegisterUser = require('../../../Domain/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domain/users/entities/RegisteredUser');
const pool = require('../../database/postgres/pool');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');
 
describe('UserRepositoryPostgres', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });
 
  afterAll(async () => {
    await pool.end();
  });
 
  describe('verifyAvailableUsername function', () => {
    it('should throw InvariantError when username not available', async () => {

      await UsersTableTestHelper.addUser({ username: 'nero' });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
 
      await expect(userRepositoryPostgres.verifyAvailableUsername('nero')).rejects.toThrow(InvariantError);
    });
 
    it('should not throw InvariantError when username available', async () => {

      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
 
      await expect(userRepositoryPostgres.verifyAvailableUsername('nero')).resolves.not.toThrow(InvariantError);
    });
  });
 
  describe('addUser function', () => {
    it('should persist register user', async () => {

      const registerUser = new RegisterUser({
        username: 'nero',
        password: 'secret_password',
        fullname: 'nero marnero',
      });

      const fakeIdGenerator = () => '123';
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
 
      await userRepositoryPostgres.addUser(registerUser);
 
      const users = await UsersTableTestHelper.findUsersById('user-123');
      expect(users).toHaveLength(1);
    });
 
    it('should return registered user correctly', async () => {

      const registerUser = new RegisterUser({
        username: 'nero',
        password: 'secret_password',
        fullname: 'nero marnero',
      });

      const fakeIdGenerator = () => '123';
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
 
      const registeredUser = await userRepositoryPostgres.addUser(registerUser);
 
      expect(registeredUser).toStrictEqual(new RegisteredUser({
        id: 'user-123',
        username: 'nero',
        fullname: 'nero marnero',
      }));
    });
  });
});