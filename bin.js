#! /usr/bin/env node

process.title = 'cpf-gen'

const minimist = require('minimist')
const clipboardy = require('clipboardy')
const chalk = require('chalk')

const pjson = require('./package.json')
const argv = minimist(process.argv.slice(2), {
    alias: {
        help: 'h',
        version: 'v',
        mask: 'm'
    },
    boolean: [
        'help',
        'version',
        'mask'
    ]
})

const HELP = `
    Uso:
        --help      -h      Esta tela de ajuda
        --version   -v      Versão atual

    Gerar CPF:
        --mask      -m      Gera CPF com pontos e traço
`.replace(/\n$/, '').replace(/^\n/, '')

const VERSION = `
  cpf-gen ${chalk.bgBlack.green(pjson.version)}
`.replace(/\n$/, '').replace(/^\n/, '')

if (argv.version) {
    console.log(VERSION)
} else if (argv.help) {
    console.log(HELP)
} else {
    cpfGen()
}

function cpfGen() {
    let digits = new Array(2).fill(0)
    let cpf = new Array(9).fill(0).map(()=>{
        return Math.round(Math.random() * 9)
    })
    let returnCPF = ""

    for (var i in cpf) {
        digits[0] += cpf[i] * (10 - i)
    }
    digits[0] = ((digits[0] * 10) % 11) === 10 ? 0 : ((digits[0] * 10) % 11)
    cpf.push(digits[0])

    for (var i in cpf) {
        digits[1] += cpf[i] * (11 - i)
    }
    digits[1] = ((digits[1] * 10) % 11) === 10 ? 0 : ((digits[1] * 10) % 11)
    cpf.push(digits[1])

    if(argv.mask) {
        returnCPF = `${cpf[0]}${cpf[1]}${cpf[2]}.${cpf[3]}${cpf[4]}${cpf[5]}.${cpf[6]}${cpf[7]}${cpf[8]}-${cpf[9]}${cpf[10]}`
    } else {
        returnCPF = cpf.join('')
    }

    clipboardy.writeSync(returnCPF)

    console.log(returnCPF)
}