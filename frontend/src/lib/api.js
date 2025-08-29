import { axiosInstance } from "./axios";

export const signUp = async (signUpData)=> {
    const response = await axiosInstance.post('/auth/signup' , signUpData)
    return response.data;
}

export const signIn = async (signInData)=> {
    const response = await axiosInstance.post('/auth/login' , signInData)
    return response.data;
}

export const logOut = async ()=> {
    const response = await axiosInstance.post('/auth/logout')
    return response.data;
}

export const authUser = async () => {
    try {
        const response = await axiosInstance.get("/auth/me");
        return response.data;
    } catch (error) {
        console.log("error in authUser", error);
        return null
    }
}

export const completeOnboarding = async(userData)=>{
    const response = await axiosInstance.post("/auth/onboarding", userData);
    return response.data
}

export const getUserFriends = async()=>{
    const response = await axiosInstance.get("/users/friends");
    return response.data
}

export const getUserRecommendation = async()=>{
    const response = await axiosInstance.get("/users");
    return response.data.recommendedusers;
}

export const getOutGoingFriendRequest = async()=>{
    const response = await axiosInstance.get("/users/outgoing-friend-requests");
    return response.data
}

export async function sendFriendRequest(userId) {
    const response = await axiosInstance.post(`/users/friend-request/${userId}`);
    return response.data;
}

export async function getFriendRequests() {
    const response = await axiosInstance.get(`/users/friend-requests`);
    return response.data;
}

export async function acceptFriendRequest(userId) {
    const response = await axiosInstance.put(`/users/friend-request/${userId}/accept`);
    return response.data;
}

export async function getStreamToken(){
    const response = await axiosInstance.get("/chat/token");
    return response.data;
}

