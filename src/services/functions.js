import { login, newGroup, sendMediaMessage, signup } from "./api";

export const handleSignUp = async (e) => {
  let data;
  try {
    if (e.pic) {
      data = new FormData();
      data.append("name", e.name);
      data.append("email", e.email);
      data.append("password", e.password);
      data.append("pic", e.pic);
    } else {
      data = {
        name: e.name,
        email: e.email,
        password: e.password,
      };
    }
    const res = await signup(data);
    if (!res.token) {
      alert(res.msg);
    }
    localStorage.setItem("chatUser", JSON.stringify(res.token.token));
    alert(res.msg);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const handleLogin = async (e) => {
  try {
    const data = {
      email: e.email,
      password: e.password,
    };
    const res = await login(data);
    if (!res.token) {
      alert(res.msg);
    }
    localStorage.setItem("chatUser", JSON.stringify(res.token.token));
    alert(res.msg);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const handleLogout = () => {
  try {
    localStorage.clear();
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const handleNewGroup = async ({users , name}) =>{
  try {
    const usersId = users.map((e)=> e._id);
    const data = {
      users:usersId,
      chatName:name
    }
    const res = await newGroup(data);
  } catch (err) {
    console.log(err);
  }
}
 