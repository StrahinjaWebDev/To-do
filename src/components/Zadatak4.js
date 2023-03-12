const Zadatak4 = () => {
  const fs = require("fs");
  const { exec } = require("child_process");

  fs.writeFileSync("proizvoljni_fajl.txt", "Ovo je neki proizvoljni sadržaj.");

  exec("ls", (error, stdout, stderr) => {
    if (error) {
      console.error(`${error}`);
      return;
    }
    console.log(stdout);
  });
};

export default Zadatak4;
