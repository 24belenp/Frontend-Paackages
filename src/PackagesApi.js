const axios = require('axios').default;
class PackagesAPI {

    static API_BASE_URL = "/api/v1";

    static requestHeaders() {
        return {}
    }

    static async getAllPackages() {
        const headers = this.requestHeaders();
        const request = new Request(PackagesAPI.API_BASE_URL + "/packages", {
            method: 'GET',
            headers: headers
        });
        const response = await fetch(request);
        if (!response.ok) {
            throw Error("Response not valid" + response.status);
        }
        return response.json();
    }

    static async deleteById(value) {

        axios.delete(PackagesAPI.API_BASE_URL + "/packages/"+ value).then(res => {
            return res;
        }).catch(error => {
            console.error(error)
            throw Error("Response not valid" + error);
        });
  
    }

    static async postPackage(value) {
        axios.post(PackagesAPI.API_BASE_URL + "/packages", value).then(res => {
            console.log(res)
            return res.data;
        }).catch(error => {
            console.error(error)
            
        });
     
    }

    static async updateById( value) {
        axios.put(PackagesAPI.API_BASE_URL + "/packages/"+value.code, value).then(res => {
            console.log(res)
            return res.data;
        }).catch(error => {
            console.error(error)
        });
     
    }

}
export default PackagesAPI;