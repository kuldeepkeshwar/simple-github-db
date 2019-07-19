
const GithubDb=require("./index");

const db= GithubDb({db:process.env.db,token:process.env.token}); 
(async function(){
    try {
        const {identifier:id1}=await db.add("user",{name:"John"});
        console.log("added user", id1);

        const {identifier:id2}=await db.add("user",{name:"Will"});
        console.log("added user", id2);

        const user=await db.fetchOne("user",id1);
        console.log("fetched user", user);

        const updated=await db.update("user",id1,{name:"John Cena"});
        console.log("updated user", updated);
        
        const users=await db.fetchAll("user");
        console.log("fetched users", users);
        for (const {identifier} of users) {
            const result=await db.delete("user",identifier);
            console.log("delete users", result);
        }
    } catch (error) {
        console.error(error);
    }
})()