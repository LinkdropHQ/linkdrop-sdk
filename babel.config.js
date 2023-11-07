module.exports = {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-proposal-optional-chaining",
    ["@babel/plugin-transform-class-properties", { "loose": true }],
    ["@babel/plugin-transform-private-methods", { "loose": true }],
    ["@babel/plugin-transform-private-property-in-object", { "loose": true }]
  ]
}
