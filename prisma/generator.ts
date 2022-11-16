import { Prisma } from "@prisma/client";
import { fstat, writeFile, writeFileSync } from "fs";

export const  modelNameGenerator = () =>{
    const modelNames = Prisma.dmmf.datamodel.models.map((model) => {
        return model.name;
      });
    const names  = {
      models: modelNames,
    }

    const json = JSON.stringify(names);
    writeFile("./src/models.json", json, "utf-8", (err) => {
      if(err){
        console.error("Error generating models", err)
      }
    })
}