import {Application} from "https://deno.land/x/oak/mod.ts";

const app = new Application()

function page(body){
    return `
        <html>
        <head>
        <style>
            div
            {
                text-align: center;
                font-family: Comic Sans MS;
            }
            
            .home
            {
                box-sizing: content-box;
                width: 100%;
                align-items: center;
                justify-content: center;
                display: flex;
                font-family: Comic Sans MS;
            }

            .herf
            {
                box-sizing: content-box;
                width: 100%;
                display: flex;
                align-items: start;
                justify-content: end;
                text-align: center;
                font-family: Comic Sans MS;
            }

            body
            {
                background-color: blanchedalmond;
            }

            form
            {
                box-sizing: content-box;
                width: 100%;
                display: flex;
                font-family: Comic Sans MS;
                align-items: center;
                justify-content: center;
            }

            input
            {  
                width: 300px;
                padding: 10px;
                margin: auto;
                border: 0px;
                border: 0px;
                background-color:lightpink;
                border-radius: 20px;
                font-family: Comic Sans MS;
            }

            .singup
            {
                padding: 100px;
                width: 500px;
                height: 600px;
                margin: auto;
                border: 0px;
            }
    
            .checkbox
            {
                width: 20px;
                align-items: center;
                justify-content: center;
                font-family: Comic Sans MS;
            }

            input::placeholder
            {
                color: black;
                font-style: italic;
                font-family: Comic Sans MS;
            }

            .login
            {
                color: black;
                background: pink;
                height: 40px;
                border-radius: 30px;
                margin: 2px;
                padding: 8px 15px;
                border: 0px;
                font-size: 18px;
                font-family: monospace;
            }

            .login:hover
            {
                height: 50px;
                border-radius: 30px;
                margin: 2px;
                padding: 8px 15px;
                background: palevioletred;
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
                font-size: 18px;
                font-family: monospace;
            }

            .submit:hover
            {
                height: 50px;
                border-radius: 30px;
                margin: 2px;
                padding: 8px 15px;
                background: palevioletred;
            } 
        </style>
        </head>
        <body>
        ${body}
        </body>
        </html>
    `
}

app.use((ctx) => {
    console.log('ctx.request.url=', ctx.request.url)
    let pathname = ctx.request.url.pathname
    if(pathname.startsWith("/SignIn")){
        ctx.response.body = page(`
            <div class="herf">
                <p>
                    <a href="http://127.0.0.1:8000/HOME">HOME</a>
                    |
                    <a href="http://127.0.0.1:8000/SignUp">Sign Up</a>
                </p>
            </div>
            <br/>
            <form class="signin">
                <div>
                    <h1>Sign In</h1>
                    <p>
                        Account:
                        <input type="text" name="email" placeholder="XXXXXX@gmail.com"/>
                    </p>
                    <p>
                        Password:
                        <input type="password" name="password" placeholder="Password"/>
                    </p>
                    <p>
                        <button class="login" name="login">Login</button>
                    </p>
                </div>           
            </form>
        `)
    }
    else if(pathname.startsWith("/SignUp")){
        ctx.response.body = page(`
            <div class="herf">
                <p>
                    <a href="http://127.0.0.1:8000/HOME">HOME</a>
                    |
                    <a href="http://127.0.0.1:8000/SignIn">Sign In</a>
                </p>
            </div>
            <form class="signup">
                <div>
                    <h1>Sign Up</h1>
                    <p>
                        Name:
                        <input type="text" name="user" placeholder="Nick name"/>
                    </p>
                    <p>
                        Account:
                        <input type="text" name="email" placeholder="XXXXXX@gmail.com"/>
                    </p>
                    <p>
                        Password:
                        <input type="password" name="password" placeholder="must be at least 8 characters long"/>
                    </p>
                    <p>
                        Phone:
                        <input type="text" name="phone" placeholder="09-XXXXXXXXXX"/>
                    </p>
                    <p>
                        Birth:
                        <input type="date" name="birth"/>
                    </p>
                    <p>
                        <input class="checkbox" type="checkbox" name="rule">
                            I have read and accept the <a href="https://www.facebook.com/groups/ccccourse">Terms and conditions</a>
                        </input>
                    </p>
                    <p>
                        <button class="submit" name="submit">Submit</button>
                    </p>
                </div>           
            </form>
        `)
    }
    else{
        ctx.response.body = page(`
            <body class="home">
                <div>
                    <h1>HOME</h1>
                    <p>
                        <a href="http://127.0.0.1:8000/SignUp">Sign Up</a>
                    </p>
                    <p>
                        <a href="http://127.0.0.1:8000/SignIn">Sign In</a>
                    </p>
                </div>
            </body>
        `)
    }
})

console.log('start at : http://127.0.0.1:8000/HOME')
await app.listen({ port: 8000 });
