import axios from 'axios';
export  function testFn(num: number, callback) {
  if(num > 12){
    callback(num)
  }
}


export async function request() {
  const {data} = await axios.get('fake.url');
  return data;
}
