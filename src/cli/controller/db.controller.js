const mongoose = require('mongoose')
// const fs = require('fs')
require('dotenv').config()

const Role = require('../../models/Role')
const Category = require('../../models/Category')
const Permission = require('../../models/Permission')
const RolePermission = require('../../models/RolePermission')
const Emotion = require('../../models/Emotion')
const Crud = require('../../services/crud.service')
const roleCrud = new Crud(Role)
const categoryCrud = new Crud(Category)
const permissionCrud = new Crud(Permission)
const rolePermissionCrud = new Crud(RolePermission)
const emotionCrud = new Crud(Emotion)


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
    if(!answers.choice) return false
    let spinner = ora('Resetting database...').start();

    try {
        const collections = await mongoose.connection.db.collections()
      
        for (let collection of collections) {
          await collection.drop()
        }
        console.log(chalk.green.bold("\nThe database reset successfully\n"))
        return true
    } catch (err) {
        console.error(err)
    } finally {
        spinner.stop()
    }
}

exports.seed = async function () {
    const roles = ['Superadmin', 'Admin', 'User']
    let rolesID = [];
    const permissions = require('../assets/permissions')
    const emotions = require('../assets/emotions')

    let spinner = ora('Populating database...').start();

    try {
        for (const role of roles) {
            rolesID.push(await roleCrud.create({name: role}))
        }
        
        for(var i = 0; i < permissions.length; i++) {
            const category = await categoryCrud.create({name: permissions[i].category, type: 'permission'})
            for (const permission of permissions[i].data) {
                const permissionAdded = await permissionCrud.create({...permission, category: category._id})
                await rolePermissionCrud.create({role: rolesID[0], permission: permissionAdded._id})
            }
        }
        
        for(var i = 0; i < emotions.length; i++) {
            const category = await categoryCrud.create({name: emotions[i].category, type: 'emotion'})
            for (const emotion of emotions[i].data) {
                await emotionCrud.create({ phrase: emotion, category: emotions[i].category.toLowerCase()})
            }
        }

        console.log(chalk.green.bold("\nThe database was populated successfully\n"))
    } catch (err) {
        console.error(err)
    } finally {
        spinner.stop()
    }
}

exports.phraseToLowerCase = async function () {
    let spinner = ora('Lowering phrases...').start();
    try {
        const result = await Emotion.find()

        for(const item of result) {
            await Emotion.findByIdAndUpdate(item._id, {$set: {phrase: item.phrase.toLowerCase()}})
        }
        
        console.log(chalk.green.bold("\nPhrases are lowered successfully\n"))
    } catch (err) {
        console.error(err)
    } finally {
        spinner.stop()
    }
}

exports.importPhrases = async function (filename) {
    let spinner = ora('Importing phrases...').start();

    fs.readFile( filename, (err, data) => {
        if(err) return console.log(err)
        console.log(data)
        spinner.stop()
    })
}