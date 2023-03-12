const Zadatak3 = () => {
  const arr = ["x:1", "y:2", "x:3", "a:15"];

  const result = {};
  for (const item of arr) {
    const [key, value] = item.split(" : ");
    result[key] = (result[key] || 0) + parseInt(value);
  }

  const formattedResult = Object.entries(result)
    .sort()
    .map(([key, value]) => `${key}=${value}`)
    .join(", ");

  console.log(formattedResult);
};

export default Zadatak3;
