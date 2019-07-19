
const GithubDb=require("./index");

const db= GithubDb({db:process.env.db,token:process.env.token}); 
function generatePath({repo, branch, sha, pull_request_number,filename}){
    return `${repo}/${branch}/${pull_request_number}/${sha}/${filename}`
  }
  function generateDir({repo, branch, sha, pull_request_number}){
    return `${repo}/${branch}/${pull_request_number}/${sha}`
  }
async function test(){
    const {identifier:id1}=await db.add({document:"user"},{name:"John"});
    console.log("added user", id1);

    const {identifier:id2}=await db.add({document:"user"},{name:"Will"});
    console.log("added user", id2);

    const user=await db.fetchOne({document:"user",identifier:id1});
    console.log("fetched user", user);

    const updated=await db.update({document:"user",identifier:id1},{name:"John Cena"});
    console.log("updated user", updated);
    
    const users=await db.fetchAll({document:"user"});
    console.log("fetched users", users);
    for (const {identifier} of users) {
        const result=await db.delete({document:"user",identifier});
        console.log("delete users", result);
    }
}  

async function testWithPath(){
    const identifier= generatePath({repo:"repo", branch:"branch", sha:"sha", pull_request_number:"pull_request_number",filename:"filename"});
    const dir=generateDir({repo:"repo", branch:"branch", sha:"sha", pull_request_number:"pull_request_number"});

    const {identifier:id1}=await db.add({document:"diff",identifier},{name:"John"});
    console.log("added diff", id1);

    const updated=await db.update({document:"diff",identifier:id1},{name:"John Cena"});
    console.log("updated diff", updated);
    
    const user=await db.fetchOne({document:"diff",identifier},id1);
    console.log("fetched diff", user);

    
    const users=await db.fetchAll({document:"diff",identifier:dir});
    console.log("fetched diffs", users);
    for (const {identifier} of users) {
        const result=await db.delete({document:"diff",identifier});
        console.log("delete users", result);
    }
}  
(async function(){
    try {
        await test();
        await testWithPath()
    } catch (error) {
        console.error(error);
    }
})()