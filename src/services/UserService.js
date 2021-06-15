import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/users";

class UserService {

    getUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL, user);
    }

    makePayment(user, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }
}

export default new UserService()