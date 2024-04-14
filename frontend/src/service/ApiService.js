import axios from 'axios';

export class ApiService {
    static HOMEURL = `http://127.0.0.1:8000`;

    static verifyUser = (username, password) => {
        var formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        let url = `${this.HOMEURL}/token`;
        return axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } })
    }

    static getAudioFiles = (token) => {
        let url = `${this.HOMEURL}/get-audio-files`
        return axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
}