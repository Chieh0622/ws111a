import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render_dic.js'

const posts = [
    {id:0, title:'Final exam', time:"2022-01-03", body:'Start, Fighting!'},
    {id:1, title:'Final exam', time:"2022-01-07", body:'Over'},
    {id:2, title:'Vacation', time:"2022-01-09", body:'Start, Happy!'}
]
const router = new Router();

router.get('/', list);
router.get('/calender/new', add);
router.get('/calender/:id', show);
router.post('/calender', create);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function show(ctx) {
  const id = ctx.params.id;
  const post = posts[id];
  if (!post) ctx.throw(404, 'invalid post id');
  ctx.response.body = await render.show(post);
}

async function create(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    const pairs = await body.value
    const post = {}
    for (const [key, value] of pairs) {
      post[key] = value
    }
    console.log('calender=', post)
    const id = posts.push(post) - 1;
    post.created_at = new Date();
    post.id = id;
    ctx.response.redirect('/');
  }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
