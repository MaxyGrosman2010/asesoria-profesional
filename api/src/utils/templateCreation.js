const handlebars = require("handlebars");

module.exports = templateCreation = (templateBody, context) => {
    try {
            const template = handlebars.compile(templateBody);
            const html = template(context);

            return html;
    } catch (error) {
        console.log(error);
    }

};
