
const GithubDb=require("github-db");

const db= GithubDb({db:"test-db",token:"test"}); 
(async function(){
    try {
        const id=await db.add("user",{name:"John"});
        console.log("added user", id);

        const id2=await db.add("user",{name:"Will"});
        console.log("added user", id2);

        const user=await db.fetchOne("user",id);
        console.log("fetched user", user);
        const users=await db.fetchAll("user");
        console.log("fetched users", users);
    } catch (error) {
        console.error(error);
    }
})()