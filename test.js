
const GithubDb=require("./index");

const db= GithubDb({db:process.env.db,token:process.env.token}); 

async function test(){
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
        await test();
    } catch (error) {
        console.error(error);
    }
})()