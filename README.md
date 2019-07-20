# A simpe key value store using Github.

## Install
`npm install github-db`
## Usage

```
const GithubDb=require("github-db");

const db = GithubDb({ db: process.env.DB_NAME, token: process.env.DB_TOKEN });
(async function(){
    try {
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
    } catch (error) {
        console.error(error);
    }
})()
```

### Warning
Meant to be used for side-projects, it doesn't scale or fulfil a fully-fledged database needs.