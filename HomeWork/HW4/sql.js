import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("SQL.db");

db.query("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, gender TEXT)")

const router = new Router()
router.get('/', home)
.get('/sqlcmd/:cmd', cmd)
.get('/public/(.*)', pub)

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

async function home(ctx) {
  ctx.response.redirect('/public/')
}

async function pub(ctx) {
  console.log(ctx.request.url.pathname)
  await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/`,
      index: "index.html",
  })
}

async function cmd(ctx) {
  let cmd = ctx.params['cmd']
  console.log('cmd=', cmd)
  let result = db.query(cmd)
  console.log('result=', result)
  ctx.response.type = 'application/json'
  ctx.response.body = result
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 })

//INSERT INTO user (id, name, gender)
//VALUES (1, 'aa', 'male');

//SELECT id, name, gender FROM user;        查詢

//DELETE FROM user WHERE id='1';            刪除

//UPDATE user SET id='1' WHERE name='bb';   修改
