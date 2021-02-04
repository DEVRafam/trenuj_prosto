module.exports = async () => {
    const credentials = {
        email: "kamil.kuzia@onet.pl",
        password: "TrenujProsto123",
    };
    const { body } = await request.post("/api/auth/login").send(credentials);
    __loginData = body;
    return body;
};
