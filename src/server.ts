import { createApp } from "./app";
import { connectToDB } from "./configs/db";
import { ENV } from "./configs/env";

const startServer = async () => {
  try {
    await connectToDB();

    const app = createApp();
    const PORT = ENV.PORT || 5000;

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
};

startServer();
