module.exports = async () => {
    const credentials = {
        email: "kacperksiazek@gmail.com",
        password: "zaq12345",
    };
    const { body } = await request.post("/api/auth/login").send(credentials);
    __loginData = body;
    return body;
};
