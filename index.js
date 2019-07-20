const axios = require("axios");

const url = `https://github-db.glitch.me/db/api`;

function Client({ db, token }) {
  const options = { db, token };
  let auth_token;
  async function auth() {
    try {
      if (!auth_token) {
        const {data} = await axios.post(`${url}/token`, options);
        auth_token = data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${auth_token}`;
      }
    } catch (error) {
      hanlderError(error);
    }
  }
  async function add({document,identifier}, payload) {
    try {
      await auth();
      const resp = await axios.post(`${url}/add`, {
        db: options.db,identifier,
        token,
        document,
        payload
      });
      return resp.data;
    } catch (error) {
      hanlderError(error);
    }
  }
  async function update({document,identifier} , payload) {
    try {
      await auth();
      const resp = await axios.post(`${url}/update`, {
        db: options.db,
        token,
        document,
        identifier,
        payload
      });
      return resp.data;
    } catch (error) {
      hanlderError(error);
    }
  }
  async function _delete({document,identifier}) {
    try {
      await auth();
      const resp = await axios.post(`${url}/delete`, {
        db: options.db,
        token,
        document,
        identifier
      });
      return resp.data;
    } catch (error) {
      hanlderError(error);
    }
  }
  async function fetchOne({document,identifier} ) {
    try {
      await auth();
      const resp = await axios.post(`${url}/fetchOne`, { db: options.db, token, document, identifier });
      return resp.data;
    } catch (error) {
      hanlderError(error);
    }
  }
  async function fetchAll({document,identifier}) {
    try {
      await auth();
      const resp = await axios.post(`${url}/fetchAll`, { db: options.db, token,identifier, document });
      return resp.data;
    } catch (error) {
      hanlderError(error);
    }
  }
  return {
    add,
    fetchOne,
    fetchAll,
    delete: _delete,
    update
  };
}
function hanlderError(error) {
  if (error.response) {
    throw new Error(error.response.data.message);
  } else if (error.request) {
    throw error.request;
  } else {
    throw new Error(error.message);
  }
}

module.exports = Client;
