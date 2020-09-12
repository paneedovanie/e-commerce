const mongoose = require('mongoose')
require('dotenv').config()
const { create: createRole } = require('../../services/role.service')
const ora = require('ora');
const chalk = require("chalk");

import inquirer from 'inquirer';

exports.connect = async function () {
    await mongoose.connect(process.env.DB_CONNECTION, 
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
    )
}

exports.close = async function () {
    await mongoose.disconnect()
}

exports.reset = async function () {
    let questions = []

    questions.push({
        type: 'confirm',
        name: 'choice',
        message: 'The database data will be deleted permanently.\nAre you sure to reset the database?',
        default: false,
    })

    let answers = await inquirer.prompt(questions);
    if(!answers.choice) return
    let spinner = ora('Resetting database...').start();

    try {
        const collections = await mongoose.connection.db.collections()
      
        for (let collection of collections) {
          await collection.drop()
        }
        console.log(chalk.green.bold("\nThe database reset successfully\n"))
    } catch (err) {
        console.error(err)
    } finally {
        spinner.stop()
    }
}

exports.seed = async function () {
    const roles = ['Superadmin', 'Admin', 'User']

    let spinner = ora('Populating database...').start();

    try {
        for (const index in roles) await createRole({name: roles[index]})
        console.log(chalk.green.bold("\nThe database was populated successfully\n"))
    } catch (err) {
        console.error(err)
    } finally {
        spinner.stop()
    }
}