var env = process.env.NODE_ENV || 'development';
console.log('env *******', env);

if(env === 'development') {
  process.env.MONDB_URI = 'mongodb://localhost:27017/TodoApp';
}else if (env === 'test ') {
  process.env.MONDB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
