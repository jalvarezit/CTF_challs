const regExp		  = require('time-limited-regular-expressions')({ limit: 2 });
const {CspEvaluator}  = require('csp_evaluator/dist/evaluator.js');
const {CspParser}	  = require('csp_evaluator/dist/parser.js');
const {Finding}       = require('csp_evaluator/dist/finding');
const { parse }       = require('url')
const http            = require('http');
const { env }         = require('process');

const isLocalhost = async (url) => {
    let blacklist = [
        "localhost",
        "127.0.0.1",
    ];
    let hostname = parse(url).hostname;
    return blacklist.includes(hostname);
};

const httpGet = url => {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let body = '';
            res.on('data', () => {
                resolve(true);
            });
        }).on('error', reject);
    });
}

const cspReducer = csp => {
    return Object.values(csp.reduce((r,o) => {
        r[o.directive] = r[o.directive]||{
          directive:o.directive,
          severity:999,
          issues:[]
        }
        r[o.directive].severity = o.severity < r[o.directive].severity ? o.severity : r[o.directive].severity
        r[o.directive].issues.push(o)
        return r
      },{}));
}

const checkReportUri = async uris => {
    if (uris === undefined || uris.length < 1) return
    if (uris.length > 1) {
        return new Finding(405, "Should have only one report-uri", 100, 'report-uri')
    }    
    if(await isLocalhost(uris[0])) {
        return new Finding(310, "Destination not available", 50, 'report-uri', uris[0])
    }
    if (uris.length === 1) {
        try {
            available = await httpGet(uris[0])

        } catch (error) {
            return new Finding(310, "Destination not available", 50, 'report-uri', uris[0])
        }
    }

    return
}

const evaluateCsp = async csp => {
    const parsed = new CspParser(csp).csp;
    const reportUris = parsed.directives['report-uri'];

    let evaluatedCsp = new CspEvaluator(parsed).evaluate();
    reportUriFinding = await checkReportUri(reportUris)
    if (reportUriFinding) evaluatedCsp.push(reportUriFinding)
    evaluatedCsp = cspReducer(evaluatedCsp);
    return evaluatedCsp;
}

const validateSecret = async (secret) => {
    try {
        const match = await regExp.match(secret, env.FLAG)
        return !!match;
    } catch (error) {
        return false;
    }
}

module.exports = {
    evaluateCsp,
    validateSecret
}