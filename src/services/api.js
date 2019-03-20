import axios from 'axios';

export default axios.create({
  baseURL: 'https://us-central1-ardas-xyz-vsp.cloudfunctions.net/fakeBe/api/v1',
});
