// Requirements
var AWS = require ('aws-sdk');
var handlebars = require ('handlebars');
var Enumerable = require ('linq');
var nconf = require ('nconf');

// Config
nconf.file ({ file: 'config.json' });
var region = nconf.get ('region');
var source = nconf.get ('source');
var subject = nconf.get ('subject');
var copy = nconf.get ('copy');
var people = nconf.get ('people');
var message = nconf.get ('message');
var template = handlebars.compile (message);
var ses = new AWS.SES({ 'region': region });

// Sort
var unsorted = Enumerable.from (people)
        .orderBy (Math.random)
        .toArray ();
var couples = Enumerable
        .range (0, unsorted.length)
        .select (function (idx) { return {
                from: unsorted [idx],
                to: unsorted [idx < unsorted.length - 1 ? idx + 1 : 0] }; })
        .toArray ();

// Send email to each one
var destination = { };
if (copy)
        destination.BccAddresses = copy;

Enumerable.from (couples).forEach (function (couple)
{
        destination.ToAddresses = [ couple.from.email ];
        var params = {
                Destination: destination,
                Message: {
                        Body: { Text: { Data: template (couple) } },
                        Subject: { Data: subject }
                },
                Source: source
        };
        ses.sendEmail (params, function(err) {
                if (err) console.log(err, err.stack);
        });
});
