import { MongoClient } from "mongodb"
import Papr from "papr"

export const papr = new Papr()

/**
 * Function to connect to MongoDB and initialize Papr
 * @param dbUrl MongoDB URL connection string
 * @param dbName MongoDB database name
 * @param callback Callback function to run after Papr is initialized
 */

const mongoConnect = (
  dbUrl: string | undefined,
  dbName: string,
  callback: () => void
) => {
  if (!dbUrl) {
    throw new Error("Missing MongoDB URL")
  }

  MongoClient.connect(dbUrl)
    .then((client) => {
      const db = client.db(dbName)
      papr.initialize(db)
      papr
        .updateSchemas()
        .then(callback)
        .catch((error) => {
          console.error(error)
          throw new Error(error)
        })
    })
    .catch((error) => {
      console.error(error)
      throw new Error(error)
    })
}

export default mongoConnect
