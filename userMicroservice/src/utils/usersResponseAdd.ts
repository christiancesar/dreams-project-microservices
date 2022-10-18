import { User as UserProto, UserResponse } from "dreams-proto-sharing/src/contracts/user/user_pb"
import { User } from "../entities/UserEntity"


export const usersResponseAdd = (users: Array<User>): UserResponse => {
  const response = new UserResponse();
  users.forEach((user) => {
    response.addUser(
      (new UserProto).setId(user.id)
        .setFirstname(user.firstName)
        .setLastname(user.lastName)
        .setEmail(user.email)
        .setAge(user.age)
        .setBirthday(user.birthday)
        .setCreatedat(Date.parse(user.createdAt.toDateString()))
        .setUpdatedat(Date.parse(user.updatedAt.toDateString()))
    )
  })

  return response;
}