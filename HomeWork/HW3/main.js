import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render_SQL.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("Calender.db");
db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, time TEXT, body TEXT)");

const router = new Router();
const app = new Application();

router.get('/', list);
router.get('/calender/new', add);
router.get('/calender/:id', show);
router.post('/calender', create);

app.use(router.routes());
app.use(router.allowedMethods());

function query(sql) {
  let list = []
  for(const [id, title, time, body] of db.query(sql)) {
    list.push({id, title, time, body})
  }
  return list
}

async function list(ctx) {
  let posts = query("SELECT id, title, time, body FROM posts")
  console.log('list: calender=', posts)
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function show(ctx) {
  const pid = ctx.params.id;
  let posts = query(`SELECT id, title, time, body FROM posts WHERE id=${pid}`)
  let post = posts[0]
  console.log('show: calender=', posts)
  if(!post) ctx.throw(404, 'invalid post id');
  ctx.response.body = await render.show(post);
}

async function create(ctx) {
  const body = ctx.request.body()
  if(body.type === "form") {
    const pairs = await body.value
    const post = {}
    for(const [key, value] of pairs) {
      post[key] = value
    }
    console.log('create: calender=', posts)
    db.query("INSERT INTO posts (title, time, body) VALUES (?, ?, ?)", [post.title, post.time, post.body]);
    ctx.response.redirect('/');
  }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
