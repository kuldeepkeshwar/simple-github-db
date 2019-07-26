# A simpe key value store using Github.

## Install
`npm install simple-github-db`
## Usage

```
const GithubDb=require("simple-github-db");

async function test(){
    const db= GithubDb({db:process.env.db,token:process.env.token}); 

    const {identifier}=await db.add({document:"user"},{name:"John"});
    console.log("added user", identifier);
    
    const user=await db.fetchOne({document:"user",identifier});
    console.log("fetched user", user);

    const updated=await db.update({document:"user",identifier},{name:"John Cena"});
    console.log("updated user", updated);
    
    const users=await db.fetchAll({document:"user"});
    console.log("fetched users", users);
    for (const {identifier} of users) {
        const result=await db.delete({document:"user",identifier});
        console.log("delete users", result);
    }
}  

(async function(){
    try {
        await GithubDb.createDatabase(process.env.db,process.env.token)
        await test();
    } catch (error) {
        console.error(error);
    }
})()
```

### Warning
Meant to be used for side-projects, it doesn't scale or fulfil a fully-fledged database needs.