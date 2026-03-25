const users = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'locked_out_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
  { username: 'performance_glitch_user', password: 'secret_sauce' },
  { username: 'error_user', password: 'secret_sauce' },
  { username: 'visual_user', password: 'secret_sauce' },
];

const invalidUsers = [
  { username: 'invalid_user', password: 'secret_sauce' },
  { username: 'standard_user', password: 'wrong_password' },
  { username: '', password: 'secret_sauce' },
  { username: 'standard_user', password: '' },
  { username: '', password: '' },
];

module.exports = { users, invalidUsers };