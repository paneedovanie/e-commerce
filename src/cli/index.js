require('../config')
const db = require('./controller/db.controller')
const { createUser } = require('./controller/user.controller')
const { createModule, createSubModule } = require('./controller/file.controller')

function parseIntoOptions(yargs) {
    return yargs
        .usage("Usage: db:reset - To reset database")
        .usage("Usage: db:seed - To reset and populate database")
        .usage("Usage: user:create - To create new user")
        .usage("Usage: make:module <Module Name> - To create new module")
        .usage("Usage: make:submodule <Module Name> <Sub Module Name> - To create new sub module")
        .alias('h', 'help')
        .help('help')
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
    

    if(options._[0].includes('db:')) {
        await db.connect()

        if(options._.includes('db:reset')) await db.reset()
        else if(options._.includes('db:seed')) {
            if(await db.reset())
                await db.seed()
        }

        db.close()
    }
    else if(options._.includes('make:user')) { 
        await db.connect() 
        await createUser() 
        db.close() 
    }
    else if(options._.includes('make:module'))  await createModule(options._[1])
    else if(options._.includes('make:submodule'))  await createSubModule(options._[1], options._[2])
}
   
export async function cli(yargs) {
    let options = parseIntoOptions(yargs)
    executeCommand(options)
}