const db = require('./controller/db.controller')
const { createUser } = require('./controller/user.controller')

function parseIntoOptions(yargs) {
    return yargs
        .usage("Usage: db:reset - To reset database")
        .usage("Usage: db:seed - To reset and populate database")
        .usage("Usage: user:create - To create new user")
        // .option("r", { describe: "Route", type: "string" })
        .argv;
}

async function promptForMissingOptions(options) {
    const defaultTemplate = 'JavaScript';
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
        };
    }
   
    const questions = [];
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: ['JavaScript', 'TypeScript'],
            default: defaultTemplate,
        });
    }
   
    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Initialize a git repository?',
            default: false,
        });
    }
   
    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git,
    };
}

async function executeCommand(options) {
    if(!options._) return 
    
    await db.connect()

    if(options._.includes('db:reset')) await db.reset()
    else if(options._.includes('db:seed')) {
        await db.reset()
        await db.seed()
    }
    else if(options._.includes('user:create'))  await createUser()

    db.close()
}
   
export async function cli(yargs) {
    let options = parseIntoOptions(yargs)
    executeCommand(options)
}