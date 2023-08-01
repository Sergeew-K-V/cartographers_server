// let UsersMap: Record<string, string> = {}

// const addUserToMap = (socketId: string, userId: string) => {
//   UsersMap[socketId] = userId
// }

// const removeUserFromMap = (socketId: string, userId: string) => {
//   const updatedMap: Record<string, string> = { ...UsersMap }

//   for (const [key, value] of Object.entries(updatedMap)) {
//     if (key === socketId && value === userId) {
//       delete updatedMap[key]
//       break
//     }
//   }

//   UsersMap = { ...updatedMap }
// }

// export {
//   UsersMap,
//   addUserToMap,
//   removeUserFromMap,
// }
