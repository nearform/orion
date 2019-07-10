# Validation

Validations are performed throughout the applications during various stages of the application lifecycle. See below for more details about particular validations.

## Assessments
Assessment(s) data that comes into the application (currently brought in by the theme used) needs to be validated so that we are sure there will be no logical errors in the system and that it conforms to a certain shape that is expected.

### JSON Schema Validation
To accomplish validation, we use [JSON Schema](https://json-schema.org/) and a fast validator tool called [AJV](https://github.com/epoberezkin/ajv). We chose those tools because they are very generic, performant and can be easily used on client side as well as the backend.

The schema used for assessments can be found in `packages/assess-base/src/validations/schemas/assessment.json` and is the main schema that validated the structure of the assessment data used by the application. Look in it for more details about the validations (there are many) or if you need to extend the schema which is usually a part of the evolution of the data model for assessments.

There is also `packages/assess-base/src/validations/schemas/definitions.jso`n which holds common components of the assessment (and possibly other) structure and are to be re used across schema with goal of reducing duplication and maintaining data conformity (sameness, eg. key is property that is equal on all items in the schema).

Note that those schemas are "living" documents that need to be updated and maintained as data schema evolves. 
To be able to do this, one needs to get acquainted with the [AJV validations](https://ajv.js.org/) and the [JSON Schema](http://json-schema.org/learn/) in general.

### Performing validation
There is no extra step needed to run the validation as it will be runt when the app gets built. In case of errors, they will be displayed and app build will stop (usually in the CI build and deploy pipeline, but also locally when developing) as it is hooked into Gatsby pre init event (See gatsby-node.js for more information).
