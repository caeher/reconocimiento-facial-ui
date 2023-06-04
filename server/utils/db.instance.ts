import {Sequelize,Dialect } from 'sequelize'

const db_user:string = process.env.NUXT_DB_USER || 'root'
const db_password:string = process.env.NUXT_DB_PASSWORD || ''
const db_name:string = process.env.NUXT_DB_NAME || 'facialapp'
const db_host:string = process.env.NUXT_DB_HOST || 'localhost'
const db_client = <Dialect | undefined> process.env.NUXT_DB_CLIENT || 'mysql'

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  dialect: db_client/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
