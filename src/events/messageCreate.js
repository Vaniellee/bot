module.exports = {
    name: 'messageCreate',
    execute: async (message) => {
        if (message.author.bot) return false;
        if (message.channel.type === 'dm') return false;
    }
};