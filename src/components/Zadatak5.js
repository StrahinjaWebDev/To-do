const Zadatak5 = () => {
  const https = require("https");

  https
    .get("https://reqres.in/api/users?page=2", (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const users = JSON.parse(data).data;
        const names = users.map(
          (user) => `${user.first_name} ${user.last_name}`
        );
        console.log(names.join(" , "));
      });
    })
    .on("error", (err) => {
      console.error(err);
    });
};

export default Zadatak5;
