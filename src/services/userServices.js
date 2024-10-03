const baseURL = process.env.BASE_URL;

//1.SignIn
export async function signIn(credentials) {
  try {
    const response = await fetch(`${baseURL}/signIn`, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    handleFetchError(error);
  }
}

//2.Create User
export async function createUser(formData) {
  try {
    const response = await fetch(`${baseURL}/createUser`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    handleFetchError(error);
  }
}
//.Get all users saved in the dataBase
export async function getAllUsers() {
  try {
    const response = await fetch(`${baseURL}/users`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    handleFetchError(error);
  }
}
//4.Delete user with an ID
export async function deleteUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to delete user with ID: ${userId}. Status: ${response.status}`,
      );
    }
    const result = await response.json();
    console.log("User deleted successfully:", result.message);
    return result;
  } catch (error) {
    console.error("Error deleting user:", error.message);
  }
}

//3.LogOut
export async function logOut() {
  try {
    const response = await fetch(`${baseURL}/logOut`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleFetchError(error);
  }
}
//.4.CurrentUser
export async function currentUser() {
  try {
    const response = await fetch(`${baseURL}/currentUser`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    handleFetchError(error);
  }
}
//.5 get all users Data
export async function getAllCriminals() {
  try {
    const response = await fetch(`${baseURL}/criminalData`, {
      method: GET,
    });
    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }
  } catch (error) {
    handleFetchError(error);
  }
}
// function for Error handling
function handleFetchError(error) {
  if (error.response) {
    console.error("Error status:", error.response.status);
    console.error("Error message:", error.message);
  } else {
    console.error("Error:", error.message);
  }
  throw error;
}
