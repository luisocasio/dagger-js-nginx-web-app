import { connect } from "@dagger.io/dagger";
import { exec } from "child_process";

// initialize Dagger client
connect(
  async (client) => {
    // use a node:16-slim container
    // get version
    const node = client
      .container()
      .from("node:alpine")
      .withExec(["node", "-v"]);

    exec("docker build -t dagger-client-app .", (error, stdout, stderr) => {      

      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    // execute
    const version = await node.stdout();

    // print output
    console.log("Node: ", version);
  },
  { LogOutput: process.stdout }
);
