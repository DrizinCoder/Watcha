import { app } from "./app";

const PORT = process.env.PORT || 3030;

app.listen(PORT as number, "0.0.0.0", () => {
  console.log(`Server running on port: ${PORT}`);
});
