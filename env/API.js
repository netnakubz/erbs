import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as AppAuth from "expo-app-auth";
import { DeviceEventEmitter } from "react-native";
const config = {
    issuer: 'https://accounts.google.com',
    scopes: ['openid', 'profile'],
    /* This is the CLIENT_ID generated from a Firebase project */
    clientId: '777537428201-gtom0i1vt6d6ji3prin6nr7qfrkt6bp7.apps.googleusercontent.com',
};
axios.interceptors.response.use(
    undefined,
    async (error) => {
        console.log(error.response.status)
        const originalConfig = error.config;
        if (error.response) {
            if (error.response.status === 401) {
                originalConfig._retry = true;
                // Do something, call refreshToken() request for example;
                // return a request

                const refreshToken = await AsyncStorage.getItem("refreshToken");
                let authState = await AppAuth.refreshAsync(config, refreshToken);
                AsyncStorage.setItem("token", authState.idToken);
                return axios.request(originalConfig);
            }
        }
        return Promise.reject(error);
    }
)
let API = {
    domain: "http://172.20.10.4:8080",
    config: {
        headers: { Authorization: `Bearer ${AsyncStorage.getItem("token")}` }
    },
    getToken: async (from) => {
        console.log("call from " + from);
        let token = await AsyncStorage.getItem("token");
        // console.log(token)
        return token;
    },
    temp: () => {
        console.log(API.domain);
    },
    refreshAuthAsync: async () => {

    },
    /**
     *
     * @param {Number} roomId
     * @param {Number} user
     * @returns
     */
    getChat: async (roomId, user) => {
        let token = await API.getToken("getChat");
        const data = await axios.get(
            `${API.domain}/api/v1/getMessage?roomId=${roomId}`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            }
        );
        return data.data;
    },
    /**
     *
     * @param {Number} selectedValue
     * @returns
     */
    getListChat: async () => {
        let token = await API.getToken("getListChat");
        const data = await axios.get(
            `${API.domain}/api/v1/getListChat`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            }
        );
        return data.data;
    },
    /**
     *
     * @param {Number} userOne
     * @param {Number} userTwo
     */
    searchRoom: async (userTwo) => {
        let token = await API.getToken("searchRoom");
        const data = await axios.get(
            `${API.domain}/api/v1/searchRoom?userTwo=${userTwo}`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            }
        )
        return data.data;
    },
    createContract: async (contract) => {
        let token = await API.getToken("createContract");
        const data = await axios.post(`${API.domain}/api/v1/createAgreement`, contract, {
            headers:
                { Authorization: `Bearer ${token}` }
        });
        return data.data;
    },
    getContract: async (contractId) => {
        let token = await API.getToken("getContract");
        const data = await axios.get(`${API.domain}/api/v1/getAgreement?contractId=${contractId}`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            });
        return data.data;
    },
    getPostFindToBorrow: async (pageNo = 0, pageSize = 10) => {
        let token = await API.getToken("getPostFindToBorrow");
        const data = await axios.get(`${API.domain}/api/v1/get/post?pageNo=${pageNo}&pageSize=${pageSize}`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            }
        )
        return data.data;
    },
    getPostFindToLend: async (pageNo = 0, pageSize = 10) => {
        let token = await API.getToken("getPostFindTolend");
        const data = await axios.get(`${API.domain}/api/v1/get/lendPost?pageNo=${pageNo}&pageSize=${pageSize}`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            }
        )
        return data.data;
    },
    lendPost: async (post) => {
        let token = await API.getToken("lendPost");
        const data = await axios.post(`${API.domain}/api/v1/post/rent`, {
            details: post.details,
            equipment: { itemId: post.itemId },
            userId: post.userId
        },
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            }
        );
    },
    getPostById: async (postId) => {
        let token = await API.getToken("getPostById");

        const data = await axios.get(`${API.domain}/api/v1/get/post/by?postId=${postId}`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            });
        return data.data;
    },
    getEquipmentByUserId: async (userId) => {
        let token = await API.getToken("getEquipmentByUserId");
        const data = await axios.get(`${API.domain}/api/v1/get/equipment/by?userId=${userId}`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            });
        return data.data;
    },
    getEquipmentById: async (itemId) => {
        let token = await API.getToken("getEquipmentById");
        const data = await axios.get(`${API.domain}/api/v1/equipment?itemId=${itemId}`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            });
        return data.data;
    },
    getRoom: async (roomId) => {
        let token = await API.getToken("getRoom");
        const data = await axios.get(`${API.domain}/api/v1/getRoom/by?roomId=${roomId}`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            });
        return data.data;
    },
    borrowPost: async (post) => {
        let token = await API.getToken("borrowPost");
        const data = await axios.post(`${API.domain}/api/v1/post/borrow`, {
            "details": post.details,
            "userId": 10001,
            "price": post.price,
            "period": post.period
        },
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            }
        )
    },
    getLikePost: async () => {
        let token = await API.getToken("getLikePost");
        const data = await axios.get(`${API.domain}/api/v1/get/LikePost`, {
            headers:
                { Authorization: `Bearer ${token}` }
        });
        return data.data;
    },
    getItemType: async () => {
        let token = await API.getToken("getItemType");

        const data = await axios.get(`${API.domain}/api/v1/get/itemType`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            });
        return data.data;
    },
    getMyItems: async () => {
        let token = await API.getToken("getMyItems");
        const data = await axios.get(`${API.domain}/api/v1/get/all/equipment`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            });
        return data.data;
    },
    getItemType: async () => {
        let token = await API.getToken("getItemType");

        const data = await axios.get(`${API.domain}/api/v1/getItemType`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            });
        return data.data;
    },
    saveItem: async (images = [], item) => {
        let token = await API.getToken("saveItem");
        const formData = new FormData();
        images.forEach(image => {
            let uriParts = image.uri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            formData.append("files", {
                uri: image.uri,
                name: `photo.${uriParts}`,
                type: `image/${fileType}`
            });
        })
        let body = ["quantity", "price", "name", "userId"];
        body.forEach(b => {
            formData.append(b, item[b]);
        });
        // formData.append("types", item.types);
        item.types.forEach(type => {
            formData.append("types", type);
        })
        item.serials.forEach(serial => {
            formData.append("serials", serial);
        });
        axios.post(
            `${API.domain}/api/v1/uploadEquipment`,
            formData,
            {
                data: formData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": `multipart/form-data;`,
                    "Authorization": `Bearer ${token}`
                },
                transformRequest: (data) => {
                    return data;
                },
            }).then(req => {
            }).catch(err => {
            })
    },
    isLiked: async (postId) => {
        let token = await API.getToken("isLiked");
        const data = await axios.get(`${API.domain}/api/v1/isLiked?postId=${postId}`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            });
        return data.data;
    },
    like: async (postId) => {
        let token = await API.getToken("like");
        const data = await axios.post(`${API.domain}/api/v1/like/post?postId=${postId}`, {},
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            })
    },
    acceptTheContract: async (contractId) => {
        let token = await API.getToken("acceptTheContract");
        const data = await axios.put(`${API.domain}/api/v1/acceptContract?contractId=${contractId}`, {},
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            })
    },
    auth: async () => {
        let token = await API.getToken("auth");
        const data = await axios.get(`${API.domain}/api/v1/isAuthed`,
            {
                headers:
                    { Authorization: `Bearer ${token}` }
            }
        );
        return data.data;
    },
    addOrUpdateUser: async (user) => {
        let token = await API.getToken("auth");
        const data = await axios.post(`${API.domain}/api/v1/updateUserInformation`,
            user
            , {
                headers:
                    { Authorization: `Bearer ${token}` }
            });
        return data === null;
    },
    getUserProfile: async () => {
        let token = await API.getToken("auth");
        const data = await axios.get(`${API.domain}/api/v1/profile`, {
            headers:
                { Authorization: `Bearer ${token}` }
        });
        return data.data;
    },
    getReceipt: async () => {
        let token = await API.getToken("auth");
        const data = await axios.get(`${API.domain}/api/v1/get/receipt`, {
            headers:
                { Authorization: `Bearer ${token}` }
        });
        return data.data;
    },
    getProvice: async () => {
        const data = await axios.get("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces")
        return data.data;
    },
    getDistrict: async (provice) => {
        const data = await axios.get(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${provice}/district`);
        return data.data;
    },
    getSubDistrict: async (province, district) => {
        const data = await axios.get(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${province}/district/${district}`);
        return data.data;
    },
    logout: async ({ setIsLogout }) => {
        let token = await API.getToken();
        try {
            await AppAuth.revokeAsync(config, {
                token: token,
                isClientIdProvided: true,
            });
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("refreshToken");
            return true;
        } catch (e) {
            alert(`Failed to revoke token: ${e.message}`);
        }
    },
    searchPostBorrow: async (query) => {
        let token = await API.getToken();
        const data = await axios.get(`${API.domain}/api/v1/post/rent/search?query=${query}`, {
            headers:
                { Authorization: `Bearer ${token}` }
        });
        return data.data;
    },
    searchPostLend: async (query) => {
        let token = await API.getToken();
        const data = await axios.get(`${API.domain}/api/v1/post/borrow/search?query=${query}`, {
            headers:
                { Authorization: `Bearer ${token}` }
        });
        console.log(data.data);
        return data.data;
    }

};
export default API;
