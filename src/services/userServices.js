const baseURL = process.env.BASE_URL;
export async function signIn(signIndata) {
  console.log("signIn data:", signIndata);
  try {
    const response = await fetch(`${baseURL}/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signIndata),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    handleFetchError(error);
  }
}

export async function signUp(signUpData) {
  try {
    const response = await fetch(`${baseURL}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
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

function handleFetchError(error) {
  if (error.response) {
    console.error("Error status:", error.response.status);
    console.error("Error message:", error.message);
  } else {
    console.error("Error:", error.message);
  }
  throw error;
}
