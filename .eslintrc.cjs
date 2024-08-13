module.exports = {
  reportUnusedDisableDirectives: true,
  ignorePatterns: ["public/public/old/*", "pnpm-lock.yaml"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended", "plugin:tailwindcss/recommended"],
  rules: {
    "no-unused-vars": "off",
    "no-undef": "off",

    "@typescript-eslint/no-explicit-any": "off",

    "tailwindcss/no-custom-classname": [
      "error",
      {
        whitelist: ["formkit-.+"],
      },
    ],

    "no-restricted-syntax": [
      "error",
      {
        selector: "TSEnumDeclaration",
        message: "Don't declare enums",
      },
      {
        selector: "Decorator",
        message: "Don't use decorators",
      },
      {
        selector: (() => {
          const typeDeclarationSelector = "TSTypeParameterDeclaration > TSTypeParameter[constraint!=undefined]"

          const anyExceptions = [
            `:not(${typeDeclarationSelector} TSTypeReference[typeName.name='Record'] > TSTypeParameterInstantiation > TSAnyKeyword)`,
            `:not(${typeDeclarationSelector} TSFunctionType TSAnyKeyword)`,
            ":not(TSConditionalType TSAnyKeyword)",
            ":not(TSSatisfiesExpression TSTypeReference[typeName.name='Record'] TSAnyKeyword)",
          ].join("")

          return [`TSAnyKeyword${anyExceptions}`, 'TSConditionalType[extendsType.type="TSAnyKeyword"]'].join(",")
        })(),
        message: "No explicit any",
      },
      {
        selector: "CallExpression[callee.name=defineComponent] Property[key.name=setup] FunctionDeclaration",
        message: "Only arrow functions are allowed in component setup",
      },
    ],
    "vue/no-restricted-syntax": [
      "error",
      {
        selector: "CallExpression > Identifier[name='$event']",
        message: "Prefer ArrowFunctionExpression `event => fn(event)`",
      },
      {
        selector: "Identifier[name=/^\\$(?!attrs|slots|emit)/]:not(MemberExpression[object.name='$props'][property.name='class'] Identifier)",
        message: "Do not use identifiers which starts with `$`",
      },
    ],
  },
}
