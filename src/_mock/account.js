// ----------------------------------------------------------------------

export const account = {
  // const user = localStorage.getItem("user"),
  displayName: JSON.parse(localStorage.getItem("user"))?.user?.username,
  email: JSON.parse(localStorage.getItem("user"))?.user?.email,
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
