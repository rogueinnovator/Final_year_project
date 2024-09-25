const baseURL = process.env.BASE_URL;
//1.Create a Criminal Entity
export async function createCriminal(credentils) {
  try {
    const response = await fetch(`${baseURL}/criminalata`, {
      method: "POST",
      body: JSON.stringify(credentils),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    handleFetchError(error);
  }
}
//2.Get all the Criminals
export async function getAllCriminals() {
  try {
    const response = await fetch(`${baseURL}/criminalData`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Http error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {}
}
//3.Delete a user with a specific ID
export async function deleteUser(criminalId) {
  try {
    const response = fetch(`${baseURL}/criminalData/${criminalId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Http error! status ${response.status}`);
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
