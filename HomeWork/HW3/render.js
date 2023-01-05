export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>
        body 
        {
          padding: 80px;
          border: thick double;
          border-color: #FF45FF;
          border-radius: 30px;
          font-size: 16px;
          font-family: Comic Sans MS;
          background-color: blanchedalmond;
        }

        #mp
        {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 70px;
        }
    
        h1 
        {
          font-size: 3em;
        }
    
        h2 
        {
          font-size: 1.5em;
        }
    
        #posts 
        {
          margin: 0;
          padding: 0;
        }
    
        #posts li 
        {
          margin: 40px 0;
          padding: 0;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          list-style: none;
        }
    
        #posts li:last-child 
        {
          border-bottom: none;
        }
    
        textarea 
        {
          width: 500px;
          height: 300px;
        }
    
        .text, textarea 
        {
          border: 1px solid #eee;
          border-top-color: #ddd;
          border-left-color: #ddd;
          background-color:lightpink;
          padding: 15px;
          border-radius: 10px;
          background-color:lightpink;
          font-size: 1em;
        }
    
        .text
        {
          width: 500px;
        }
        
        .date
        {
            width: 300px;
            margin: 1px;
            padding: 5px 10px;
            text-align: center;
            border-radius: 10px;
            background-color:lightpink;
            font-size: 1em;
        }

        .submit
        {
            color: black;
            background: pink;
            height: 40px;
            border-radius: 30px;
            margin: 2px;
            padding: 8px 15px;
            border: 0px;
            text-align: center;
            font-size: 18px;
            font-family: monospace;
        }

        .submit:hover
        {
            height: 40px;
            border-radius: 30px;
            margin: 2px;
            padding: 8px 15px;
            background: palevioletred;
        } 
      </style>
    </head>
    <body>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
    `
  }
  
  export function list(posts) {
    let list = []
    for (let post of posts) {
      list.push(`
      <li>
        <h2>${ post.title }</h2>
        <i>${ post.time}</i>
        <p><a href="/calender/${post.id}">Read Calender Event</a></p>
      </li>
      `)
    }
    let content = `
    <h1>Calendar</h1>
    <p>You have <strong>${posts.length}</strong> events!</p>
    <p><a href="/calender/new">Create a Calender</a></p>
    <ul id="posts">
      ${list.join('\n')}
    </ul>
    `
    return layout('Posts', content)
  }
  
  export function newPost() {
    return layout('New Post', `
    <h1>New event</h1>
    <p>Create new calender.</p>
    <form action="/calender" method="post">
      <p><input class="text" placeholder="Title" name="title"></p>
      <p><input class="date" type="date" name="time"></p>
      <p><textarea placeholder="Contents" name="body"></textarea></p>
      <p><input class="submit" type="submit" value="Create"></p>
    </form>
    `)
  }
  
  export function show(post) {
    return layout(post.title, `
      <h1>${post.title}</h1>
      <h2>${post.time}</h2>
      <pre>${post.body}</pre>
    `)
  }
 
