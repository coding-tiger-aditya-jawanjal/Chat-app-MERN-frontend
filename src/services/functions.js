import { newGroup } from "./api";

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
 