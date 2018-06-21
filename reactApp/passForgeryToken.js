import store from "./store";
export default (data) => {
    data.ForgeryToken = store.getState().user.get('forgeryToken');    
    return data;
}