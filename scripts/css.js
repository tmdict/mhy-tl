import path from "path";
import fs from "fs-extra";

// Compiles theme colors into importable styles
const buildThemes = (config, src, dest) => {
  for (const theme of config) {
    let fileContent = fs.readFileSync(path.join(src, theme.src), "utf8");
    // Keep only the custom properties inside the theme's `:root { ... }` block
    fileContent = fileContent.slice(fileContent.indexOf("{\n") + 2, fileContent.lastIndexOf("}"));
    const regex = /^ *--(.*): (.*);\n/gm;
    // Inner double quotes (e.g. font names) would break the JSON string
    const toEntry = (_, name, value) => `    "${name}": "${value.replaceAll('"', "'")}",\n`;
    fs.outputFile(
      path.join(dest, theme.name) + ".json",
      `{
        "name": "${theme.name}",
        "colors": {
            ${fileContent.replace(regex, toEntry).replace(/,\s*$/, "")}
        }
      }\n`.replace(/ {6}/gm, ""),
    );
  }
};

buildThemes(
  [
    { name: "dark", src: "theme_dark.css" },
    { name: "light", src: "theme_light.css" },
  ],
  "./src/lib/style/css",
  "./src/lib/style/themes",
);
