const args = process.argv.slice(2);

// Start our discord bot
//
if (args.length == 0 || args.includes('bot'))
{
    require('./src/index')();
}

// Start our webiste
//
if (args.length == 0 || args.includes('web'))
{
    require('./web/index')();
}