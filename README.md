# A simpe key value store using Github.
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

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

#### like it?

⭐️ this repo

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://in.linkedin.com/in/kuldeepkeshwar"><img src="https://avatars1.githubusercontent.com/u/10448534?v=4" width="100px;" alt="anotherjsguy"/><br /><sub><b>anotherjsguy</b></sub></a><br /><a href="https://github.com/kuldeepkeshwar/simple-github-db/commits?author=kuldeepkeshwar" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!