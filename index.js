const axios = require("axios");

const url = `https://github-db.glitch.me/db/api`;

function Client({ db, token }) {
  const options = { db, token };
  let validated = false;
  async function validate() {
    try {
      if (!validated) {
        const { data } = await axios.get(`${url}/validate`, {
          params: options
        });
        validated = data.valid;
      }
    } catch (error) {
      hanlderError(error);
    }
  }
  async function add({document,identifier}, payload) {
    try {
      await validate();
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
      await validate();
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
      await validate();
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
      await validate();
      const resp = await axios.get(`${url}/fetchOne`, {
        params: { db: options.db, token, document, identifier }
      });
      return resp.data;
    } catch (error) {
      hanlderError(error);
    }
  }
  async function fetchAll({document,identifier}) {
    try {
      await validate();
      const resp = await axios.get(`${url}/fetchAll`, {
        params: { db: options.db, token,identifier, document }
      });
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
