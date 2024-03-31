import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

export const getSession = () => {
  return driver.session();
};

export async function testDbConnection() {
  const session = driver.session();

  try {
    const result = await session.run('RETURN "" as message');
    const singleRecord = result.records[0];
    const message = singleRecord.get('message');

    console.log(message);
    return true;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    return false;
  } finally {
    await session.close();
  }
}

// testDbConnection()
//   .then((isConnected) => {
//     if (isConnected) {
//       console.log("Database connection is successful!");
//     } else {
//       console.log("Database connection failed.");
//     }
//   });

