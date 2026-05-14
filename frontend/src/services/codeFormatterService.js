import prettier from "prettier/standalone";

import parserBabel from "prettier/plugins/babel";

import parserEstree from "prettier/plugins/estree";


export const formatCodeService = async (code) => {

  const formatted = await prettier.format(
    code,
    {
      parser: "babel",

      plugins: [
        parserBabel,
        parserEstree
      ],

      semi: true,

      singleQuote: true
    }
  );

  return formatted;
};


export const minifyCodeService = async (code) => {

  const formatted = await prettier.format(
    code,
    {
      parser: "babel",

      plugins: [
        parserBabel,
        parserEstree
      ],

      semi: false,

      singleQuote: true
    }
  );

  return formatted
    .replace(/\n/g, "")
    .replace(/\s+/g, " ");
};