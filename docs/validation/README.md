# Validation

Validations are performed throughout the applications during various stages of the application lifecycle. See below for more details about particular validations.

### JSON Schema Validation
To accomplish validation, we use [JSON Schema](https://json-schema.org/) and a fast validator tool called [AJV](https://github.com/epoberezkin/ajv). We chose those tools because they are very generic, performant and can be easily used on client side as well as the backend.

Note that those schemas are "living" documents that need to be updated and maintained as data schema evolves. 
To be able to do this, one needs to get acquainted with the [AJV validations](https://ajv.js.org/) and the [JSON Schema](http://json-schema.org/learn/) in general.

### Performing validation
There is no extra step needed to run the validation as it will be runt when the app gets built. In case of errors, they will be displayed and app build will stop (usually in the CI build and deploy pipeline, but also locally when developing) as it is hooked into Gatsby pre init event (See gatsby-node.js for more information).
