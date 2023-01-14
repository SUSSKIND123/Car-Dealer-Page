// let timer;
let error;

export default {
  async login(context, payload) {
    const response = await fetch(process.env.VUE_APP_LOGINURL, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      error = new Error("Failed to authenticate. Check your login data.");
      console.log(error);
      context.commit("setError", error);
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    // timer = setTimeout(function () {
    //   context.dispatch("autoLogout");
    // }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      first: false,
    });
  },
  async signup(context, payload) {
    try {
      const response = await fetch(process.env.VUE_APP_SIGNUPURL, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message ||
            "Failed to authenticate. Check your login data."
        );
        context.commit("setError", error);
        throw error;
      }

      const expiresIn = +responseData.expiresIn * 1000;
      // const expiresIn = 5000;
      const expirationDate = new Date().getTime() + expiresIn;
      localStorage.setItem("gender", payload.gender);
      localStorage.setItem("first", payload.first);
      localStorage.setItem("name", payload.name);
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("tokenExpiration", expirationDate);

      // timer = setTimeout(function () {
      //   context.dispatch("autoLogout");
      // }, expiresIn);

      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        name: payload.name,
        gender: payload.gender,
        first: true,
      });
      const token = responseData.idToken;
      const userId = responseData.localId;

      const response2 = await fetch(
        process.env.VUE_APP_USERS +
          userId +
          process.env.VUE_APP_EXTENSION +
          token,
        {
          method: "PUT",
          body: JSON.stringify({
            userId: userId,
            name: payload.name,
            gender: payload.gender,
            email: payload.email,
            password: payload.password,
          }),
        }
      );
      if (!response2.ok) {
        console.log(
          "There has been an error in adding user info, actions auth file"
        );
      }
    } catch (err) {
      const error = new Error("Failed to authenticate. Check your login data.");
      throw error;
    }
  },

  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    // timer = setTimeout(function () {
    //   context.dispatch("autoLogout");
    // }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },

  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("gender");
    localStorage.removeItem("first");
    localStorage.removeItem("name");

    // clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
