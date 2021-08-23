const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GCID);

const googleV = async(id_token = "") => {
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience:process.env.GCID
    });
    const { name:nombre , picture:img , email:correo } = ticket.getPayload();
    return {nombre,img,correo};
}

module.exports = {
    googleV
}

/*
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);
*/