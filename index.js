const axios= require("axios");

const url= `https://github-db.glitch.me/db/api`;

function Client({db,token}){
    const options={db,token};
    let validated=false;
    async function validate(){
        if(!validated){
            const {data}=await axios.get(`${url}/validate`,{params:options});
            validated=data.valid
        }
    }
    async function add(document,payload){
        await validate();
        const resp=await axios.post(`${url}/add`,{db:options.db,token,document,payload});
        return resp.data.identifier;
    }
    async function fetchOne(document,identifier){
        await validate();
        const resp=await axios.get(`${url}/fetchOne`,{params:{db:options.db,token,document,identifier}});
        return resp.data;
    }
    async function fetchAll(document){
        await validate();
        const resp=await axios.get(`${url}/fetchAll`,{params:{db:options.db,token,document}});
        return resp.data;
    }
    return {
        add,fetchOne,fetchAll
    }
}
module.exports= Client;
